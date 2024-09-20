import { Request, Response, NextFunction } from "express";

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error caught in middleware:", err);

  // Default error response structure
  const response = {
    errorMsg: err.message || "An error occurred",
    details: null as string[] | string | null,
  };

  // Check if the error contains specific details (like the conflicting timetables)
  if ((err as any).conflictingTimetables) {
    response.details = (err as any).conflictingTimetables; // Attach the array of formatted conflict strings
  }

  // Respond with the appropriate status and details
  res.status(500).json(response);
};
