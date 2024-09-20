import { Router } from "express";
import multer from "multer";
import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  updateTeacherImage,
} from "../controllers/teacherController";
import { authorizeRoles } from "../middleware/roleMiddleware";
import { ensureOwnership } from "../middleware/ownershipMiddleware";

// Initialize multer for file uploads (e.g., teacher avatar)
const upload = multer();

// Create a new router instance
const router = Router();

/**
 * @route   GET /teachers
 * @desc    Get all teachers
 * @access  COMPANY_OWNER, ADMIN
 */
router.get(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  getAllTeachers
);

/**
 * @route   GET /teachers/:id
 * @desc    Get teacher details by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER (can view own details)
 */
router.get(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  ensureOwnership("TEACHER"), // Ensure teachers can only view their own profile
  getTeacherById
);

/**
 * @route   POST /teachers
 * @desc    Create a new teacher with an optional avatar upload
 * @access  COMPANY_OWNER, ADMIN
 * @params  Avatar image upload (optional)
 */
router.post(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  upload.single("avatar"), // Handle file upload for teacher avatar
  createTeacher
);

/**
 * @route   PUT /teachers/:id/image
 * @desc    Update a teacher's avatar by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER (can update own avatar)
 * @params  Avatar image upload (required)
 */
router.put(
  "/:id/image",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  ensureOwnership("TEACHER"), // Ensure teachers can only update their own avatar
  upload.single("avatar"),
  updateTeacherImage
);

/**
 * @route   PUT /teachers/:id
 * @desc    Update a teacher's details by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER (can update own details)
 */
router.put(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  ensureOwnership("TEACHER"), // Ensure teachers can only update their own profile
  updateTeacher
);

/**
 * @route   DELETE /teachers/:id
 * @desc    Delete a teacher by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  deleteTeacher
);

export default router;
