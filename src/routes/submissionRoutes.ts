import { Router } from "express";
import multer from "multer";
import * as submissionController from "../controllers/submissionController";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = Router();
const upload = multer();

// Routes for submissions
router.post(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  upload.single("file"),
  submissionController.createSubmission
); // Create a submission
router.get(
  "/task/:taskId/student/:studentId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  submissionController.getSubmissionByTaskAndStudent
); // Get submission by task and student
router.patch(
  "/:submissionId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  upload.single("file"),
  submissionController.updateSubmission
); // Update a submission
router.delete(
  "/:submissionId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  submissionController.deleteSubmission
); // Delete a submission
router.get(
  "/task/:taskId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  submissionController.getSubmissionsByTask
); // Get all submissions for a task

export default router;
