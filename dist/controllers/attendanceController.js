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
exports.getAttendanceForGroup = exports.getAttendanceForStudentInGroup = exports.updateAttendance = exports.getAllAttendances = exports.createAttendanceRecord = void 0;
const groupBy_1 = require("../helpers/groupBy");
const attendanceService_1 = require("../services/attendanceService");
const createAttendanceRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.map((attendance) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, attendanceService_1.createAttendanceService)(attendance.studentId, attendance.groupId, attendance.timetableId, attendance.status, attendance.markedById, attendance.reason);
        }));
        res.status(201).json({ message: "Attendance record created" });
    }
    catch (error) {
        console.log(error, req.body);
        res.status(500).json(error);
    }
});
exports.createAttendanceRecord = createAttendanceRecord;
const getAllAttendances = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branchId = Number(req.headers["branch-id"]);
        const attendances = yield (0, attendanceService_1.getAttendancesService)(branchId);
        res.status(200).json(attendances);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAllAttendances = getAllAttendances;
const updateAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { attendanceId } = req.params;
    const { newStatus, changeReason, changedById, isExcused } = req.body;
    try {
        const updatedAttendance = yield (0, attendanceService_1.updateAttendanceStatusService)(Number(attendanceId), newStatus, changeReason, changedById, isExcused);
        res.status(200).json(updatedAttendance);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.updateAttendance = updateAttendance;
const getAttendanceForStudentInGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, groupId } = req.params;
    try {
        const attendance = yield (0, attendanceService_1.getAttendanceByStudentAndGroupService)(Number(studentId), Number(groupId));
        res.status(200).json(attendance);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAttendanceForStudentInGroup = getAttendanceForStudentInGroup;
const getAttendanceForGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId } = req.params;
    try {
        const data = yield (0, attendanceService_1.getAttendanceByGroupService)(Number(groupId));
        const attendance = (0, groupBy_1.groupAttendancesByDate)(data);
        res.status(200).json(attendance);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAttendanceForGroup = getAttendanceForGroup;
