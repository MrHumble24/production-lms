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
exports.getStats = void 0;
const statsService_1 = require("../services/statsService");
const getStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const branchId = req.params.branchId;
    try {
        const totalTeachers = yield (0, statsService_1.getTotalTeachers)(branchId);
        const totalStudents = yield (0, statsService_1.getTotalStudents)(branchId);
        const totalGroups = yield (0, statsService_1.getTotalGroups)(branchId);
        const totalSubjects = yield (0, statsService_1.getTotalSubjects)(branchId);
        const totalTimetables = yield (0, statsService_1.getTotalTimetables)(branchId);
        const totalRooms = yield (0, statsService_1.getTotalRooms)(branchId);
        const totalAttendanceRecords = yield (0, statsService_1.getTotalAttendanceRecords)(branchId);
        const attendanceStatusBreakdown = yield (0, statsService_1.getAttendanceStatusBreakdown)(branchId);
        const groupProgressBreakdown = yield (0, statsService_1.getGroupProgressBreakdown)(branchId);
        res.status(200).json({
            totalTeachers,
            totalStudents,
            totalGroups,
            totalSubjects,
            totalTimetables,
            totalRooms,
            totalAttendanceRecords,
            attendanceStatusBreakdown: attendanceStatusBreakdown.length
                ? attendanceStatusBreakdown
                : "No attendance records",
            groupProgressBreakdown,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});
exports.getStats = getStats;
