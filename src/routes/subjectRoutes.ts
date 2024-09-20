import express from "express";
import {
  createSubjectHandler,
  getAllSubjectsHandler,
  getSubjectByIdHandler,
  updateSubjectHandler,
  deleteSubjectHandler,
  addTeacherToSubjectHandler,
  removeTeacherFromSubjectHandler,
} from "../controllers/subjectController";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = express.Router();

/**
 * @route   POST /subjects
 * @desc    Create a new subject
 * @access  COMPANY_OWNER, ADMIN
 */
router.post(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  createSubjectHandler
);

/**
 * @route   GET /subjects
 * @desc    Get all subjects
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  getAllSubjectsHandler
);

/**
 * @route   GET /subjects/:id
 * @desc    Get subject details by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  getSubjectByIdHandler
);

/**
 * @route   PUT /subjects/:id
 * @desc    Update a subject by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.put(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  updateSubjectHandler
);

/**
 * @route   DELETE /subjects/:id
 * @desc    Delete a subject by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  deleteSubjectHandler
);

/**
 * @route   POST /subjects/add-teacher
 * @desc    Assign a teacher to a subject
 * @access  COMPANY_OWNER, ADMIN
 */
router.post(
  "/add-teacher",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  addTeacherToSubjectHandler
);

/**
 * @route   POST /subjects/remove-teacher
 * @desc    Remove a teacher from a subject
 * @access  COMPANY_OWNER, ADMIN
 */
router.post(
  "/remove-teacher",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  removeTeacherFromSubjectHandler
);

export default router;
