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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupProgressBreakdown = exports.getAttendanceStatusBreakdown = exports.getTotalAttendanceRecords = exports.getTotalRooms = exports.getTotalTimetables = exports.getTotalSubjects = exports.getTotalGroups = exports.getTotalStudents = exports.getTotalTeachers = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const getTotalTeachers = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.teacher.count({
        where: {
            branchId: Number(branchId),
        },
    });
});
exports.getTotalTeachers = getTotalTeachers;
const getTotalStudents = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.student.count({
        where: {
            branchId: Number(branchId),
        },
    });
});
exports.getTotalStudents = getTotalStudents;
const getTotalGroups = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.group.count({
        where: {
            branchId: Number(branchId),
        },
    });
});
exports.getTotalGroups = getTotalGroups;
const getTotalSubjects = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.subject.count({
        where: {
            branchId: Number(branchId),
        },
    });
});
exports.getTotalSubjects = getTotalSubjects;
const getTotalTimetables = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.timetable.count({
        where: {
            branchId: Number(branchId),
        },
    });
});
exports.getTotalTimetables = getTotalTimetables;
const getTotalRooms = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.room.count({
        where: {
            branchId: Number(branchId),
        },
    });
});
exports.getTotalRooms = getTotalRooms;
const getTotalAttendanceRecords = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.attendance.count({
        where: {
            branchId: Number(branchId),
        },
    });
});
exports.getTotalAttendanceRecords = getTotalAttendanceRecords;
const getAttendanceStatusBreakdown = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.attendance.groupBy({
        by: ["status"],
        where: {
            branchId: Number(branchId),
        },
        _count: {
            status: true,
        },
    });
});
exports.getAttendanceStatusBreakdown = getAttendanceStatusBreakdown;
const getGroupProgressBreakdown = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.group.groupBy({
        by: ["progress"],
        where: {
            branchId: Number(branchId),
        },
        _count: {
            progress: true,
        },
    });
});
exports.getGroupProgressBreakdown = getGroupProgressBreakdown;
