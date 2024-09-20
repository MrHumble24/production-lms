import { Request, Response } from "express";
import prisma from "../prisma/client";
import { Timetable } from "@prisma/client";
import { createGroupTimetable } from "../services/timetableService";

// Get all timetables
export const getAllTimetables = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const timetables: Timetable[] = await prisma.timetable.findMany({
      include: {
        group: {
          include: {
            students: true,
            subject: true,
          },
        },
        room: true,
        teacher: true,
      },
      orderBy: {
        startTime: "asc",
      },
      where: { isDeleted: false },
    });
    res.status(200).json(timetables);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch timetables" });
  }
};

// Get a single timetable by ID
export const getTimetableById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const timetable = await prisma.timetable.findUnique({
      where: { id: Number(id) },
      include: { group: true, room: true, teacher: true },
    });
    if (!timetable) {
      res.status(404).json({ error: "Timetable not found" });
      return;
    }
    res.status(200).json(timetable);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch timetable" });
  }
};

// Create a new timetable
export const createTimetable = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { day, startTime, endTime, groupId, roomId, teacherId, branchId } =
    req.body;

  console.log(req.body);
  try {
    const newTimetable = await prisma.timetable.create({
      data: {
        day,
        startTime,
        endTime,
        group: { connect: { id: groupId } },
        room: { connect: { id: roomId } },
        teacher: { connect: { id: teacherId } },
        branch: { connect: { id: Number(branchId) } },
      },
    });
    res.status(201).json(newTimetable);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create timetable" });
  }
};

// Update a timetable by ID
export const updateTimetable = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    day,
    startTime,
    endTime,
    groupId,
    roomId,
    teacherId,
    isChangingTeacher,
  } = req.body;
  try {
    if (isChangingTeacher) {
      const updatedTimetable = await prisma.timetable.update({
        where: { id: Number(id) },
        data: {
          teacher: { connect: { id: teacherId } },
        },
      });
      res.status(200).json(updatedTimetable);
    } else {
      const updatedTimetable = await prisma.timetable.update({
        where: { id: Number(id) },
        data: {
          day,
          startTime,
          endTime,
          group: { connect: { id: groupId } },
          room: { connect: { id: roomId } },
          teacher: { connect: { id: teacherId } },
        },
      });
      res.status(200).json(updatedTimetable);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update timetable" });
  }
};

// Delete a timetable by ID
export const deleteTimetable = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.timetable.delete({
      where: { id: Number(id) },
    });
    res.status(204).json({ message: "Timetable deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete timetable" });
  }
};
export const createGroupTimetableHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { groupId, timetableData } = req.body;

  try {
    const result = await createGroupTimetable(groupId, timetableData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
