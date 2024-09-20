import { Router } from "express";
import {
  createAttendanceRecord,
  updateAttendance,
  getAttendanceForStudentInGroup,
  getAttendanceForGroup,
  getAllAttendances,
} from "../controllers/attendanceController";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = Router();

/**
 * @route   POST /attendance
 * @desc    Create a new attendance record
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.post(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  createAttendanceRecord
);

/**
 * @route   GET /attendance
 * @desc    Get all attendance records
 * @access  COMPANY_OWNER, ADMIN
 */
router.get("/", authorizeRoles(["COMPANY_OWNER", "ADMIN"]), getAllAttendances);

/**
 * @route   PUT /attendance/:attendanceId
 * @desc    Update an attendance record
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.put(
  "/:attendanceId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  updateAttendance
);

/**
 * @route   GET /attendance/student/:studentId/group/:groupId
 * @desc    Get attendance for a specific student in a group
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT (can view their own)
 */
router.get(
  "/student/:studentId/group/:groupId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  getAttendanceForStudentInGroup
);

/**
 * @route   GET /attendance/group/:groupId
 * @desc    Get attendance for a specific group
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get(
  "/group/:groupId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  getAttendanceForGroup
);

export default router;
