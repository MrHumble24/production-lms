import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client";
import { Teacher } from "@prisma/client";
import {
  deleteTeacherService,
  updateTeacherImageService,
} from "../services/teacherService";
import uploadImageToSupabase from "../helpers/uploadImage";
import deleteImageFromSupabase from "../helpers/removeImage";
import { toNumberArray } from "../utils/toNumberArray";

// Get all teachers
export const getAllTeachers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const teachers: Teacher[] = await prisma.teacher.findMany({
      include: {
        subjects: true,
        timetables: true,
        groups: {
          include: {
            students: true,
          },
        },
      },
      orderBy: { firstName: "asc" },
      where: { isDeleted: false },
    });
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
};

// Get a single teacher by ID
export const getTeacherById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id: Number(id) },
      include: {
        groups: {
          include: {
            students: true,
          },
        },
        subjects: true,
        timetables: true,
        branch: {
          include: {
            tenant: true,
          },
        },
      },
    });
    if (!teacher) {
      res.status(404).json({ error: "Teacher not found" });
      return;
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teacher" });
  }
};

// Create a new teacher
export const createTeacher = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    firstName,
    lastName,
    email,
    phone,
    subjectIds,
    branchId,
    bio,
    title,
    officeHours,
    telegramUsername,
    password,
    gender,
  } = req.body;
  let avatarUrl = await uploadImageToSupabase(req.file, "avatars");

  try {
    const newTeacher = await prisma.teacher.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        avatar: avatarUrl,
        bio,
        title,
        officeHours,
        telegramUsername,
        password,
        gender,
        branchId: Number(branchId),
        subjects: {
          connect: toNumberArray(subjectIds)?.map((id: number) => ({
            id: Number(id),
          })),
        },
      },
    });
    res.status(201).json(newTeacher);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create teacher" });
  }
};

export const updateTeacherImage = async (req: Request, res: Response) => {
  try {
    const teacher = await updateTeacherImageService(
      Number(req.params.id),
      req.file
    );
    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update tenant" });
  }
};

// Update a teacher by ID
export const updateTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    phone,
    subjectIds,
    officeHours,
    bio,
    title,
    avatar,
    password,
    branchId,
    gender,
    telegramUsername,
  } = req.body;
  try {
    const teacherPrevData = await prisma.teacher.findUnique({
      where: { id: Number(id) },
      include: { subjects: true },
    });
    const teacherSubjectIds = teacherPrevData?.subjects?.map(
      (subject) => subject.id
    );

    const removedSubjectIds = teacherSubjectIds?.filter(
      (subjectId) => !subjectIds?.includes(subjectId)
    );

    console.log(req.body);
    const updatedTeacher = await prisma.teacher.update({
      where: { id: Number(id) },
      data: {
        firstName,
        lastName,
        email,
        phone,
        telegramUsername,
        subjects: {
          connect: toNumberArray(subjectIds)?.map((id: number) => ({ id })),
          disconnect: toNumberArray(removedSubjectIds)?.map((id: number) => ({
            id,
          })),
        },
        officeHours,
        bio,
        title,
        avatar,
        password,
        branchId: Number(branchId),
        gender,
      },
    });
    res.status(200).json(updatedTeacher);
  } catch (error) {
    console.log(error);
    next(error);
    // res.status(500).json({ message: "Failed to update teacher", error });
  }
};

// Delete a teacher by ID
export const deleteTeacher = async (req: Request, res: Response) => {
  const teacherId = parseInt(req.params.id, 10);
  const teacherPrevData = await prisma.teacher.findUnique({
    where: { id: Number(teacherId) },
    select: { avatar: true },
  });

  await deleteImageFromSupabase(teacherPrevData?.avatar);

  try {
    const result = await deleteTeacherService(teacherId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
