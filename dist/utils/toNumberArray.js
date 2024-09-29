"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNumberArray = toNumberArray;
/**
 * Utility function to check if input is an array of numbers or convert a string into an array of numbers.
 * Returns null if the input is null, an empty string, or undefined.
 *
 * @param input - The input value that could be an array, a comma-separated string, null, or undefined.
 * @returns An array of numbers or null.
 */
function toNumberArray(input) {
    if (input === null || input === undefined || input === "") {
        return null; // Return null if input is null, undefined, or an empty string
    }
    if (Array.isArray(input)) {
        return input.map((item) => Number(item)); // Convert any existing elements to numbers
    }
    if (typeof input === "string") {
        return input
            .split(",") // Split string by commas
            .map((item) => item.trim()) // Trim whitespace around each element
            .filter((item) => item !== "") // Filter out empty strings
            .map((item) => Number(item)); // Convert each element to a number
    }
    // If input is neither an array nor a string, return null
    return null;
}
