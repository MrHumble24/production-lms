// packages imports
import cors from "cors";
import express from "express";
import morgan from "morgan";

// routes imports
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";
import authRoutes from "./routes/authRoutes";
import companyOwnerRoutes from "./routes/companyOwnerRoutes";
import groupMaterialRoutes from "./routes/groupMaterialRoutes";
import groupNotificationRoutes from "./routes/groupNotificationRoutes";
import groupRoutes from "./routes/groupRoutes";
import leadRoutes from "./routes/leadRoutes";
import roomRoutes from "./routes/roomRoutes";
import statsRoutes from "./routes/statsRoutes";
import studentPaymentRoutes from "./routes/studentPaymentRoutes";
import studentRoutes from "./routes/studentRoutes";
import subjectRoutes from "./routes/subjectRoutes";
import taskRoutes from "./routes/taskRoutes";
import teacherPaymentRoutes from "./routes/teacherPaymentRoutes";
import teacherRoutes from "./routes/teacherRoutes";
import tenantRoutes from "./routes/tenantRoutes";
import timetableRoutes from "./routes/timetableRoutes";
import paymentRoutes from "./routes/paymentsRoutes";

// middleware imports
import { errorHandlerMiddleware } from "./middleware/errorHandler";
import branchRoutes from "./routes/branchRoutes";

const app = express();
app.use(cors({}));
app.use(morgan("short"));

app.use(express.json());
dotenv.config();

app.use("/api/auth", authRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/attendances", attendanceRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/companyOwners", companyOwnerRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/groupNotifications", groupNotificationRoutes);
app.use("/api/groupMaterials", groupMaterialRoutes);
app.use("/api/teacherPayments", teacherPaymentRoutes);
app.use("/api/studentPayments", studentPaymentRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/payments", paymentRoutes);
app.use(errorHandlerMiddleware);
// processMonthlyPayments();
console.log(new Date().toLocaleString());
export default app;
