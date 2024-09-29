"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentImageService = exports.getStudentGroups = exports.removeStudentFromGroup = exports.addStudentToGroup = exports.deleteStudentService = exports.createStudentService = exports.updateStudentPersonalData = exports.updateStudentService = exports.getStudentByIdService = exports.getAllStudentsService = void 0;
const removeImage_1 = __importDefault(require("../helpers/removeImage"));
const uploadImage_1 = __importDefault(require("../helpers/uploadImage"));
const client_1 = __importDefault(require("../prisma/client"));
const toNumberArray_1 = require("../utils/toNumberArray");
/**
 * Retrieves all students from the database.
 * @returns A promise that resolves to an array of Student objects.
 */
const getAllStudentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.student.findMany({
        include: { groups: true },
        orderBy: { firstName: "asc" },
        where: { isDeleted: false },
    });
});
exports.getAllStudentsService = getAllStudentsService;
/**
 * Retrieves a student by ID.
 * @param id - The ID of the student to retrieve.
 * @returns A promise that resolves to a Student object if found, otherwise null.
 */
const getStudentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.student.findUnique({
        where: { id, isDeleted: false },
        include: { groups: true },
    });
});
exports.getStudentByIdService = getStudentByIdService;
/**
 * Updates a student's information by ID and handles timetable conflicts.
 * @param id - The ID of the student to update.
 * @param data - The updated student data.
 * @returns A promise that resolves to the updated Student object.
 */
const updateStudentService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, phone, enrollmentDate, groupIds, avatar, bio, branchId, gender, password, telegramUsername, } = data;
    const studentPrevData = yield client_1.default.student.findUnique({
        where: { id },
        include: { groups: { select: { id: true, name: true, timetables: true } } },
    });
    if (!studentPrevData) {
        throw new Error(`Student with ID ${id} not found`);
    }
    const prevGroupIds = studentPrevData.groups.map((group) => group.id);
    const newGroupIds = (0, toNumberArray_1.toNumberArray)(groupIds) || [];
    const hasGroupChange = newGroupIds.length !== prevGroupIds.length ||
        !newGroupIds.every((id) => prevGroupIds.includes(id));
    if (hasGroupChange) {
        const newGroupTimetables = yield client_1.default.group.findMany({
            where: { id: { in: newGroupIds } },
            include: { timetables: { include: { group: true } } },
        });
        const conflictingTimetables = [];
        studentPrevData.groups.forEach((existingGroup) => {
            existingGroup.timetables.forEach((studentTimetable) => {
                newGroupTimetables.forEach((newGroup) => {
                    if (existingGroup.id === newGroup.id)
                        return;
                    newGroup.timetables.forEach((newTimetable) => {
                        const isSameDay = studentTimetable.day === newTimetable.day;
                        const isTimeConflict = (studentTimetable.startTime >= newTimetable.startTime &&
                            studentTimetable.startTime < newTimetable.endTime) ||
                            (newTimetable.startTime >= studentTimetable.startTime &&
                                newTimetable.startTime < studentTimetable.endTime);
                        if (isSameDay && isTimeConflict) {
                            conflictingTimetables.push(`Conflict on ${studentTimetable.day} between ` +
                                `Existing Group: ${existingGroup.name} (${studentTimetable.startTime}-${studentTimetable.endTime}) ` +
                                `and New Group: ${newGroup.name} (${newTimetable.startTime}-${newTimetable.endTime})`);
                        }
                    });
                });
            });
        });
        if (conflictingTimetables.length > 0) {
            const error = new Error("Timetable conflicts detected");
            error.details = conflictingTimetables;
            throw error;
        }
        yield client_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            yield tx.student.update({
                where: { id },
                data: {
                    firstName,
                    lastName,
                    email,
                    phone,
                    enrollmentDate,
                    avatar,
                    bio,
                    branchId,
                    gender,
                    password,
                    telegramUsername,
                },
            });
            for (const grID of newGroupIds) {
                if (!prevGroupIds.includes(grID)) {
                    yield (0, exports.addStudentToGroup)(id, grID);
                }
            }
            for (const grID of prevGroupIds) {
                if (!newGroupIds.includes(grID)) {
                    yield (0, exports.removeStudentFromGroup)(id, grID);
                }
            }
        }));
    }
    else {
        yield client_1.default.student.update({
            where: { id },
            data: {
                firstName,
                lastName,
                email,
                phone,
                enrollmentDate,
                avatar,
                bio,
                branchId,
                gender,
                password,
                telegramUsername,
            },
        });
    }
    return client_1.default.student.findUnique({
        where: { id },
    });
});
exports.updateStudentService = updateStudentService;
/**
 * Updates a student's information by ID and handles timetable conflicts.
 * @param id - The ID of the student to update.
 * @param data - The updated student data.
 * @returns A promise that resolves to the updated Student object.
 */
const updateStudentPersonalData = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, phone, avatar, bio, gender, telegramUsername, } = data;
    // Fetch the current student data, including related groups
    const existingStudent = yield client_1.default.student.findUnique({
        where: { id },
        include: { groups: true, attendances: true, Submission: true },
    });
    if (!existingStudent) {
        throw new Error("Student not found");
    }
    // Prepare the data for updating, excluding groups
    const updateData = {
        firstName,
        lastName,
        email,
        phone,
        avatar,
        bio,
        gender,
        telegramUsername,
    };
    // Update the student, while preserving the groups
    const updatedStudent = yield client_1.default.student.update({
        where: { id },
        data: Object.assign(Object.assign({}, updateData), { groups: {
                set: existingStudent.groups.map((group) => ({ id: group.id })), // Preserve existing groups
            }, Submission: {
                set: existingStudent.Submission.map((submission) => ({
                    id: submission.id,
                })),
            }, attendances: {
                set: existingStudent.attendances.map((attendance) => ({
                    id: attendance.id,
                })),
            } }),
    });
    return updatedStudent;
});
exports.updateStudentPersonalData = updateStudentPersonalData;
/**
 * Creates a new student in the database.
 * @param data - The data for creating a new student.
 * @param file - The uploaded file object for the student's avatar.
 * @returns A promise that resolves to the newly created Student object.
 */
const createStudentService = (data, file) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, phone, enrollmentDate, groupIds } = data;
    const avatarUrl = yield (0, uploadImage_1.default)(file, "avatars");
    const groups = (0, toNumberArray_1.toNumberArray)(groupIds);
    return yield client_1.default.student.create({
        data: {
            firstName,
            lastName,
            email,
            phone,
            enrollmentDate,
            avatar: avatarUrl,
            groups: groups
                ? {
                    connect: groups.map((groupId) => ({ id: groupId })),
                }
                : undefined,
            branchId: Number(data.branchId),
            telegramUsername: data.telegramUsername,
            password: data.password,
            bio: data.bio,
        },
    });
});
exports.createStudentService = createStudentService;
/**
 * Deletes a student by ID.
 * @param id - The ID of the student to delete.
 * @returns A promise that resolves when the student is deleted.
 */
const deleteStudentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const studentPrevData = yield client_1.default.student.findUnique({
        where: { id },
        select: { avatar: true },
    });
    yield (0, removeImage_1.default)(studentPrevData === null || studentPrevData === void 0 ? void 0 : studentPrevData.avatar);
    yield client_1.default.student.delete({
        where: { id },
    });
});
exports.deleteStudentService = deleteStudentService;
/**
 * Adds a student to a group, checking for timetable conflicts.
 * @param studentId - The student's ID.
 * @param groupId - The group's ID.
 */
const addStudentToGroup = (studentId, groupId) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield client_1.default.group.findUnique({
        where: { id: groupId },
        include: { timetables: true },
    });
    if (!group) {
        throw new Error("Group not found");
    }
    const student = yield client_1.default.student.findUnique({
        where: { id: studentId },
        include: { groups: { include: { timetables: true } } },
    });
    if (!student) {
        throw new Error("Student not found");
    }
    const hasConflict = student.groups.some((existingGroup) => existingGroup.timetables.some((studentTimetable) => group.timetables.some((groupTimetable) => studentTimetable.day === groupTimetable.day &&
        ((studentTimetable.startTime >= groupTimetable.startTime &&
            studentTimetable.startTime < groupTimetable.endTime) ||
            (groupTimetable.startTime >= studentTimetable.startTime &&
                groupTimetable.startTime < studentTimetable.endTime)))));
    if (hasConflict) {
        throw new Error("Student has a timetable conflict with this group");
    }
    yield client_1.default.student.update({
        where: { id: studentId },
        data: {
            groups: {
                connect: { id: groupId },
            },
        },
    });
    return { message: "Student added to group successfully" };
});
exports.addStudentToGroup = addStudentToGroup;
/**
 * Removes a student from a group.
 * @param studentId - The student's ID.
 * @param groupId - The group's ID.
 */
const removeStudentFromGroup = (studentId, groupId) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.student.update({
        where: { id: studentId },
        data: {
            groups: {
                disconnect: { id: groupId },
            },
        },
    });
    return { message: "Student removed from group successfully" };
});
exports.removeStudentFromGroup = removeStudentFromGroup;
/**
 * Retrieves all groups that a student is part of.
 * @param studentId - The student's ID.
 * @returns A promise that resolves to the groups the student belongs to.
 */
const getStudentGroups = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield client_1.default.student.findUnique({
        where: { id: studentId },
        include: {
            groups: {
                include: {
                    students: true,
                    tasks: { include: { group: true } },
                    timetables: true,
                    GroupMaterial: { include: { group: true } },
                    GroupNotification: true,
                    teacher: true,
                    Attendance: {
                        where: { studentId: Number(studentId) },
                        include: {
                            student: true,
                            group: true,
                        },
                    },
                },
            },
        },
    });
    if (!student) {
        throw new Error("Student not found");
    }
    return student.groups;
});
exports.getStudentGroups = getStudentGroups;
/**
 * Updates a student's avatar.
 * @param studentId - The student's ID.
 * @param data - The new avatar data.
 * @returns A promise that resolves to the updated Student object.
 */
const updateStudentImageService = (studentId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield client_1.default.student.findUnique({
        where: { id: studentId },
        select: { avatar: true },
    });
    if (student === null || student === void 0 ? void 0 : student.avatar) {
        yield (0, removeImage_1.default)(student.avatar);
    }
    const newAvatar = yield (0, uploadImage_1.default)(data, "avatars");
    return yield client_1.default.student.update({
        where: { id: studentId },
        data: {
            avatar: newAvatar,
        },
    });
});
exports.updateStudentImageService = updateStudentImageService;
