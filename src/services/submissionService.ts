import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import uploadImageToSupabase from "../helpers/uploadImage";

const prisma = new PrismaClient();

interface CreateSubmissionData {
  studentId: number;
  taskId: number;
  content?: string;
  req: Request;
  grade?: number;
}

// Create a new submission
export const createSubmission = async (data: CreateSubmissionData) => {
  let file;
  if (data.req.file) {
    file = await uploadImageToSupabase(data.req.file, "submissions");
  }
  return prisma.submission.create({
    data: {
      studentId: Number(data.studentId),
      taskId: Number(data.taskId),
      content: data.content || null,
      fileUrl: file || null,
    },
  });
};

// Get submission by studentId and taskId
export const getSubmissionByTaskAndStudent = async (
  taskId: number,
  studentId: number
) => {
  return prisma.submission.findUnique({
    where: {
      taskId_studentId: {
        taskId,
        studentId,
      },
    },
    include: {
      student: true,
      task: true,
    },
  });
};

// Update submission
export const updateSubmission = async (
  submissionId: number,
  data: { content?: string; grade?: number; feedback?: string }
) => {
  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    include: {
      student: true,
      task: true,
    },
  });
  return prisma.submission.update({
    where: { id: submissionId },
    data: {
      ...data,
      content: data.content, // Only update content if it's provided
      grade: data.grade, // Only update grade if it's provided
      feedback: data?.feedback,
    },
  });
};

// Delete submission
export const deleteSubmission = async (submissionId: number) => {
  return prisma.submission.delete({
    where: { id: Number(submissionId) },
  });
};

// Get all submissions for a specific task
export const getSubmissionsByTask = async (taskId: number) => {
  return prisma.submission.findMany({
    where: { taskId: Number(taskId) },
    include: {
      student: true,
      task: true,
    },
  });
};
