import { Request, Response } from "express";

import { groupAttendancesByDate } from "../helpers/groupBy";
import {
  createAttendanceService,
  getAttendanceByGroupService,
  getAttendanceByStudentAndGroupService,
  getAttendancesService,
  updateAttendanceStatusService,
} from "../services/attendanceService";

export const createAttendanceRecord = async (req: Request, res: Response) => {
  try {
    req.body.map(async (attendance: any) => {
      await createAttendanceService(
        attendance.studentId,
        attendance.groupId,
        attendance.timetableId,
        attendance.status,
        attendance.markedById,
        attendance.reason
      );
    });
    res.status(201).json({ message: "Attendance record created" });
  } catch (error) {
    console.log(error, req.body);
    res.status(500).json(error);
  }
};

export const getAllAttendances = async (req: Request, res: Response) => {
  try {
    const branchId = Number(req.headers["branch-id"]);
    const attendances = await getAttendancesService(branchId);
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateAttendance = async (req: Request, res: Response) => {
  const { attendanceId } = req.params;
  const { newStatus, changeReason, changedById, isExcused } = req.body;
  try {
    const updatedAttendance = await updateAttendanceStatusService(
      Number(attendanceId),
      newStatus,
      changeReason,
      changedById,
      isExcused
    );
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAttendanceForStudentInGroup = async (
  req: Request,
  res: Response
) => {
  const { studentId, groupId } = req.params;
  try {
    const attendance = await getAttendanceByStudentAndGroupService(
      Number(studentId),
      Number(groupId)
    );
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAttendanceForGroup = async (req: Request, res: Response) => {
  const { groupId } = req.params;
  try {
    const data = await getAttendanceByGroupService(Number(groupId));
    const attendance = groupAttendancesByDate(data);
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json(error);
  }
};
