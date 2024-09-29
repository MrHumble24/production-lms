"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
/**
 * Middleware to verify JWT token and authorize user by role.
 * @param roles Array of roles that are allowed to access the route.
 */
const authorizeRoles = (roles) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1]; // Simplified token extraction
        // Check if the token exists
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No token provided. Please log in to access this resource.",
            });
        }
        // Verify the JWT token
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return handleTokenError(err, res);
            }
            // Check if the user has the required role
            if (!roles.includes(user.role)) {
                return res.status(403).json({
                    message: "Access denied: You do not have sufficient permissions to access this resource.",
                });
            }
            // Attach the user to the request object and proceed
            req.user = user;
            next();
        });
    };
};
exports.authorizeRoles = authorizeRoles;
/**
 * Helper function to handle JWT token errors.
 * @param err JWT error object
 * @param res Express response object
 */
const handleTokenError = (err, res) => {
    let errorMessage = "Unauthorized access. Please try again.";
    switch (err.name) {
        case "TokenExpiredError":
            errorMessage = "Session expired. Please log in again.";
            break;
        case "JsonWebTokenError":
            errorMessage = "Invalid token. Please log in again.";
            break;
        case "NotBeforeError":
            errorMessage = "Token is not active yet. Please check the start time.";
            break;
    }
    return res.status(403).json({ message: errorMessage });
};
