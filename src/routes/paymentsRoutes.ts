import { Router } from "express";
import {
  createPrepaymentHandler,
  getDebtorsHandler,
  getStudentPaymentHistoryHandler,
  processMonthlyPaymentsHandler,
} from "../controllers/paymentController";
import { authorizeRoles } from "../middleware/roleMiddleware";
import { ensureOwnership } from "../middleware/ownershipMiddleware"; // Ownership middleware

const router = Router();

/**
 * @route   POST /payments/prepay
 * @desc    Handle student prepayments
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.post(
  "/prepay",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]),
  createPrepaymentHandler
);

/**
 * @route   GET /payments/debtors
 * @desc    Fetch students with overdue payments
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.get(
  "/debtors",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]),
  getDebtorsHandler
);

/**
 * @route   GET /payments/:studentId/history
 * @desc    Fetch student payment history by student ID
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT, TEACHER, STUDENT (can view own history)
 */
router.get(
  "/:studentId/history",
  authorizeRoles([
    "COMPANY_OWNER",
    "ADMIN",
    "ACCOUNTANT",
    "TEACHER",
    "STUDENT",
  ]),
  ensureOwnership("STUDENT"), // Ensure students can only view their own payment history
  getStudentPaymentHistoryHandler
);

/**
 * @route   POST /payments/process-monthly
 * @desc    Manually trigger monthly payment processing
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.post(
  "/process-monthly",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]),
  processMonthlyPaymentsHandler
);

export default router;
