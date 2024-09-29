"use strict";
// services/authService.ts
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
exports.authenticateCompanyOwner = exports.authenticateAdmin = exports.authenticateStudent = exports.authenticateTeacher = void 0;
const generateToken_1 = require("../auth/generateToken");
const client_1 = __importDefault(require("../prisma/client"));
/**
 * Authenticates a user and generates a JWT token if the credentials are valid.
 * @param email The user's email.
 * @param password The user's password.
 * @returns A JWT token if authentication is successful, otherwise throws an error.
 */
const authenticateTeacher = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield client_1.default.teacher.findUnique({
        where: { email },
        include: {
            branch: {
                include: {
                    tenant: true,
                },
            },
        },
    });
    if (!teacher || teacher.password !== password) {
        throw new Error("Invalid email or password");
    }
    // Generate JWT token
    const token = (0, generateToken_1.generateToken)(String(teacher.id), {
        role: teacher.role,
    });
    return { token, teacher };
});
exports.authenticateTeacher = authenticateTeacher;
/**
 * Authenticates a user and generates a JWT token if the credentials are valid.
 * @param email The user's email.
 * @param password The user's password.
 * @returns A JWT token if authentication is successful, otherwise throws an error.
 */
const authenticateStudent = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const student = yield client_1.default.student.findUnique({
        where: { email: email.trimEnd().toLowerCase() },
        include: {
            branch: {
                include: {
                    tenant: true,
                },
            },
        },
    });
    console.log(student);
    if (!student || ((_a = student.password) === null || _a === void 0 ? void 0 : _a.toString()) !== password.toString()) {
        throw new Error("Invalid email or password");
    }
    // Generate JWT token
    const token = (0, generateToken_1.generateToken)(String(student.id), {
        role: student.role,
    });
    console.log({ token, student });
    return { token, student };
});
exports.authenticateStudent = authenticateStudent;
/**
 * Authenticates a user and generates a JWT token if the credentials are valid.
 * @param email The user's email.
 * @param password The user's password.
 * @returns A JWT token if authentication is successful, otherwise throws an error.
 */
const authenticateAdmin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Retrieve user by email
    const admin = yield client_1.default.admin.findUnique({
        where: { email },
        include: {
            branch: {
                include: {
                    tenant: true,
                },
            },
        },
    });
    if (!admin || admin.password !== password) {
        throw new Error("Invalid email or password");
    }
    // Generate JWT token
    const token = (0, generateToken_1.generateToken)(String(admin.id), {
        role: admin.role,
    });
    return { token, admin };
});
exports.authenticateAdmin = authenticateAdmin;
const authenticateCompanyOwner = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Retrieve user by email
    const companyOwner = yield client_1.default.companyOwner.findUnique({
        where: { email },
        include: {
            tenant: {
                include: {
                    branches: true,
                },
            },
        },
    });
    if (!companyOwner || companyOwner.password !== password) {
        throw new Error("Invalid email or password");
    }
    // Generate JWT token
    const token = (0, generateToken_1.generateToken)(String(companyOwner.id), {
        role: companyOwner.role,
    });
    return { token, companyOwner };
});
exports.authenticateCompanyOwner = authenticateCompanyOwner;
