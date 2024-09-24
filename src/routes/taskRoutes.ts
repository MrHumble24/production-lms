import { Router } from "express";
import * as taskController from "../controllers/taskController";
import multer from "multer";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = Router();
const upload = multer();

/**
 * @route   POST /tasks
 * @desc    Create a new task with optional attachments
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 * @params  Attachments (optional, up to 10 files)
 */
router.post(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  upload.array("attachments", 10),
  taskController.createTask
);

/**
 * @route   GET /tasks
 * @desc    Get a list of all tasks
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT (can view tasks assigned to them)
 */
router.get(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  taskController.getAllTasks
);

/**
 * @route   GET /tasks/:id
 * @desc    Get task details by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT (can view tasks assigned to them)
 */
router.get(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  taskController.getTaskById
);

/**
 * @route   PATCH /tasks/:id
 * @desc    Update a task by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.patch(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  upload.array("attachments", 10),
  taskController.updateTask
);

/**
 * @route   DELETE /tasks/:id
 * @desc    Delete a task by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  taskController.deleteTask
);

export default router;
