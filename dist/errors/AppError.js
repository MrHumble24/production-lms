"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.AppError = void 0;
// errors/AppError.ts
class AppError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
exports.AppError = AppError;
// errors/ValidationError.ts
class ValidationError extends AppError {
    constructor(message) {
        super(message, 400); // HTTP 400 Bad Request
    }
}
exports.ValidationError = ValidationError;
