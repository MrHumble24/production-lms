import { Router } from "express";
import {
  getAllTimetables,
  getTimetableById,
  createTimetable,
  updateTimetable,
  deleteTimetable,
  createGroupTimetableHandler,
} from "../controllers/timetableController";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = Router();

/**
 * @route   GET /timetables
 * @desc    Get all timetables
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT (can view timetables)
 */
router.get(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  getAllTimetables
);

/**
 * @route   GET /timetables/:id
 * @desc    Get timetable details by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT (can view timetables)
 */
router.get(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  getTimetableById
);

/**
 * @route   POST /timetables
 * @desc    Create a new timetable
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.post(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  createTimetable
);

/**
 * @route   PUT /timetables/:id
 * @desc    Update timetable by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.put(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  updateTimetable
);

/**
 * @route   DELETE /timetables/:id
 * @desc    Delete a timetable by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  deleteTimetable
);

/**
 * @route   POST /timetables/create-group-timetable
 * @desc    Create a timetable for a group
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.post(
  "/create-group-timetable",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  createGroupTimetableHandler
);

export default router;
