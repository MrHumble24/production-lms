import { NextFunction, Request, Response } from "express";
import * as submissionService from "../services/submissionService";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// Create a new submission

export const createSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId, taskId, content } = req.body;

    const submission = await submissionService.createSubmission({
      studentId: parseInt(studentId, 10),
      taskId: parseInt(taskId, 10),
      content,
      req,
    });

    res.status(201).json(submission);
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Check for unique constraint violation (P2002)
      if (error.code === "P2002") {
        return res.status(400).json({
          errorMsg:
            "A submission for this task already exists for the student.",
          details: error.meta, // You can include additional details from Prisma if needed
        });
      }
    }

    // Fallback for other errors
    res.status(500).json({
      errorMsg: "An unexpected error occurred. Please try again.",
      details: error.message, // You can log or return more specific details if needed
    });
  }
};

// Get submission for a task by a specific student
export const getSubmissionByTaskAndStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const { taskId, studentId } = req.params;
    const submission = await submissionService.getSubmissionByTaskAndStudent(
      parseInt(taskId, 10),
      parseInt(studentId, 10)
    );

    // if (!submission) {
    //   return res.status(404).json({ message: "Submission not found" });
    // }

    res.json(submission);
  } catch (error) {
    console.error("Error fetching submission:", error);
    res.status(500).json({ message: "Failed to get submission" });
  }
};

// Update submission
export const updateSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { submissionId } = req.params;
    const { content, grade, feedback } = req.body;

    // Ensure that the grade is parsed as a number, and content is safely handled
    const updatedSubmission = await submissionService.updateSubmission(
      Number(submissionId),
      {
        content, // Only include content if it's provided
        feedback: feedback || null,
        grade: grade !== undefined ? Number(grade) : undefined, // Ensure the grade is handled properly
      }
    );

    res.json(updatedSubmission);
  } catch (error) {
    console.error("Error updating submission:", error);
    next(error);
    // res.status(500).json({ message: "Failed to update submission" });
  }
};

// Delete submission
export const deleteSubmission = async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params;
    await submissionService.deleteSubmission(parseInt(submissionId, 10));

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting submission:", error);
    res.status(500).json({ message: "Failed to delete submission" });
  }
};

// Get all submissions for a specific task
export const getSubmissionsByTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const submissions = await submissionService.getSubmissionsByTask(
      parseInt(taskId, 10)
    );

    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "Failed to fetch submissions" });
  }
};
