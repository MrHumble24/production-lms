"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateProratedFee = calculateProratedFee;
const date_1 = require("./date");
function calculateProratedFee(fullMonthlyFee, enrollmentDate, groupDays) {
    const totalDaysInMonth = new Date(enrollmentDate.getFullYear(), enrollmentDate.getMonth() + 1, 0).getDate();
    let remainingLessonDays = 0;
    for (let day = enrollmentDate.getDate(); day <= totalDaysInMonth; day++) {
        const currentDate = new Date(enrollmentDate.getFullYear(), enrollmentDate.getMonth(), day);
        // Skip Sundays
        if ((0, date_1.isSunday)(currentDate))
            continue;
        // Count only valid lesson days based on groupDays (ODD_DAY, EVEN_DAY, EVERY_DAY)
        if ((groupDays === date_1.Days.ODD_DAY && (0, date_1.isOddDay)(currentDate)) ||
            (groupDays === date_1.Days.EVEN_DAY && (0, date_1.isEvenDay)(currentDate)) ||
            groupDays === date_1.Days.EVERY_DAY) {
            remainingLessonDays++;
        }
    }
    // Prorated fee based on remaining lesson days
    const proratedFee = (fullMonthlyFee * remainingLessonDays) / totalDaysInMonth;
    return proratedFee;
}
