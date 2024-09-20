import prisma from "../prisma/client";
import { AttendanceStatus } from "@prisma/client";

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
export const createAttendanceService = async (
  studentId: number,
  groupId: number,
  timetableId: number,
  status: AttendanceStatus,
  markedById?: number,
  reason?: string
) => {
  try {
    return await prisma.attendance.create({
      data: {
        studentId,
        groupId,
        timetableId,
        status,
        markedById,
        reason,
      },
    });
  } catch (error) {
    return error;
  }
};

/**
 * Retrieves all attendance records for a specific branch.
 * @param branchId - The ID of the branch for which to retrieve attendance records.
 * @returns A promise that resolves to an array of attendance records, including related student and timetable data.
 */
export const getAttendancesService = async (branchId: number) => {
  return await prisma.attendance.findMany({
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
};

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
export const updateAttendanceStatusService = async (
  attendanceId: number,
  newStatus: AttendanceStatus,
  changeReason?: string,
  changedById?: number,
  isExcused = false
) => {
  const oldAttendance = await prisma.attendance.findUnique({
    where: { id: attendanceId },
  });

  if (!oldAttendance) throw new Error("Attendance record not found");

  const updatedAttendance = await prisma.attendance.update({
    where: { id: attendanceId },
    data: {
      status: newStatus,
      isExcused,
    },
  });

  // Log the change in AttendanceLog

  return updatedAttendance;
};

/**
 * Retrieves attendance records for a specific student within a specific group.
 * @param studentId - The ID of the student.
 * @param groupId - The ID of the group.
 * @returns A promise that resolves to an array of attendance records for the specified student and group, including related timetable and group data.
 */
export const getAttendanceByStudentAndGroupService = async (
  studentId: number,
  groupId: number
) => {
  return await prisma.attendance.findMany({
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
};

/**
 * Retrieves attendance records for a specific group.
 * @param groupId - The ID of the group for which to retrieve attendance records.
 * @returns A promise that resolves to an array of attendance records for the specified group, including related student and timetable data.
 */
export const getAttendanceByGroupService = async (groupId: number) => {
  return await prisma.attendance.findMany({
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
};
