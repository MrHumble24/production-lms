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
exports.updateTeacherImageService = exports.softDeleteGroup = exports.deleteTeacherService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const removeImage_1 = __importDefault(require("../helpers/removeImage"));
const uploadImage_1 = __importDefault(require("../helpers/uploadImage"));
const deleteTeacherService = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the teacher exists
    const teacher = yield client_1.default.teacher.findUnique({
        where: { id: teacherId },
    });
    if (!teacher) {
        throw new Error("Teacher not found");
    }
    // Begin a transaction to ensure data consistency
    yield client_1.default.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        // Soft delete the teacher by setting isDeleted to true
        yield prisma.teacher.delete({
            where: { id: teacherId },
        });
        // Set teacherId to null for all related groups
        yield prisma.group.updateMany({
            where: { teacherId: teacherId },
            data: { teacherId: null },
        });
        // Set teacherId to null for all related timetables
        yield prisma.timetable.updateMany({
            where: { teacherId: teacherId },
            data: { teacherId: null },
        });
    }));
    return {
        message: "Teacher soft deleted successfully and related records updated",
    };
});
exports.deleteTeacherService = deleteTeacherService;
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
                deleteMany: {}, // Delete all associated timetables
            },
            students: {
                disconnect: group.students.map((student) => ({ id: student.id })), // Disconnect all students
            },
        },
    });
    return updatedGroup;
});
exports.softDeleteGroup = softDeleteGroup;
const updateTeacherImageService = (teacherId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield client_1.default.teacher.findUnique({
        where: { id: teacherId },
        select: { avatar: true },
    });
    if (teacher === null || teacher === void 0 ? void 0 : teacher.avatar) {
        yield (0, removeImage_1.default)(teacher === null || teacher === void 0 ? void 0 : teacher.avatar).then((res) => __awaiter(void 0, void 0, void 0, function* () { }));
    }
    const newLogo = yield (0, uploadImage_1.default)(data, "avatars");
    return yield client_1.default.teacher.update({
        where: { id: teacherId },
        data: {
            avatar: newLogo,
        },
    });
});
exports.updateTeacherImageService = updateTeacherImageService;
