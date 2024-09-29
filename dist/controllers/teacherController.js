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
exports.deleteTeacher = exports.updateTeacher = exports.updateTeacherImage = exports.createTeacher = exports.getTeacherById = exports.getAllTeachers = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const teacherService_1 = require("../services/teacherService");
const uploadImage_1 = __importDefault(require("../helpers/uploadImage"));
const removeImage_1 = __importDefault(require("../helpers/removeImage"));
const toNumberArray_1 = require("../utils/toNumberArray");
// Get all teachers
const getAllTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teachers = yield client_1.default.teacher.findMany({
            include: {
                subjects: true,
                timetables: true,
                groups: {
                    include: {
                        students: true,
                    },
                },
            },
            orderBy: { firstName: "asc" },
            where: { isDeleted: false },
        });
        res.status(200).json(teachers);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch teachers" });
    }
});
exports.getAllTeachers = getAllTeachers;
// Get a single teacher by ID
const getTeacherById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const teacher = yield client_1.default.teacher.findUnique({
            where: { id: Number(id) },
            include: {
                groups: {
                    include: {
                        students: true,
                    },
                },
                subjects: true,
                timetables: true,
                branch: {
                    include: {
                        tenant: true,
                    },
                },
            },
        });
        if (!teacher) {
            res.status(404).json({ error: "Teacher not found" });
            return;
        }
        res.status(200).json(teacher);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch teacher" });
    }
});
exports.getTeacherById = getTeacherById;
// Create a new teacher
const createTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { firstName, lastName, email, phone, subjectIds, branchId, bio, title, officeHours, telegramUsername, password, gender, } = req.body;
    let avatarUrl = yield (0, uploadImage_1.default)(req.file, "avatars");
    try {
        const newTeacher = yield client_1.default.teacher.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                avatar: avatarUrl,
                bio,
                title,
                officeHours,
                telegramUsername,
                password,
                gender,
                branchId: Number(branchId),
                subjects: {
                    connect: (_a = (0, toNumberArray_1.toNumberArray)(subjectIds)) === null || _a === void 0 ? void 0 : _a.map((id) => ({
                        id: Number(id),
                    })),
                },
            },
        });
        res.status(201).json(newTeacher);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create teacher" });
    }
});
exports.createTeacher = createTeacher;
const updateTeacherImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = yield (0, teacherService_1.updateTeacherImageService)(Number(req.params.id), req.file);
        res.status(200).json(teacher);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update tenant" });
    }
});
exports.updateTeacherImage = updateTeacherImage;
// Update a teacher by ID
const updateTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { id } = req.params;
    const { firstName, lastName, email, phone, subjectIds, officeHours, bio, title, avatar, password, branchId, gender, telegramUsername, } = req.body;
    try {
        const teacherPrevData = yield client_1.default.teacher.findUnique({
            where: { id: Number(id) },
            include: { subjects: true },
        });
        const teacherSubjectIds = (_a = teacherPrevData === null || teacherPrevData === void 0 ? void 0 : teacherPrevData.subjects) === null || _a === void 0 ? void 0 : _a.map((subject) => subject.id);
        const removedSubjectIds = teacherSubjectIds === null || teacherSubjectIds === void 0 ? void 0 : teacherSubjectIds.filter((subjectId) => !(subjectIds === null || subjectIds === void 0 ? void 0 : subjectIds.includes(subjectId)));
        console.log(req.body);
        const updatedTeacher = yield client_1.default.teacher.update({
            where: { id: Number(id) },
            data: {
                firstName,
                lastName,
                email,
                phone,
                telegramUsername,
                subjects: {
                    connect: (_b = (0, toNumberArray_1.toNumberArray)(subjectIds)) === null || _b === void 0 ? void 0 : _b.map((id) => ({ id })),
                    disconnect: (_c = (0, toNumberArray_1.toNumberArray)(removedSubjectIds)) === null || _c === void 0 ? void 0 : _c.map((id) => ({
                        id,
                    })),
                },
                officeHours,
                bio,
                title,
                avatar,
                password,
                branchId: Number(branchId),
                gender,
            },
        });
        res.status(200).json(updatedTeacher);
    }
    catch (error) {
        console.log(error);
        next(error);
        // res.status(500).json({ message: "Failed to update teacher", error });
    }
});
exports.updateTeacher = updateTeacher;
// Delete a teacher by ID
const deleteTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teacherId = parseInt(req.params.id, 10);
    const teacherPrevData = yield client_1.default.teacher.findUnique({
        where: { id: Number(teacherId) },
        select: { avatar: true },
    });
    yield (0, removeImage_1.default)(teacherPrevData === null || teacherPrevData === void 0 ? void 0 : teacherPrevData.avatar);
    try {
        const result = yield (0, teacherService_1.deleteTeacherService)(teacherId);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.deleteTeacher = deleteTeacher;
