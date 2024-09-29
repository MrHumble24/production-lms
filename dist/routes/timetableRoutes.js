"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const timetableController_1 = require("../controllers/timetableController");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
/**
 * @route   GET /timetables
 * @desc    Get all timetables
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT (can view timetables)
 */
router.get("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), timetableController_1.getAllTimetables);
/**
 * @route   GET /timetables/:id
 * @desc    Get timetable details by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT (can view timetables)
 */
router.get("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), timetableController_1.getTimetableById);
/**
 * @route   POST /timetables
 * @desc    Create a new timetable
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.post("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), timetableController_1.createTimetable);
/**
 * @route   PUT /timetables/:id
 * @desc    Update timetable by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.put("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), timetableController_1.updateTimetable);
/**
 * @route   DELETE /timetables/:id
 * @desc    Delete a timetable by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), timetableController_1.deleteTimetable);
/**
 * @route   POST /timetables/create-group-timetable
 * @desc    Create a timetable for a group
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.post("/create-group-timetable", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), timetableController_1.createGroupTimetableHandler);
exports.default = router;
