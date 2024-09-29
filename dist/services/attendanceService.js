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
exports.getAttendanceByGroupService = exports.getAttendanceByStudentAndGroupService = exports.updateAttendanceStatusService = exports.getAttendancesService = exports.createAttendanceService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
/**
 * Creates a new attendance record in the database.
 * @param studentId - The ID of the student for whom attendance is being recorded.
 * @param groupId - The ID of the group associated with the attendance record.
 * @param timetableId - The ID of the timetable entry associated with the attendance.
 * @param status - The attendance status (e.g., PRESENT, ABSENT, LATE).
 * @param markedById - (Optional) The ID of the user who marked the attendance.
 * @param reason - (Optional) The reason for the attendance status, if applicable.
 * @returns A promise that resolves to the created attendance record.
 */
const createAttendanceService = (studentId, groupId, timetableId, status, markedById, reason) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield client_1.default.attendance.create({
            data: {
                studentId,
                groupId,
                timetableId,
                status,
                markedById,
                reason,
            },
        });
    }
    catch (error) {
        return error;
    }
});
exports.createAttendanceService = createAttendanceService;
/**
 * Retrieves all attendance records for a specific branch.
 * @param branchId - The ID of the branch for which to retrieve attendance records.
 * @returns A promise that resolves to an array of attendance records, including related student and timetable data.
 */
const getAttendancesService = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.attendance.findMany({
        include: {
            student: true,
            timetable: { include: { group: true, room: true } },
        },
        where: {
            branchId: branchId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
});
exports.getAttendancesService = getAttendancesService;
/**
 * Updates the status of an existing attendance record and logs the change.
 * @param attendanceId - The ID of the attendance record to update.
 * @param newStatus - The new attendance status (e.g., PRESENT, ABSENT, LATE).
 * @param changeReason - (Optional) The reason for changing the attendance status.
 * @param changedById - (Optional) The ID of the user who changed the attendance status.
 * @param isExcused - (Optional) Whether the change is excused. Defaults to false.
 * @returns A promise that resolves to the updated attendance record.
 * @throws An error if the attendance record is not found.
 */
const updateAttendanceStatusService = (attendanceId_1, newStatus_1, changeReason_1, changedById_1, ...args_1) => __awaiter(void 0, [attendanceId_1, newStatus_1, changeReason_1, changedById_1, ...args_1], void 0, function* (attendanceId, newStatus, changeReason, changedById, isExcused = false) {
    const oldAttendance = yield client_1.default.attendance.findUnique({
        where: { id: attendanceId },
    });
    if (!oldAttendance)
        throw new Error("Attendance record not found");
    const updatedAttendance = yield client_1.default.attendance.update({
        where: { id: attendanceId },
        data: {
            status: newStatus,
            isExcused,
        },
    });
    // Log the change in AttendanceLog
    return updatedAttendance;
});
exports.updateAttendanceStatusService = updateAttendanceStatusService;
/**
 * Retrieves attendance records for a specific student within a specific group.
 * @param studentId - The ID of the student.
 * @param groupId - The ID of the group.
 * @returns A promise that resolves to an array of attendance records for the specified student and group, including related timetable and group data.
 */
const getAttendanceByStudentAndGroupService = (studentId, groupId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.attendance.findMany({
        where: { studentId, groupId },
        include: {
            timetable: {
                include: {
                    group: true,
                    room: true,
                },
            },
            group: true,
        },
    });
});
exports.getAttendanceByStudentAndGroupService = getAttendanceByStudentAndGroupService;
/**
 * Retrieves attendance records for a specific group.
 * @param groupId - The ID of the group for which to retrieve attendance records.
 * @returns A promise that resolves to an array of attendance records for the specified group, including related student and timetable data.
 */
const getAttendanceByGroupService = (groupId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.attendance.findMany({
        where: { groupId },
        include: {
            student: true,
            timetable: {
                include: {
                    group: true,
                    room: true,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
});
exports.getAttendanceByGroupService = getAttendanceByGroupService;
