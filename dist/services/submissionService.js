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
exports.getSubmissionsByTask = exports.deleteSubmission = exports.updateSubmission = exports.getSubmissionByTaskAndStudent = exports.createSubmission = void 0;
const client_1 = require("@prisma/client");
const uploadImage_1 = __importDefault(require("../helpers/uploadImage"));
const prisma = new client_1.PrismaClient();
// Create a new submission
const createSubmission = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let file;
    if (data.req.file) {
        file = yield (0, uploadImage_1.default)(data.req.file, "submissions");
    }
    return prisma.submission.create({
        data: {
            studentId: Number(data.studentId),
            taskId: Number(data.taskId),
            content: data.content || null,
            fileUrl: file || null,
        },
    });
});
exports.createSubmission = createSubmission;
// Get submission by studentId and taskId
const getSubmissionByTaskAndStudent = (taskId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.submission.findUnique({
        where: {
            taskId_studentId: {
                taskId,
                studentId,
            },
        },
        include: {
            student: true,
            task: true,
        },
    });
});
exports.getSubmissionByTaskAndStudent = getSubmissionByTaskAndStudent;
// Update submission
const updateSubmission = (submissionId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const submission = yield prisma.submission.findUnique({
        where: { id: submissionId },
        include: {
            student: true,
            task: true,
        },
    });
    return prisma.submission.update({
        where: { id: submissionId },
        data: Object.assign(Object.assign({}, data), { content: data.content, grade: data.grade, feedback: data === null || data === void 0 ? void 0 : data.feedback }),
    });
});
exports.updateSubmission = updateSubmission;
// Delete submission
const deleteSubmission = (submissionId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.submission.delete({
        where: { id: Number(submissionId) },
    });
});
exports.deleteSubmission = deleteSubmission;
// Get all submissions for a specific task
const getSubmissionsByTask = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.submission.findMany({
        where: { taskId: Number(taskId) },
        include: {
            student: true,
            task: true,
        },
    });
});
exports.getSubmissionsByTask = getSubmissionsByTask;
