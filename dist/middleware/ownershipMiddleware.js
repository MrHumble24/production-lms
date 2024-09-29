"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureOwnership = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
/**
 * Middleware to ensure that the logged-in user can only access their own data.
 * @param role Role to check (e.g., "STUDENT")
 * @returns Middleware function for ensuring ownership.
 */
const ensureOwnership = (role) => {
    return (req, res, next) => {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No token provided.",
            });
        }
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    message: "Unauthorized access. Invalid token.",
                });
            }
            const resourceId = req.params.id; // The ID of the resource (e.g., the student profile)
            // Ensure the user is trying to access their own data, or they are an admin
            if (user.role === role &&
                user.id !== resourceId &&
                user.role !== "COMPANY_OWNER") {
                return res.status(403).json({
                    message: "You do not have ownership of this resource.",
                });
            }
            // Attach user to request and continue
            req.user = user;
            next();
        });
    };
};
exports.ensureOwnership = ensureOwnership;
