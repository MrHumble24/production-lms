import { Router } from "express";
import multer from "multer";
import {
  addStudentToGroupHandler,
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  getStudentGroupsHandler,
  removeStudentFromGroupHandler,
  updateStudent,
  updateStudentImage,
  updateStudentProfileController,
} from "../controllers/studentController";
import { authorizeRoles } from "../middleware/roleMiddleware";
import { ensureOwnership } from "../middleware/ownershipMiddleware"; // Corrected ownership middleware

const upload = multer();

const router = Router();

/**
 * @route   GET /students
 * @desc    Get a list of all students
 * @access  COMPANY_OWNER, ADMIN
 */
router.get(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  getAllStudents
);

/**
 * @route   GET /students/:id
 * @desc    Get details of a specific student by ID
 * @access  COMPANY_OWNER, ADMIN, STUDENT, TEACHER
 */
router.get(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "STUDENT", "TEACHER"]),
  // ensureOwnership("STUDENT"), // Ensure the student can only access their own profile
  getStudentById
);

/**
 * @route   POST /students
 * @desc    Create a new student
 * @access  COMPANY_OWNER, ADMIN
 * @params  Avatar image upload (optional)
 */
router.post(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  upload.single("avatar"),
  createStudent
);

/**
 * @route   PUT /students/:id
 * @desc    Update details of a student
 * @access  COMPANY_OWNER, ADMIN, STUDENT
 */
router.patch(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "STUDENT"]),
  ensureOwnership("STUDENT"), // Ensure the student can only update their own profile
  updateStudent
);

/**
 * @route   PUT /students/:id
 * @desc    Update details of a student
 * @access  COMPANY_OWNER, ADMIN, STUDENT
 */
router.put(
  "/:id/profile",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "STUDENT"]),
  updateStudentProfileController
);

/**
 * @route   PUT /students/:id/image
 * @desc    Update the avatar image of a student
 * @access  COMPANY_OWNER, ADMIN, STUDENT
 * @params  Avatar image upload (required)
 */
router.put(
  "/:id/image",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "STUDENT"]),
  ensureOwnership("STUDENT"), // Ensure the student can only update their own avatar
  upload.single("avatar"),
  updateStudentImage
);

/**
 * @route   DELETE /students/:id
 * @desc    Delete a student by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  deleteStudent
);

/**
 * @route   POST /students/add-student
 * @desc    Add a student to a group
 * @access  COMPANY_OWNER, ADMIN
 */
router.post(
  "/add-student",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  addStudentToGroupHandler
);

/**
 * @route   POST /students/remove-student
 * @desc    Remove a student from a group
 * @access  COMPANY_OWNER, ADMIN
 */
router.post(
  "/remove-student",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  removeStudentFromGroupHandler
);

/**
 * @route   GET /students/:id/groups
 * @desc    Get the list of groups a specific student belongs to
 * @access  COMPANY_OWNER, ADMIN, STUDENT
 */
router.get(
  "/:id/groups",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "STUDENT", "TEACHER"]),
  ensureOwnership("STUDENT"), // Ensure the student can only view their own groups
  getStudentGroupsHandler
);

export default router;
