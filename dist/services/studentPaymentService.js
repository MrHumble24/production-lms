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
exports.createPrepayment = exports.getStudentPaymentHistory = exports.notifyDebtors = exports.getDebtors = exports.handlePrepayment = exports.createMonthlyPayment = exports.getStudentPayments = exports.getAllStudentPayments = exports.getStudentPaymentById = exports.deleteStudentPayment = exports.updateStudentPayment = exports.createStudentPayment = void 0;
const moment_1 = __importDefault(require("moment"));
const client_1 = __importDefault(require("../prisma/client"));
const createStudentPayment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, paymentDate, dueDate, method, status, description, currency, paidById, studentId, branchId, groupId, } = data;
    return yield client_1.default.studentPayment.create({
        data: {
            amount,
            paymentDate: new Date(paymentDate),
            dueDate: new Date(dueDate),
            method,
            status,
            description,
            currency,
            paidBy: {
                connect: {
                    id: Number(paidById),
                },
            },
            student: {
                connect: {
                    id: Number(studentId),
                },
            },
            branch: {
                connect: {
                    id: Number(branchId),
                },
            },
            group: {
                connect: {
                    id: Number(groupId),
                },
            },
        },
    });
});
exports.createStudentPayment = createStudentPayment;
const updateStudentPayment = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, paymentDate, dueDate, method, status, description, currency, } = data;
    return yield client_1.default.studentPayment.update({
        where: { id: Number(id) },
        data: {
            amount,
            paymentDate: new Date(paymentDate),
            dueDate: new Date(dueDate),
            method,
            status,
            description,
            currency,
        },
    });
});
exports.updateStudentPayment = updateStudentPayment;
const deleteStudentPayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.studentPayment.delete({
        where: { id: Number(id) },
    });
});
exports.deleteStudentPayment = deleteStudentPayment;
const getStudentPaymentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.studentPayment.findUnique({
        where: { id: Number(id) },
    });
});
exports.getStudentPaymentById = getStudentPaymentById;
const getAllStudentPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.studentPayment.findMany();
});
exports.getAllStudentPayments = getAllStudentPayments;
const getStudentPayments = (studentID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.studentPayment.findMany({
        where: { studentId: Number(studentID) },
        include: {
            student: true,
            branch: true,
            group: true,
        },
    });
});
exports.getStudentPayments = getStudentPayments;
const createMonthlyPayment = (studentId, groupId, fullMonthlyFee, dueDate, branchId) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield client_1.default.student.findUnique({
        where: { id: studentId },
        select: { prepaidBalance: true },
    });
    console.log({ branchId });
    if (!student) {
        throw new Error("Student not found");
    }
    // Check if the student has enough prepaid balance to cover the fee
    if (student.prepaidBalance >= fullMonthlyFee) {
        // Deduct from prepaid balance and mark as PAID
        yield client_1.default.student.update({
            where: { id: studentId },
            data: { prepaidBalance: { decrement: fullMonthlyFee } },
        });
        yield client_1.default.studentPayment.create({
            data: {
                amount: fullMonthlyFee,
                status: "PAID",
                paymentDate: new Date(),
                dueDate: dueDate,
                studentId: studentId,
                groupId: groupId,
                branchId: branchId,
            },
        });
    }
    else {
        // If prepaid balance is insufficient, create a NOT_PAID payment
        yield client_1.default.studentPayment.create({
            data: {
                amount: fullMonthlyFee,
                status: "NOT_PAID",
                dueDate: dueDate,
                studentId: studentId,
                groupId: groupId,
                branchId: branchId,
            },
        });
    }
});
exports.createMonthlyPayment = createMonthlyPayment;
const handlePrepayment = (studentId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    yield client_1.default.student.update({
        where: { id: studentId },
        data: { prepaidBalance: { increment: amount } },
    });
    return { message: `Prepayment of ${amount} added to student's balance.` };
});
exports.handlePrepayment = handlePrepayment;
const getDebtors = () => __awaiter(void 0, void 0, void 0, function* () {
    const overduePayments = yield client_1.default.studentPayment.findMany({
        where: {
            status: "NOT_PAID",
            dueDate: { lt: new Date() },
        },
        include: {
            student: true,
            group: true,
        },
    });
    return overduePayments.map((payment) => ({
        student: `${payment.student.firstName} ${payment.student.lastName}`,
        group: payment.group.name,
        amount: payment.amount,
        dueDate: payment.dueDate,
    }));
});
exports.getDebtors = getDebtors;
const notifyDebtors = () => __awaiter(void 0, void 0, void 0, function* () {
    const debtors = yield (0, exports.getDebtors)();
    debtors.forEach((debtor) => {
        console.log(`Notification: Student ${debtor.student} owes ${debtor.amount} for ${debtor.group}. Due date: ${debtor.dueDate}`);
        // Here, you could integrate an email or SMS notification service.
    });
});
exports.notifyDebtors = notifyDebtors;
const getStudentPaymentHistory = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const payments = yield client_1.default.studentPayment.findMany({
        where: { studentId },
        include: { group: true, student: true, branch: true, paidBy: true },
        orderBy: { dueDate: "desc" },
    });
    return payments.map((payment) => {
        var _a;
        return ({
            student: payment.student,
            prepaidBalance: payment.student.prepaidBalance,
            branchId: (_a = payment.branch) === null || _a === void 0 ? void 0 : _a.id,
            group: payment.group.name,
            groupPrice: payment.group.price,
            amount: payment.amount,
            status: payment.status,
            paymentDate: (0, moment_1.default)(payment.paymentDate).format("ll"),
            dueDate: (0, moment_1.default)(payment.dueDate).format("ll"),
            method: payment.method,
            description: payment.description,
            currency: payment.currency,
            paidBy: payment.paidBy,
            paidById: payment.paidById,
            id: payment.id,
            createdAt: (0, moment_1.default)(payment.createdAt).format("ll"),
            updatedAt: payment.updatedAt,
        });
    });
});
exports.getStudentPaymentHistory = getStudentPaymentHistory;
/**
 * Handles a student's prepayment by updating their prepaidBalance.
 * @param studentId - The ID of the student making the prepayment.
 * @param amount - The amount of the prepayment.
 * @returns A message indicating success.
 */
const createPrepayment = (studentId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the student by ID
    const student = yield client_1.default.student.findUnique({
        where: { id: studentId },
    });
    if (!student) {
        throw new Error("Student not found");
    }
    // Increment the student's prepaid balance
    yield client_1.default.student.update({
        where: { id: studentId },
        data: {
            prepaidBalance: {
                increment: amount, // Add the prepayment amount to the student's balance
            },
        },
    });
    return {
        message: `Prepayment of ${amount} added to student's prepaid balance.`,
    };
});
exports.createPrepayment = createPrepayment;
