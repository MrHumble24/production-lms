// routes/authRoutes.ts
import { Router } from "express";
import {
  teacherLogin,
  adminLogin,
  studentLogin,
  companyOwnerLogin,
} from "../controllers/authController";

const router = Router();

// Define route for user teacherLogin
router.post("/teacher/login", teacherLogin);
router.post("/companyOwner/login", companyOwnerLogin);
router.post("/student/login", studentLogin);
router.post("/admin/login", adminLogin);

export default router;
