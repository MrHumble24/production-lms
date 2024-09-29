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
exports.deleteTeacherPayment = exports.updateTeacherPayment = exports.createTeacherPayment = exports.getTeacherPaymentById = exports.getAllTeacherPayments = void 0;
const client_1 = __importDefault(require("../prisma/client"));
// Fetch all teacher payments
const getAllTeacherPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.teacherPayment.findMany({
        include: {
            teacher: true,
            paidBy: true,
            branch: true,
        },
    });
});
exports.getAllTeacherPayments = getAllTeacherPayments;
// Fetch a single teacher payment by ID
const getTeacherPaymentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.teacherPayment.findUnique({
        where: { id },
        include: {
            teacher: true,
            paidBy: true,
            branch: true,
        },
    });
});
exports.getTeacherPaymentById = getTeacherPaymentById;
// Create a new teacher payment
const createTeacherPayment = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { dueDate, amount, branchId, paidById, teacherId, currency, description, method, status, paymentDate, groupId, } = data;
    return yield client_1.default.teacherPayment.create({
        data: {
            dueDate: new Date(dueDate),
            amount,
            currency,
            description,
            method,
            status,
            branch: { connect: { id: Number(branchId) } },
            paidBy: { connect: { id: Number(paidById) } },
            teacher: { connect: { id: Number(teacherId) } },
            paymentDate: new Date(paymentDate),
            group: {
                connect: {
                    id: groupId,
                },
            },
        },
    });
});
exports.createTeacherPayment = createTeacherPayment;
// Update an existing teacher payment
const updateTeacherPayment = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.teacherPayment.update({
        where: { id },
        data,
    });
});
exports.updateTeacherPayment = updateTeacherPayment;
// Delete a teacher payment
const deleteTeacherPayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.teacherPayment.delete({
        where: { id },
    });
});
exports.deleteTeacherPayment = deleteTeacherPayment;
