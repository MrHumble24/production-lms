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
exports.processMonthlyPayments = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const client_1 = __importDefault(require("../prisma/client"));
const studentPaymentService_1 = require("../services/studentPaymentService");
// Run this on the 1st day of every month
// Extracted function to process payments
const processMonthlyPayments = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (branchId = null) {
    const students = branchId
        ? yield client_1.default.student.findMany({
            where: { isDeleted: false, branchId: branchId },
            include: { groups: true },
        })
        : yield client_1.default.student.findMany({
            where: { isDeleted: false },
            include: { groups: true },
        });
    for (const student of students) {
        for (const group of student.groups) {
            const monthlyFee = group.price || 0;
            const dueDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0); // End of the month
            yield (0, studentPaymentService_1.createMonthlyPayment)(student.id, group.id, monthlyFee, dueDate, branchId);
        }
    }
    console.log("Monthly payments have been processed.");
});
exports.processMonthlyPayments = processMonthlyPayments;
// Schedule the cron job to run on the 1st of every month
node_cron_1.default.schedule("0 0 1 * *", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.processMonthlyPayments)();
}), {
    timezone: "Asia/Tashkent",
});
