"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const groupNotificationController_1 = require("../controllers/groupNotificationController");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
/**
 * @route   POST /group-notifications
 * @desc    Create a new group notification with an optional attachment
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.post("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), upload.array("attachments", 10), groupNotificationController_1.createGroupNotificationController);
/**
 * @route   GET /group-notifications
 * @desc    Get all group notifications
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT
 */
router.get("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), groupNotificationController_1.getGroupNotificationsController);
/**
 * @route   GET /group-notifications/:id
 * @desc    Get a specific group notification by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT
 */
router.get("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), groupNotificationController_1.getGroupNotificationByIdController);
/**
 * @route   GET /group-notifications/:id
 * @desc    Get a specific group notification by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT
 */
router.get("/student/:studentId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), groupNotificationController_1.getNotificationsByGroupController);
/**
 * @route   PATCH /group-notifications/:id
 * @desc    Update a group notification with an optional attachment
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.patch("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), upload.array("attachments", 10), groupNotificationController_1.updateGroupNotificationController);
/**
 * @route   DELETE /group-notifications/:id
 * @desc    Delete a group notification by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.delete("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), groupNotificationController_1.deleteGroupNotificationController);
exports.default = router;
