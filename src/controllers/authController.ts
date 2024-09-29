// controllers/authController.ts
import { NextFunction, Request, Response } from "express";
import {
  authenticateTeacher,
  authenticateStudent,
  authenticateAdmin,
  authenticateCompanyOwner,
} from "../services/authService";

/**
 * Controller to handle user login and generate a JWT token.
 */
export const teacherLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const { token, teacher } = await authenticateTeacher(email, password);
    const role = teacher.role;
    const branchId = teacher.branchId;
    res.json({ token, teacher, role, branchId });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle user login and generate a JWT token.
 */
export const studentLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  console.log({ email, password });

  try {
    const { token, student } = await authenticateStudent(email, password);
    const role = student.role;
    res.json({ token, student, role, branchId: student.branchId });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle user login and generate a JWT token.
 */
export const adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const { token, admin } = await authenticateAdmin(email, password);
    const role = admin.role;

    res.json({ token, admin, role });
  } catch (error) {
    next(error);
  }
};

export const companyOwnerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const { token, companyOwner } = await authenticateCompanyOwner(
      email,
      password
    );
    const role = companyOwner.role;
    const tenantId = companyOwner.tenantId;

    res.json({ token, companyOwner, role, tenantId });
  } catch (error) {
    next(error);
  }
};
