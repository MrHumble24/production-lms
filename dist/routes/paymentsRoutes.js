"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const ownershipMiddleware_1 = require("../middleware/ownershipMiddleware"); // Ownership middleware
const router = (0, express_1.Router)();
/**
 * @route   POST /payments/prepay
 * @desc    Handle student prepayments
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.post("/prepay", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]), paymentController_1.createPrepaymentHandler);
/**
 * @route   GET /payments/debtors
 * @desc    Fetch students with overdue payments
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.get("/debtors", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]), paymentController_1.getDebtorsHandler);
/**
 * @route   GET /payments/:studentId/history
 * @desc    Fetch student payment history by student ID
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT, TEACHER, STUDENT (can view own history)
 */
router.get("/:studentId/history", (0, roleMiddleware_1.authorizeRoles)([
    "COMPANY_OWNER",
    "ADMIN",
    "ACCOUNTANT",
    "TEACHER",
    "STUDENT",
]), (0, ownershipMiddleware_1.ensureOwnership)("STUDENT"), // Ensure students can only view their own payment history
paymentController_1.getStudentPaymentHistoryHandler);
/**
 * @route   POST /payments/process-monthly
 * @desc    Manually trigger monthly payment processing
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.post("/process-monthly", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]), paymentController_1.processMonthlyPaymentsHandler);
exports.default = router;
