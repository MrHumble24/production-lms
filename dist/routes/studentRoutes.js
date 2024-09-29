"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const studentController_1 = require("../controllers/studentController");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const ownershipMiddleware_1 = require("../middleware/ownershipMiddleware"); // Corrected ownership middleware
const upload = (0, multer_1.default)();
const router = (0, express_1.Router)();
/**
 * @route   GET /students
 * @desc    Get a list of all students
 * @access  COMPANY_OWNER, ADMIN
 */
router.get("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), studentController_1.getAllStudents);
/**
 * @route   GET /students/:id
 * @desc    Get details of a specific student by ID
 * @access  COMPANY_OWNER, ADMIN, STUDENT, TEACHER
 */
router.get("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "STUDENT", "TEACHER"]), 
// ensureOwnership("STUDENT"), // Ensure the student can only access their own profile
studentController_1.getStudentById);
/**
 * @route   POST /students
 * @desc    Create a new student
 * @access  COMPANY_OWNER, ADMIN
 * @params  Avatar image upload (optional)
 */
router.post("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), upload.single("avatar"), studentController_1.createStudent);
/**
 * @route   PUT /students/:id
 * @desc    Update details of a student
 * @access  COMPANY_OWNER, ADMIN, STUDENT
 */
router.patch("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "STUDENT"]), (0, ownershipMiddleware_1.ensureOwnership)("STUDENT"), // Ensure the student can only update their own profile
studentController_1.updateStudent);
/**
 * @route   PUT /students/:id
 * @desc    Update details of a student
 * @access  COMPANY_OWNER, ADMIN, STUDENT
 */
router.put("/:id/profile", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "STUDENT"]), studentController_1.updateStudentProfileController);
/**
 * @route   PUT /students/:id/image
 * @desc    Update the avatar image of a student
 * @access  COMPANY_OWNER, ADMIN, STUDENT
 * @params  Avatar image upload (required)
 */
router.put("/:id/image", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "STUDENT"]), (0, ownershipMiddleware_1.ensureOwnership)("STUDENT"), // Ensure the student can only update their own avatar
upload.single("avatar"), studentController_1.updateStudentImage);
/**
 * @route   DELETE /students/:id
 * @desc    Delete a student by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), studentController_1.deleteStudent);
/**
 * @route   POST /students/add-student
 * @desc    Add a student to a group
 * @access  COMPANY_OWNER, ADMIN
 */
router.post("/add-student", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), studentController_1.addStudentToGroupHandler);
/**
 * @route   POST /students/remove-student
 * @desc    Remove a student from a group
 * @access  COMPANY_OWNER, ADMIN
 */
router.post("/remove-student", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), studentController_1.removeStudentFromGroupHandler);
/**
 * @route   GET /students/:id/groups
 * @desc    Get the list of groups a specific student belongs to
 * @access  COMPANY_OWNER, ADMIN, STUDENT
 */
router.get("/:id/groups", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "STUDENT", "TEACHER"]), (0, ownershipMiddleware_1.ensureOwnership)("STUDENT"), // Ensure the student can only view their own groups
studentController_1.getStudentGroupsHandler);
exports.default = router;
