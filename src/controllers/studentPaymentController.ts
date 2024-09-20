// studentPayment.controller.ts
import { Request, Response } from "express";
import {
  createStudentPayment,
  updateStudentPayment,
  deleteStudentPayment,
  getStudentPaymentById,
  getAllStudentPayments,
  getStudentPayments,
} from "../services/studentPaymentService";

export const createStudentPaymentController = async (
  req: Request,
  res: Response
) => {
  try {
    const newPayment = await createStudentPayment(req.body);
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: "Error creating payment", error });
  }
};

export const updateStudentPaymentController = async (
  req: Request,
  res: Response
) => {
  try {
    const updatedPayment = await updateStudentPayment(
      Number(req.params.id),
      req.body
    );
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: "Error updating payment", error });
  }
};

export const deleteStudentPaymentController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteStudentPayment(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: "Error deleting payment", error });
  }
};

export const getStudentPaymentByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    console.log({ par: req.params });
    const payment = await getStudentPaymentById(Number(req.params.id));
    console.log({ payment });
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error fetching payment", error });
  }
};

export const getAllStudentPaymentsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const payments = await getAllStudentPayments();
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ message: "Error fetching payments", error });
  }
};
export const getStudentPaymentsController = async (
  _req: Request,
  res: Response
) => {
  const studentID = _req.params.studentID;
  try {
    console.log({ studentID });
    const payments = await getStudentPayments(studentID);
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ message: "Error fetching payments", error });
  }
};
