import { Request, Response } from "express";
import prisma from "../prisma/client";
import { Admin } from "@prisma/client";
import {
  createAdminService,
  deleteAdminService,
  getAdminByIdService,
  getAllAdminService,
  updateAdminService,
} from "../services/adminService";

// Get all admins
export const getAllAdmins = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const admins: Admin[] = await getAllAdminService();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admins" });
  }
};

// Get a single admin by ID
export const getAdminById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const admin = await getAdminByIdService(Number(id));
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admin" });
  }
};

export const createAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newAdmin = await createAdminService(req.body);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: "Failed to create admin" });
  }
};

export const updateAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedAdmin = await updateAdminService(req.body, id);
    if (!updatedAdmin) {
      res.status(404).json({ error: "Admin not found" });
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: "Failed to update admin" });
  }
};

// Delete an admin by ID
export const deleteAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedAdmin = deleteAdminService(Number(id));
    res.status(204).json({ message: "Admin deleted", data: deletedAdmin });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete admin" });
  }
};
