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
exports.companyOwnerLogin = exports.adminLogin = exports.studentLogin = exports.teacherLogin = void 0;
const authService_1 = require("../services/authService");
/**
 * Controller to handle user login and generate a JWT token.
 */
const teacherLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const { token, teacher } = yield (0, authService_1.authenticateTeacher)(email, password);
        const role = teacher.role;
        const branchId = teacher.branchId;
        res.json({ token, teacher, role, branchId });
    }
    catch (error) {
        next(error);
    }
});
exports.teacherLogin = teacherLogin;
/**
 * Controller to handle user login and generate a JWT token.
 */
const studentLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log({ email, password });
    try {
        const { token, student } = yield (0, authService_1.authenticateStudent)(email, password);
        const role = student.role;
        res.json({ token, student, role, branchId: student.branchId });
    }
    catch (error) {
        next(error);
    }
});
exports.studentLogin = studentLogin;
/**
 * Controller to handle user login and generate a JWT token.
 */
const adminLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { token, admin } = yield (0, authService_1.authenticateAdmin)(email, password);
        const role = admin.role;
        res.json({ token, admin, role });
    }
    catch (error) {
        next(error);
    }
});
exports.adminLogin = adminLogin;
const companyOwnerLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { token, companyOwner } = yield (0, authService_1.authenticateCompanyOwner)(email, password);
        const role = companyOwner.role;
        const tenantId = companyOwner.tenantId;
        res.json({ token, companyOwner, role, tenantId });
    }
    catch (error) {
        next(error);
    }
});
exports.companyOwnerLogin = companyOwnerLogin;
