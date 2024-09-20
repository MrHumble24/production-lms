import { Router } from "express";
import {
	getAllAdmins,
	getAdminById,
	createAdmin,
	updateAdmin,
	deleteAdmin,
} from "../controllers/adminController";

const router = Router();

router.get("/", getAllAdmins); // GET /admins - Get all admins
router.get("/:id", getAdminById); // GET /admins/:id - Get admin by ID
router.post("/", createAdmin); // POST /admins - Create a new admin
router.put("/:id", updateAdmin); // PUT /admins/:id - Update admin by ID
router.delete("/:id", deleteAdmin); // DELETE /admins/:id - Delete admin by ID

export default router;
