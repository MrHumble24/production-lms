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
exports.getGroupStudentsService = exports.softDeleteGroup = exports.getGroupStudents = exports.getGroupTimetable = exports.reassignTeacherToGroup = exports.removeStudentFromGroup = exports.deleteGroupHard = exports.updateGroupCapacity = exports.updateGroupService = exports.createGroupService = exports.getGroupByIdService = exports.getAllGroupsService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
/**
 * Retrieves all groups from the database, optionally filtering by branch ID.
 * @param all - A boolean indicating whether to retrieve all groups or only those not marked as deleted.
 * @param branchId - The ID of the branch for which to retrieve groups.
 * @returns A promise that resolves to an array of group objects, including related students, teacher, timetables, and subject data.
 */
const getAllGroupsService = (all, branchId) => __awaiter(void 0, void 0, void 0, function* () {
    if (all) {
        return yield client_1.default.group.findMany({
            include: {
                students: true,
                teacher: true,
                timetables: true,
                subject: true,
            },
        });
    }
    else {
        return yield client_1.default.group.findMany({
            include: {
                students: true,
                teacher: true,
                timetables: true,
                subject: true,
            },
            where: { isDeleted: false },
        });
    }
});
exports.getAllGroupsService = getAllGroupsService;
/**
 * Retrieves a group by its ID from the database.
 * @param id - The ID of the group to retrieve.
 * @returns A promise that resolves to the group object, including related students, teacher, timetables, and subject data, or null if not found.
 */
const getGroupByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.group.findUnique({
        where: { id },
        include: {
            students: true,
            teacher: true,
            timetables: true,
            subject: true,
        },
    });
});
exports.getGroupByIdService = getGroupByIdService;
/**
 * Creates a new group in the database.
 * @param body - The data for the new group, including name, capacity, teacherId, subjectId, and description.
 * @returns A promise that resolves to the created group object.
 */
const createGroupService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, capacity, teacherId, subjectId, description, branchId, price } = body;
    return yield client_1.default.group.create({
        data: {
            name,
            capacity,
            description,
            branch: { connect: { id: branchId } },
            teacher: teacherId ? { connect: { id: teacherId } } : undefined,
            subject: subjectId ? { connect: { id: subjectId } } : undefined,
            price: Number(price),
        },
    });
});
exports.createGroupService = createGroupService;
/**
 * Updates an existing group in the database.
 * @param id - The ID of the group to update.
 * @param body - The updated data for the group, including name, capacity, teacherId, subjectId, and description.
 * @returns A promise that resolves to the updated group object.
 */
const updateGroupService = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, capacity, teacherId, subjectId, description, days, price } = body;
    return yield client_1.default.group.update({
        where: { id },
        data: {
            name,
            capacity,
            description,
            days,
            teacher: teacherId ? { connect: { id: teacherId } } : undefined,
            subject: subjectId ? { connect: { id: subjectId } } : undefined,
            price: Number(price),
        },
    });
});
exports.updateGroupService = updateGroupService;
/**
 * Updates the capacity of a specific group.
 * @param groupId - The ID of the group to update.
 * @param newCapacity - The new capacity value for the group.
 * @returns A promise that resolves to the updated group object.
 * @throws An error if the group is not found.
 */
const updateGroupCapacity = (groupId, newCapacity) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield client_1.default.group.findUnique({
        where: { id: groupId },
    });
    if (!group) {
        throw new Error("Group not found");
    }
    const updatedGroup = yield client_1.default.group.update({
        where: { id: groupId },
        data: { capacity: newCapacity },
    });
    return updatedGroup;
});
exports.updateGroupCapacity = updateGroupCapacity;
/**
 * Deletes a group from the database permanently.
 * @param groupId - The ID of the group to delete.
 * @returns A promise that resolves to the deleted group object.
 */
const deleteGroupHard = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.group.delete({
        where: { id: groupId },
    });
});
exports.deleteGroupHard = deleteGroupHard;
/**
 * Removes a student from a group.
 * @param studentId - The ID of the student to remove.
 * @param groupId - The ID of the group from which to remove the student.
 * @returns A promise that resolves to a success message if the operation is successful.
 * @throws An error if the group or student is not found or if the student is not in the group.
 */
const removeStudentFromGroup = (studentId, groupId) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield client_1.default.group.findUnique({
        where: { id: groupId },
        include: { students: true },
    });
    if (!group) {
        throw new Error("Group not found");
    }
    const isStudentInGroup = group.students.some((student) => student.id === studentId);
    if (!isStudentInGroup) {
        throw new Error("Student is not in this group");
    }
    yield client_1.default.$transaction([
        client_1.default.student.update({
            where: { id: studentId },
            data: {
                groups: {
                    disconnect: { id: groupId },
                },
            },
        }),
    ]);
    return { message: "Student removed from group successfully" };
});
exports.removeStudentFromGroup = removeStudentFromGroup;
/**
 * Reassigns a teacher to a group, checking for timetable conflicts.
 * @param groupId - The ID of the group to reassign.
 * @param newTeacherId - The ID of the new teacher to assign to the group.
 * @returns A promise that resolves to the updated group object.
 * @throws An error if the group or teacher is not found or if there is a timetable conflict.
 */
const reassignTeacherToGroup = (groupId, newTeacherId) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield client_1.default.group.findUnique({
        where: { id: groupId },
        include: { timetables: true },
    });
    if (!group) {
        throw new Error("Group not found");
    }
    const teacher = yield client_1.default.teacher.findUnique({
        where: { id: newTeacherId },
        include: { timetables: true },
    });
    if (!teacher) {
        throw new Error("Teacher not found");
    }
    // Check for timetable conflicts
    const hasConflict = teacher.timetables.some((teacherTimetable) => group.timetables.some((groupTimetable) => teacherTimetable.day === groupTimetable.day &&
        ((teacherTimetable.startTime >= groupTimetable.startTime &&
            teacherTimetable.startTime < groupTimetable.endTime) ||
            (groupTimetable.startTime >= teacherTimetable.startTime &&
                groupTimetable.startTime < teacherTimetable.endTime))));
    if (hasConflict) {
        throw new Error("The new teacher has a timetable conflict with this group");
    }
    // Reassign the teacher
    const updatedGroup = yield client_1.default.group.update({
        where: { id: groupId },
        data: { teacherId: newTeacherId },
    });
    return updatedGroup;
});
exports.reassignTeacherToGroup = reassignTeacherToGroup;
/**
 * Retrieves the timetable for a specific group.
 * @param groupId - The ID of the group for which to retrieve the timetable.
 * @returns A promise that resolves to the group's timetable.
 * @throws An error if the group is not found.
 */
const getGroupTimetable = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield client_1.default.group.findUnique({
        where: { id: groupId },
        include: { timetables: true },
    });
    if (!group) {
        throw new Error("Group not found");
    }
    return group.timetables;
});
exports.getGroupTimetable = getGroupTimetable;
/**
 * Retrieves all students in a specific group.
 * @param groupId - The ID of the group for which to retrieve students.
 * @returns A promise that resolves to an array of students in the group.
 */
const getGroupStudents = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield client_1.default.group.findUnique({
        where: { id: groupId },
        include: { students: true },
    });
    if (!group) {
        throw new Error("Group not found");
    }
    return group;
});
exports.getGroupStudents = getGroupStudents;
/**
 * Soft deletes a group by marking it as deleted and disconnecting related entities.
 * @param groupId - The ID of the group to soft delete.
 * @returns A promise that resolves to the updated group object.
 * @throws An error if the group is not found.
 */
const softDeleteGroup = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield client_1.default.group.findUnique({
        where: { id: groupId },
        include: { students: true, teacher: true },
    });
    if (!group) {
        throw new Error("Group not found");
    }
    const updatedGroup = yield client_1.default.group.update({
        where: { id: groupId },
        data: {
            isDeleted: true,
            teacherId: null, // Set teacherId to null to disconnect the teacher
            timetables: {
                updateMany: {
                    where: { groupId },
                    data: {
                        isDeleted: true, // Set groupId to null to disconnect the group
                    },
                }, // Delete all associated timetables
            },
            students: {
                disconnect: group.students.map((student) => ({ id: student.id })), // Disconnect all students
            },
        },
    });
    return updatedGroup;
});
exports.softDeleteGroup = softDeleteGroup;
const getGroupStudentsService = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield client_1.default.group.findUnique({
        where: { id: groupId },
        include: { students: true },
    });
    console.log({ group });
    if (!(group === null || group === void 0 ? void 0 : group.students)) {
        throw new Error("Group not found");
    }
    return group.students;
});
exports.getGroupStudentsService = getGroupStudentsService;
