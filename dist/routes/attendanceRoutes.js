"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendanceController_1 = require("../controllers/attendanceController");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
/**
 * @route   POST /attendance
 * @desc    Create a new attendance record
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.post("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), attendanceController_1.createAttendanceRecord);
/**
 * @route   GET /attendance
 * @desc    Get all attendance records
 * @access  COMPANY_OWNER, ADMIN
 */
router.get("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), attendanceController_1.getAllAttendances);
/**
 * @route   PUT /attendance/:attendanceId
 * @desc    Update an attendance record
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.put("/:attendanceId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), attendanceController_1.updateAttendance);
/**
 * @route   GET /attendance/student/:studentId/group/:groupId
 * @desc    Get attendance for a specific student in a group
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT (can view their own)
 */
router.get("/student/:studentId/group/:groupId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), attendanceController_1.getAttendanceForStudentInGroup);
/**
 * @route   GET /attendance/group/:groupId
 * @desc    Get attendance for a specific group
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get("/group/:groupId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), attendanceController_1.getAttendanceForGroup);
exports.default = router;
