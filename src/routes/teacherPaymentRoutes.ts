import { Router } from "express";
import {
  getTeacherPaymentSuggestionsController,
  getTeacherPaymentHistoryController,
  notifyAccountantsController,
  getTeacherPaymentDetailController,
  confirmTeacherPayment,
} from "../controllers/teacherPaymentController";
import { authorizeRoles } from "../middleware/roleMiddleware";
import { ensureOwnership } from "../middleware/ownershipMiddleware"; // Ensure ownership middleware

const router = Router();

/**
 * @route   GET /teacherPayments/:teacherId/suggestions
 * @desc    Fetch payment suggestions for a teacher
 * @access  COMPANY_OWNER, ADMIN, TEACHER (can view own suggestions)
 */
router.get(
  "/:teacherId/suggestions",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  ensureOwnership("TEACHER"), // Ensure teachers can only view their own payment suggestions
  getTeacherPaymentSuggestionsController
);

/**
 * @route   GET /teacherPayments/:teacherId/history
 * @desc    Get teacher's payment history
 * @access  COMPANY_OWNER, ADMIN, TEACHER (can view own history)
 */
router.get(
  "/:teacherId/history",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  getTeacherPaymentHistoryController
);

/**
 * @route   POST /teacherPayments/confirm-payment
 * @desc    Confirm teacher payment after review
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.post(
  "/confirm-payment",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]),
  confirmTeacherPayment
);

/**
 * @route   POST /teacherPayments/:teacherId/notify
 * @desc    Notify accountants of pending teacher payments
 * @access  COMPANY_OWNER, ADMIN
 */
router.post(
  "/:teacherId/notify",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  notifyAccountantsController
);

/**
 * @route   GET /teacherPayments/detail/:paymentId
 * @desc    Get detailed information of a specific payment
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.get(
  "/detail/:paymentId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]),
  getTeacherPaymentDetailController
);

export default router;
