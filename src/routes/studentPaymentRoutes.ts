import { Router } from "express";
import {
  createStudentPaymentController,
  updateStudentPaymentController,
  deleteStudentPaymentController,
  getStudentPaymentByIdController,
  getAllStudentPaymentsController,
  getStudentPaymentsController,
} from "../controllers/studentPaymentController";
import { authorizeRoles } from "../middleware/roleMiddleware";
import { ensureOwnership } from "../middleware/ownershipMiddleware"; // Ownership middleware

const router = Router();

/**
 * @route   POST /student-payments
 * @desc    Create a student payment
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.post(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]),
  createStudentPaymentController
);

/**
 * @route   PATCH /student-payments/:id
 * @desc    Update a student payment by ID
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.patch(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]),
  updateStudentPaymentController
);

/**
 * @route   DELETE /student-payments/:id
 * @desc    Delete a student payment by ID
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.delete(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]),
  deleteStudentPaymentController
);

/**
 * @route   GET /student-payments/:id
 * @desc    Get a specific student payment by ID
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT, TEACHER
 */
router.get(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT", "TEACHER"]),
  getStudentPaymentByIdController
);

/**
 * @route   GET /student-payments
 * @desc    Get all student payments
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.get(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]),
  getStudentPaymentsController
);

/**
 * @route   GET /student-payments/student/:studentID
 * @desc    Get all payments for a specific student
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT, TEACHER, STUDENT (can view own payments)
 */
router.get(
  "/student/:studentID",
  authorizeRoles([
    "COMPANY_OWNER",
    "ADMIN",
    "ACCOUNTANT",
    "TEACHER",
    "STUDENT",
  ]),
  // ensureOwnership("STUDENT"), // Ensure students can only view their own payments
  getStudentPaymentsController
);

export default router;
