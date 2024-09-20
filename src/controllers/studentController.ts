import { Student } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import deleteImageFromSupabase from "../helpers/removeImage";
import uploadImageToSupabase from "../helpers/uploadImage";
import prisma from "../prisma/client";
import {
  addStudentToGroup,
  createStudentService,
  deleteStudentService,
  getAllStudentsService,
  getStudentGroups,
  removeStudentFromGroup,
  updateStudentImageService,
  updateStudentService,
} from "../services/studentService";

// Get all students
export const getAllStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const students: Student[] = await getAllStudentsService();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

export const addStudentToGroupHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { studentId, groupId } = req.body;

  try {
    const result = await addStudentToGroup(studentId, groupId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
export const removeStudentFromGroupHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { studentId, groupId } = req.body;

  try {
    const result = await removeStudentFromGroup(studentId, groupId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Get a single student by ID
export const getStudentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findUnique({
      where: { id: Number(id), isDeleted: false },
      include: { groups: true },
    });
    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch student" });
  }
};

// Create a new student
export const createStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newStudent = await createStudentService(req.body, req.file);
    res.status(201).json(newStudent);
  } catch (error) {
    console.log({ error, body: req.body });
    res.status(500).json(error);
  }
};

// Update a student by ID
export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedStudent = await updateStudentService(Number(id), req.body);
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.log({ aaa: error });
    next(error);
  }
};

export const updateStudentImage = async (req: Request, res: Response) => {
  try {
    const student = await updateStudentImageService(
      Number(req.params.id),
      req.file
    );
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update student" });
  }
};

// Delete a student by ID
export const deleteStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await deleteStudentService(Number(id));
    res.status(204).json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
};

export const getStudentGroupsHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const groups = await getStudentGroups(Number(id));
    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json(error);
  }
};
