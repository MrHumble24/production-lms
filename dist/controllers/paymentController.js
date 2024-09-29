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
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMonthlyPaymentsHandler = exports.getStudentPaymentHistoryHandler = exports.getDebtorsHandler = exports.createPrepaymentHandler = void 0;
const studentPaymentService_1 = require("../services/studentPaymentService");
const generateMonthlyPayments_1 = require("../jobs/generateMonthlyPayments");
// Handle student prepayments
const createPrepaymentHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, amount } = req.body;
    try {
        const result = yield (0, studentPaymentService_1.createPrepayment)(Number(studentId), Number(amount));
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.createPrepaymentHandler = createPrepaymentHandler;
// Get students with overdue payments (debtors)
const getDebtorsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const debtors = yield (0, studentPaymentService_1.getDebtors)();
        res.status(200).json(debtors);
    }
    catch (error) {
        next(error);
    }
});
exports.getDebtorsHandler = getDebtorsHandler;
// Get student payment history
const getStudentPaymentHistoryHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    try {
        const history = yield (0, studentPaymentService_1.getStudentPaymentHistory)(Number(studentId));
        res.status(200).json(history);
    }
    catch (error) {
        next(error);
    }
});
exports.getStudentPaymentHistoryHandler = getStudentPaymentHistoryHandler;
// Process monthly payments (manual trigger)
const processMonthlyPaymentsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branchId = req.body.branchId;
        yield (0, generateMonthlyPayments_1.processMonthlyPayments)(branchId);
        res
            .status(200)
            .json({ message: "Monthly payments processed successfully." });
    }
    catch (error) {
        next(error);
    }
});
exports.processMonthlyPaymentsHandler = processMonthlyPaymentsHandler;
