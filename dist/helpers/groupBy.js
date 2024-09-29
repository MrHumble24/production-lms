"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupAttendancesByDate = void 0;
const groupAttendancesByDate = (attendances) => {
    return attendances.reduce((groups, attendance) => {
        const date = attendance.createdAt.toISOString().split("T")[0]; // Extract the date part
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(attendance);
        return groups;
    }, {});
};
exports.groupAttendancesByDate = groupAttendancesByDate;
