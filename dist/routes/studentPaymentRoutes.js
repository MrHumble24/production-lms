"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentPaymentController_1 = require("../controllers/studentPaymentController");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
/**
 * @route   POST /student-payments
 * @desc    Create a student payment
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.post("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]), studentPaymentController_1.createStudentPaymentController);
/**
 * @route   PATCH /student-payments/:id
 * @desc    Update a student payment by ID
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.patch("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]), studentPaymentController_1.updateStudentPaymentController);
/**
 * @route   DELETE /student-payments/:id
 * @desc    Delete a student payment by ID
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.delete("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]), studentPaymentController_1.deleteStudentPaymentController);
/**
 * @route   GET /student-payments/:id
 * @desc    Get a specific student payment by ID
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT, TEACHER
 */
router.get("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT", "TEACHER"]), studentPaymentController_1.getStudentPaymentByIdController);
/**
 * @route   GET /student-payments
 * @desc    Get all student payments
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT
 */
router.get("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "ACCOUNTANT"]), studentPaymentController_1.getStudentPaymentsController);
/**
 * @route   GET /student-payments/student/:studentID
 * @desc    Get all payments for a specific student
 * @access  COMPANY_OWNER, ADMIN, ACCOUNTANT, TEACHER, STUDENT (can view own payments)
 */
router.get("/student/:studentID", (0, roleMiddleware_1.authorizeRoles)([
    "COMPANY_OWNER",
    "ADMIN",
    "ACCOUNTANT",
    "TEACHER",
    "STUDENT",
]), 
// ensureOwnership("STUDENT"), // Ensure students can only view their own payments
studentPaymentController_1.getStudentPaymentsController);
exports.default = router;
