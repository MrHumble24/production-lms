import { Router } from "express";
import multer from "multer";
import {
  createGroupNotificationController,
  getGroupNotificationsController,
  getGroupNotificationByIdController,
  updateGroupNotificationController,
  deleteGroupNotificationController,
  getNotificationsByGroupController,
} from "../controllers/groupNotificationController";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = Router();
const upload = multer();

/**
 * @route   POST /group-notifications
 * @desc    Create a new group notification with an optional attachment
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.post(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  upload.array("attachments", 10),
  createGroupNotificationController
);

/**
 * @route   GET /group-notifications
 * @desc    Get all group notifications
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT
 */
router.get(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  getGroupNotificationsController
);

/**
 * @route   GET /group-notifications/:id
 * @desc    Get a specific group notification by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT
 */
router.get(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  getGroupNotificationByIdController
);
/**
 * @route   GET /group-notifications/:id
 * @desc    Get a specific group notification by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT
 */
router.get(
  "/student/:studentId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  getNotificationsByGroupController
);

/**
 * @route   PATCH /group-notifications/:id
 * @desc    Update a group notification with an optional attachment
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.patch(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  upload.array("attachments", 10),
  updateGroupNotificationController
);

/**
 * @route   DELETE /group-notifications/:id
 * @desc    Delete a group notification by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.delete(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  deleteGroupNotificationController
);

export default router;
