import { Request, Response } from "express";
import {
  getTotalTeachers,
  getTotalStudents,
  getTotalGroups,
  getTotalSubjects,
  getTotalTimetables,
  getTotalRooms,
  getTotalAttendanceRecords,
  getAttendanceStatusBreakdown,
  getGroupProgressBreakdown,
} from "../services/statsService";

export const getStats = async (req: Request, res: Response) => {
  const branchId = req.params.branchId as string;
  try {
    const totalTeachers = await getTotalTeachers(branchId);
    const totalStudents = await getTotalStudents(branchId);
    const totalGroups = await getTotalGroups(branchId);
    const totalSubjects = await getTotalSubjects(branchId);
    const totalTimetables = await getTotalTimetables(branchId);
    const totalRooms = await getTotalRooms(branchId);
    const totalAttendanceRecords = await getTotalAttendanceRecords(branchId);
    const attendanceStatusBreakdown = await getAttendanceStatusBreakdown(
      branchId
    );
    const groupProgressBreakdown = await getGroupProgressBreakdown(branchId);

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
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
