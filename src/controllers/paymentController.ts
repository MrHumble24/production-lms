import { NextFunction, Request, Response } from "express";
import {
  createPrepayment,
  getDebtors,
  getStudentPaymentHistory,
} from "../services/studentPaymentService";
import { processMonthlyPayments } from "../jobs/generateMonthlyPayments";

// Handle student prepayments
export const createPrepaymentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { studentId, amount } = req.body;
  try {
    const result = await createPrepayment(Number(studentId), Number(amount));
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Get students with overdue payments (debtors)
export const getDebtorsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const debtors = await getDebtors();
    res.status(200).json(debtors);
  } catch (error) {
    next(error);
  }
};

// Get student payment history
export const getStudentPaymentHistoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { studentId } = req.params;
  try {
    const history = await getStudentPaymentHistory(Number(studentId));
    res.status(200).json(history);
  } catch (error) {
    next(error);
  }
};

// Process monthly payments (manual trigger)
export const processMonthlyPaymentsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const branchId = req.body.branchId;
    await processMonthlyPayments(branchId);
    res
      .status(200)
      .json({ message: "Monthly payments processed successfully." });
  } catch (error) {
    next(error);
  }
};
