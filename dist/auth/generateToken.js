"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
/**
 * Generates a JWT for a given user.
 * @param userId The user's unique identifier.
 * @returns The generated JWT.
 */
const generateToken = (userId, others) => {
    const payload = Object.assign({ id: userId }, others);
    const options = { expiresIn: "48h" };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, options);
};
exports.generateToken = generateToken;
