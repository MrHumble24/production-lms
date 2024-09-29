"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const groupController_1 = require("../controllers/groupController");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
/**
 * @route   GET /groups
 * @desc    Get all groups
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), groupController_1.getAllGroups);
/**
 * @route   GET /groups/:id
 * @desc    Get group details by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT
 */
router.get("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), groupController_1.getGroupById);
/**
 * @route   POST /groups
 * @desc    Create a new group
 * @access  COMPANY_OWNER, ADMIN
 */
router.post("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), groupController_1.createGroup);
/**
 * @route   PUT /groups/:id
 * @desc    Update a group by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.put("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), groupController_1.updateGroup);
/**
 * @route   DELETE /groups/:id
 * @desc    Delete a group by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), groupController_1.deleteGroup);
/**
 * @route   POST /groups/remove-student
 * @desc    Remove a student from a group
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.post("/remove-student", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), groupController_1.removeStudentFromGroupHandler);
/**
 * @route   PUT /groups/update-capacity
 * @desc    Update group capacity
 * @access  COMPANY_OWNER, ADMIN
 */
router.put("/update-capacity", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), groupController_1.updateGroupCapacityHandler);
/**
 * @route   PUT /groups/reassign-teacher
 * @desc    Reassign a teacher to a group
 * @access  COMPANY_OWNER, ADMIN
 */
router.put("/reassign-teacher", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), groupController_1.reassignTeacherToGroupHandler);
/**
 * @route   GET /groups/:id/timetable
 * @desc    Get the timetable for a group by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT
 */
router.get("/:id/timetable", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), groupController_1.getGroupTimetableHandler);
/**
 * @route   GET /groups/:id/students
 * @desc    Get the list of students in a group
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get("/:id/students", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), groupController_1.getGroupStudentsHandler);
exports.default = router;
