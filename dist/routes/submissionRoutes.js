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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const submissionController = __importStar(require("../controllers/submissionController"));
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
// Routes for submissions
router.post("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), upload.single("file"), submissionController.createSubmission); // Create a submission
router.get("/task/:taskId/student/:studentId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), submissionController.getSubmissionByTaskAndStudent); // Get submission by task and student
router.patch("/:submissionId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), upload.single("file"), submissionController.updateSubmission); // Update a submission
router.delete("/:submissionId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), submissionController.deleteSubmission); // Delete a submission
router.get("/task/:taskId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), submissionController.getSubmissionsByTask); // Get all submissions for a task
exports.default = router;
