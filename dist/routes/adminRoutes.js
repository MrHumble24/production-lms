"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const router = (0, express_1.Router)();
router.get("/", adminController_1.getAllAdmins); // GET /admins - Get all admins
router.get("/:id", adminController_1.getAdminById); // GET /admins/:id - Get admin by ID
router.post("/", adminController_1.createAdmin); // POST /admins - Create a new admin
router.put("/:id", adminController_1.updateAdmin); // PUT /admins/:id - Update admin by ID
router.delete("/:id", adminController_1.deleteAdmin); // DELETE /admins/:id - Delete admin by ID
exports.default = router;
