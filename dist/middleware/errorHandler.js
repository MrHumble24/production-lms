"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const errorHandlerMiddleware = (err, req, res, next) => {
    console.error("Error caught in middleware:", err);
    // Default error response structure
    const response = {
        errorMsg: err.message || "An error occurred",
        details: null,
    };
    // Check if the error contains specific details (like the conflicting timetables)
    if (err.conflictingTimetables) {
        response.details = err.conflictingTimetables; // Attach the array of formatted conflict strings
    }
    // Respond with the appropriate status and details
    res.status(500).json(response);
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
