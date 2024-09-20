import { Router } from "express";
import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getGroupById,
  getGroupStudentsHandler,
  getGroupTimetableHandler,
  reassignTeacherToGroupHandler,
  removeStudentFromGroupHandler,
  updateGroup,
  updateGroupCapacityHandler,
} from "../controllers/groupController";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = Router();

/**
 * @route   GET /groups
 * @desc    Get all groups
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  getAllGroups
);

/**
 * @route   GET /groups/:id
 * @desc    Get group details by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT
 */
router.get(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  getGroupById
);

/**
 * @route   POST /groups
 * @desc    Create a new group
 * @access  COMPANY_OWNER, ADMIN
 */
router.post("/", authorizeRoles(["COMPANY_OWNER", "ADMIN"]), createGroup);

/**
 * @route   PUT /groups/:id
 * @desc    Update a group by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.put("/:id", authorizeRoles(["COMPANY_OWNER", "ADMIN"]), updateGroup);

/**
 * @route   DELETE /groups/:id
 * @desc    Delete a group by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete("/:id", authorizeRoles(["COMPANY_OWNER", "ADMIN"]), deleteGroup);

/**
 * @route   POST /groups/remove-student
 * @desc    Remove a student from a group
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.post(
  "/remove-student",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  removeStudentFromGroupHandler
);

/**
 * @route   PUT /groups/update-capacity
 * @desc    Update group capacity
 * @access  COMPANY_OWNER, ADMIN
 */
router.put(
  "/update-capacity",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  updateGroupCapacityHandler
);

/**
 * @route   PUT /groups/reassign-teacher
 * @desc    Reassign a teacher to a group
 * @access  COMPANY_OWNER, ADMIN
 */
router.put(
  "/reassign-teacher",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  reassignTeacherToGroupHandler
);

/**
 * @route   GET /groups/:id/timetable
 * @desc    Get the timetable for a group by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT
 */
router.get(
  "/:id/timetable",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  getGroupTimetableHandler
);

/**
 * @route   GET /groups/:id/students
 * @desc    Get the list of students in a group
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get(
  "/:id/students",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  getGroupStudentsHandler
);

export default router;
