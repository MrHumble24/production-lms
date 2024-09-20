import { NextFunction, Request, Response } from "express";
import moment from "moment";
import {
  confirmAndPayTeacher,
  getTeacherPaymentDetail,
  getTeacherPaymentHistory,
  getTeacherPaymentSuggestions,
  notifyAccountantsOfPendingPayments,
} from "../services/teacherPaymentService";

// Get payment suggestions for a teacher
export const getTeacherPaymentSuggestionsController = async (
  req: Request,
  res: Response
) => {
  const { teacherId } = req.params;
  try {
    const suggestions = await getTeacherPaymentSuggestions(Number(teacherId));
    res.status(200).json(suggestions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch teacher payment suggestions" });
  }
};

// Get teacher's payment history
export const getTeacherPaymentHistoryController = async (
  req: Request,
  res: Response
) => {
  const { teacherId } = req.params;
  try {
    const history = await getTeacherPaymentHistory(Number(teacherId));
    const data = history.map((payment) => {
      return {
        ...payment,
        createdAt: moment(payment.createdAt).format("ll"),
        dueDate: moment(payment.dueDate).format("ll"),
        paymentDate: moment(payment.paymentDate).format("ll"),
        updatedAt: moment(payment.updatedAt).format("ll"),
      };
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teacher payment history" });
  }
};

// Notify accountants about pending payments
export const notifyAccountantsController = async (
  req: Request,
  res: Response
) => {
  const { teacherId } = req.params;
  try {
    await notifyAccountantsOfPendingPayments(Number(teacherId));
    res
      .status(200)
      .json({ message: `Accountants notified for teacher ID ${teacherId}` });
  } catch (error) {
    res.status(500).json({ error: "Failed to notify accountants" });
  }
};

// Get payment detail by paymentId
export const getTeacherPaymentDetailController = async (
  req: Request,
  res: Response
) => {
  const { paymentId } = req.params;
  try {
    const detail = await getTeacherPaymentDetail(Number(paymentId));
    res.status(200).json(detail);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch payment detail" });
  }
};

// Controller for confirming and paying the teacher

export const confirmTeacherPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { teacherId, paymentData } = req.body;

  // Basic validation
  if (!teacherId || !paymentData || typeof paymentData !== "object") {
    return res.status(400).json({
      success: false,
      message: "Invalid request: Missing or invalid teacherId or paymentData.",
    });
  }

  try {
    // Call the service function to process a single payment
    const result = await confirmAndPayTeacher(teacherId, paymentData);

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Teacher payment confirmed successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Error confirming teacher payment:", error);
    next(error); // Pass the error to the next middleware (error handler)
  }
};
