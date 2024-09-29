"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const teacherController_1 = require("../controllers/teacherController");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const ownershipMiddleware_1 = require("../middleware/ownershipMiddleware");
// Initialize multer for file uploads (e.g., teacher avatar)
const upload = (0, multer_1.default)();
// Create a new router instance
const router = (0, express_1.Router)();
/**
 * @route   GET /teachers
 * @desc    Get all teachers
 * @access  COMPANY_OWNER, ADMIN
 */
router.get("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), teacherController_1.getAllTeachers);
/**
 * @route   GET /teachers/:id
 * @desc    Get teacher details by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER (can view own details)
 */
router.get("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), (0, ownershipMiddleware_1.ensureOwnership)("TEACHER"), // Ensure teachers can only view their own profile
teacherController_1.getTeacherById);
/**
 * @route   POST /teachers
 * @desc    Create a new teacher with an optional avatar upload
 * @access  COMPANY_OWNER, ADMIN
 * @params  Avatar image upload (optional)
 */
router.post("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), upload.single("avatar"), // Handle file upload for teacher avatar
teacherController_1.createTeacher);
/**
 * @route   PUT /teachers/:id/image
 * @desc    Update a teacher's avatar by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER (can update own avatar)
 * @params  Avatar image upload (required)
 */
router.put("/:id/image", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), (0, ownershipMiddleware_1.ensureOwnership)("TEACHER"), // Ensure teachers can only update their own avatar
upload.single("avatar"), teacherController_1.updateTeacherImage);
/**
 * @route   PUT /teachers/:id
 * @desc    Update a teacher's details by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER (can update own details)
 */
router.put("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), (0, ownershipMiddleware_1.ensureOwnership)("TEACHER"), // Ensure teachers can only update their own profile
teacherController_1.updateTeacher);
/**
 * @route   DELETE /teachers/:id
 * @desc    Delete a teacher by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), teacherController_1.deleteTeacher);
exports.default = router;
