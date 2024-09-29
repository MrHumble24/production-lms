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
exports.removeTeacherFromSubject = exports.addTeacherToSubject = exports.deleteSubject = exports.updateSubject = exports.getSubjectById = exports.getAllSubjects = exports.createSubject = void 0;
const client_1 = __importDefault(require("../prisma/client"));
// Create a new subject
const createSubject = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    return yield client_1.default.subject.create({
        data: {
            name: data.name,
            description: data.description,
            branch: {
                connect: {
                    id: Number(data.branchId),
                },
            },
        },
    });
});
exports.createSubject = createSubject;
// Get all subjects
const getAllSubjects = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.subject.findMany({
        orderBy: {
            name: "asc",
        },
    });
});
exports.getAllSubjects = getAllSubjects;
// Get a single subject by ID
const getSubjectById = (subjectId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.subject.findUnique({
        where: { id: subjectId },
        include: { teachers: true }, // Include related teachers
    });
});
exports.getSubjectById = getSubjectById;
// Update a subject
const updateSubject = (subjectId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.subject.update({
        where: { id: subjectId },
        data,
    });
});
exports.updateSubject = updateSubject;
// Delete a subject by ID
const deleteSubject = (subjectId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.subject.delete({
        where: { id: subjectId },
    });
});
exports.deleteSubject = deleteSubject;
// Add a teacher to a subject
const addTeacherToSubject = (subjectId, teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.subject.update({
        where: { id: subjectId },
        data: {
            teachers: {
                connect: { id: teacherId },
            },
        },
    });
});
exports.addTeacherToSubject = addTeacherToSubject;
// Remove a teacher from a subject
const removeTeacherFromSubject = (subjectId, teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.subject.update({
        where: { id: subjectId },
        data: {
            teachers: {
                disconnect: { id: teacherId },
            },
        },
    });
});
exports.removeTeacherFromSubject = removeTeacherFromSubject;
