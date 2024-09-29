"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherPaymentController_1 = require("../controllers/teacherPaymentController");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const ownershipMiddleware_1 = require("../middleware/ownershipMiddleware"); // Ensure ownership middleware
const router = (0, express_1.Router)();
/**
 * @route   GET /teacherPayments/:teacherId/suggestions
 * @desc    Fetch payment suggestions for a teacher
 * @access  COMPANY_OWNER, ADMIN, TEACHER (can view own suggestions)
 */
router.get("/:teacherId/suggestions", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), (0, ownershipMiddleware_1.ensureOwnership)("TEACHER"), // Ensure teachers can only view their own payment suggestions
teacherPaymentController_1.getTeacherPaymentSuggestionsController);
/**
 * @route   GET /teacherPayments/:teacherId/history
 * @desc    Get teacher's payment history
 * @access  COMPANY_OWNER, ADMIN, TEACHER (can view own history)
 */
router.get("/:teacherId/history", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), teacherPaymentController_1.getTeacherPaymentHistoryController);
/**
 * @route   POST /teacherPayments/confirm-payment
 * @desc    Confirm teacher payment after review
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.post("/confirm-payment", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]), teacherPaymentController_1.confirmTeacherPayment);
/**
 * @route   POST /teacherPayments/:teacherId/notify
 * @desc    Notify accountants of pending teacher payments
 * @access  COMPANY_OWNER, ADMIN
 */
router.post("/:teacherId/notify", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), teacherPaymentController_1.notifyAccountantsController);
/**
 * @route   GET /teacherPayments/detail/:paymentId
 * @desc    Get detailed information of a specific payment
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.get("/detail/:paymentId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]), teacherPaymentController_1.getTeacherPaymentDetailController);
exports.default = router;
