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
exports.getStudentPaymentsController = exports.getAllStudentPaymentsController = exports.getStudentPaymentByIdController = exports.deleteStudentPaymentController = exports.updateStudentPaymentController = exports.createStudentPaymentController = void 0;
const studentPaymentService_1 = require("../services/studentPaymentService");
const createStudentPaymentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPayment = yield (0, studentPaymentService_1.createStudentPayment)(req.body);
        res.status(201).json(newPayment);
    }
    catch (error) {
        res.status(400).json({ message: "Error creating payment", error });
    }
});
exports.createStudentPaymentController = createStudentPaymentController;
const updateStudentPaymentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPayment = yield (0, studentPaymentService_1.updateStudentPayment)(Number(req.params.id), req.body);
        res.status(200).json(updatedPayment);
    }
    catch (error) {
        res.status(400).json({ message: "Error updating payment", error });
    }
});
exports.updateStudentPaymentController = updateStudentPaymentController;
const deleteStudentPaymentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, studentPaymentService_1.deleteStudentPayment)(Number(req.params.id));
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ message: "Error deleting payment", error });
    }
});
exports.deleteStudentPaymentController = deleteStudentPaymentController;
const getStudentPaymentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log({ par: req.params });
        const payment = yield (0, studentPaymentService_1.getStudentPaymentById)(Number(req.params.id));
        console.log({ payment });
        if (payment) {
            res.status(200).json(payment);
        }
        else {
            res.status(404).json({ message: "Payment not found" });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Error fetching payment", error });
    }
});
exports.getStudentPaymentByIdController = getStudentPaymentByIdController;
const getAllStudentPaymentsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield (0, studentPaymentService_1.getAllStudentPayments)();
        res.status(200).json(payments);
    }
    catch (error) {
        res.status(400).json({ message: "Error fetching payments", error });
    }
});
exports.getAllStudentPaymentsController = getAllStudentPaymentsController;
const getStudentPaymentsController = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentID = _req.params.studentID;
    try {
        console.log({ studentID });
        const payments = yield (0, studentPaymentService_1.getStudentPayments)(studentID);
        res.status(200).json(payments);
    }
    catch (error) {
        res.status(400).json({ message: "Error fetching payments", error });
    }
});
exports.getStudentPaymentsController = getStudentPaymentsController;
