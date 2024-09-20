import { Request, Response } from "express";
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
  addTeacherToSubject,
  removeTeacherFromSubject,
} from "../services/subjectService";

// Create a new subject
export const createSubjectHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, branchId } = req.body;
  console.log({ name, description, branchId });
  try {
    const newSubject = await createSubject({ name, description, branchId });
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ error: "Failed to create subject" });
  }
};

// Get all subjects
export const getAllSubjectsHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const branchId = req.headers["branch-id"];
  try {
    const subjects = await getAllSubjects(Number(branchId));
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};

// Get a single subject by ID
export const getSubjectByIdHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const subject = await getSubjectById(Number(id));
    if (!subject) {
      res.status(404).json({ error: "Subject not found" });
      return;
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subject" });
  }
};

// Update a subject by ID
export const updateSubjectHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedSubject = await updateSubject(Number(id), {
      name,
      description,
    });
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: "Failed to update subject" });
  }
};

// Delete a subject by ID
export const deleteSubjectHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    await deleteSubject(Number(id));
    res.status(204).json({ message: "Subject deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subject" });
  }
};

// Add a teacher to a subject
export const addTeacherToSubjectHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { subjectId, teacherId } = req.body;

  try {
    const updatedSubject = await addTeacherToSubject(
      Number(subjectId),
      Number(teacherId)
    );
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: "Failed to add teacher to subject" });
  }
};

// Remove a teacher from a subject
export const removeTeacherFromSubjectHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { subjectId, teacherId } = req.body;

  try {
    const updatedSubject = await removeTeacherFromSubject(
      Number(subjectId),
      Number(teacherId)
    );
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove teacher from subject" });
  }
};
