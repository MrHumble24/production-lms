"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/authRoutes.ts
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Define route for user teacherLogin
router.post("/teacher/login", authController_1.teacherLogin);
router.post("/companyOwner/login", authController_1.companyOwnerLogin);
router.post("/student/login", authController_1.studentLogin);
router.post("/admin/login", authController_1.adminLogin);
exports.default = router;
