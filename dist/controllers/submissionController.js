"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubmissionsByTask = exports.deleteSubmission = exports.updateSubmission = exports.getSubmissionByTaskAndStudent = exports.createSubmission = void 0;
const submissionService = __importStar(require("../services/submissionService"));
const library_1 = require("@prisma/client/runtime/library");
// Create a new submission
const createSubmission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, taskId, content } = req.body;
        const submission = yield submissionService.createSubmission({
            studentId: parseInt(studentId, 10),
            taskId: parseInt(taskId, 10),
            content,
            req,
        });
        res.status(201).json(submission);
    }
    catch (error) {
        if (error instanceof library_1.PrismaClientKnownRequestError) {
            // Check for unique constraint violation (P2002)
            if (error.code === "P2002") {
                return res.status(400).json({
                    errorMsg: "A submission for this task already exists for the student.",
                    details: error.meta, // You can include additional details from Prisma if needed
                });
            }
        }
        // Fallback for other errors
        res.status(500).json({
            errorMsg: "An unexpected error occurred. Please try again.",
            details: error.message, // You can log or return more specific details if needed
        });
    }
});
exports.createSubmission = createSubmission;
// Get submission for a task by a specific student
const getSubmissionByTaskAndStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId, studentId } = req.params;
        const submission = yield submissionService.getSubmissionByTaskAndStudent(parseInt(taskId, 10), parseInt(studentId, 10));
        // if (!submission) {
        //   return res.status(404).json({ message: "Submission not found" });
        // }
        res.json(submission);
    }
    catch (error) {
        console.error("Error fetching submission:", error);
        res.status(500).json({ message: "Failed to get submission" });
    }
});
exports.getSubmissionByTaskAndStudent = getSubmissionByTaskAndStudent;
// Update submission
const updateSubmission = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { submissionId } = req.params;
        const { content, grade, feedback } = req.body;
        // Ensure that the grade is parsed as a number, and content is safely handled
        const updatedSubmission = yield submissionService.updateSubmission(Number(submissionId), {
            content, // Only include content if it's provided
            feedback: feedback || null,
            grade: grade !== undefined ? Number(grade) : undefined, // Ensure the grade is handled properly
        });
        res.json(updatedSubmission);
    }
    catch (error) {
        console.error("Error updating submission:", error);
        next(error);
        // res.status(500).json({ message: "Failed to update submission" });
    }
});
exports.updateSubmission = updateSubmission;
// Delete submission
const deleteSubmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { submissionId } = req.params;
        yield submissionService.deleteSubmission(parseInt(submissionId, 10));
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting submission:", error);
        res.status(500).json({ message: "Failed to delete submission" });
    }
});
exports.deleteSubmission = deleteSubmission;
// Get all submissions for a specific task
const getSubmissionsByTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const submissions = yield submissionService.getSubmissionsByTask(parseInt(taskId, 10));
        res.json(submissions);
    }
    catch (error) {
        console.error("Error fetching submissions:", error);
        res.status(500).json({ message: "Failed to fetch submissions" });
    }
});
exports.getSubmissionsByTask = getSubmissionsByTask;
