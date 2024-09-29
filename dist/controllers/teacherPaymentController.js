"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmTeacherPayment = exports.getTeacherPaymentDetailController = exports.notifyAccountantsController = exports.getTeacherPaymentHistoryController = exports.getTeacherPaymentSuggestionsController = void 0;
const moment_1 = __importDefault(require("moment"));
const teacherPaymentService_1 = require("../services/teacherPaymentService");
// Get payment suggestions for a teacher
const getTeacherPaymentSuggestionsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId } = req.params;
    try {
        const suggestions = yield (0, teacherPaymentService_1.getTeacherPaymentSuggestions)(Number(teacherId));
        res.status(200).json(suggestions);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Failed to fetch teacher payment suggestions" });
    }
});
exports.getTeacherPaymentSuggestionsController = getTeacherPaymentSuggestionsController;
// Get teacher's payment history
const getTeacherPaymentHistoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId } = req.params;
    try {
        const history = yield (0, teacherPaymentService_1.getTeacherPaymentHistory)(Number(teacherId));
        const data = history.map((payment) => {
            return Object.assign(Object.assign({}, payment), { createdAt: (0, moment_1.default)(payment.createdAt).format("ll"), dueDate: (0, moment_1.default)(payment.dueDate).format("ll"), paymentDate: (0, moment_1.default)(payment.paymentDate).format("ll"), updatedAt: (0, moment_1.default)(payment.updatedAt).format("ll") });
        });
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch teacher payment history" });
    }
});
exports.getTeacherPaymentHistoryController = getTeacherPaymentHistoryController;
// Notify accountants about pending payments
const notifyAccountantsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId } = req.params;
    try {
        yield (0, teacherPaymentService_1.notifyAccountantsOfPendingPayments)(Number(teacherId));
        res
            .status(200)
            .json({ message: `Accountants notified for teacher ID ${teacherId}` });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to notify accountants" });
    }
});
exports.notifyAccountantsController = notifyAccountantsController;
// Get payment detail by paymentId
const getTeacherPaymentDetailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { paymentId } = req.params;
    try {
        const detail = yield (0, teacherPaymentService_1.getTeacherPaymentDetail)(Number(paymentId));
        res.status(200).json(detail);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch payment detail" });
    }
});
exports.getTeacherPaymentDetailController = getTeacherPaymentDetailController;
// Controller for confirming and paying the teacher
const confirmTeacherPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherId, paymentData } = req.body;
    // Basic validation
    if (!teacherId || !paymentData || typeof paymentData !== "object") {
        return res.status(400).json({
            success: false,
            message: "Invalid request: Missing or invalid teacherId or paymentData.",
        });
    }
    try {
        // Call the service function to process a single payment
        const result = yield (0, teacherPaymentService_1.confirmAndPayTeacher)(teacherId, paymentData);
        // Send success response
        return res.status(200).json({
            success: true,
            message: "Teacher payment confirmed successfully.",
            data: result,
        });
    }
    catch (error) {
        console.error("Error confirming teacher payment:", error);
        next(error); // Pass the error to the next middleware (error handler)
    }
});
exports.confirmTeacherPayment = confirmTeacherPayment;
