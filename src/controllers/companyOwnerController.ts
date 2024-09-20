import { CompanyOwner } from "@prisma/client";
import { Request, Response } from "express";
import {
  createCompanyOwnerService,
  deleteCompanyOwnerService,
  getAllCompanyOwnerService,
  getCompanyOwnerByIdService,
  updateCompanyOwnerImageService,
  updateCompanyOwnerService,
} from "../services/companyOwnerService";

// Get all admins
export const getAllCompanyOwners = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const companyOwners: CompanyOwner[] = await getAllCompanyOwnerService();
    console.log(companyOwners);
    res.status(200).json(companyOwners);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch companyOwners" });
  }
};

// Get a single CompanyOwner by ID
export const getCompanyOwnerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const companyOwner = await getCompanyOwnerByIdService(Number(id));
    res.status(200).json(companyOwner);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch CompanyOwner" });
  }
};

export const createCompanyOwner = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newCompanyOwner = await createCompanyOwnerService(req.body, req.file);
    res.status(201).json(newCompanyOwner);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Company Owner" });
  }
};

export const updateCompanyOwner = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedCompanyOwner = await updateCompanyOwnerService(req.body, id);
    if (!updatedCompanyOwner) {
      res.status(404).json({ error: "CompanyOwner not found" });
    }
    res.status(200).json(updatedCompanyOwner);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Company Owner" });
  }
};

export const updateCompanyOwnerImage = async (req: Request, res: Response) => {
  try {
    const companyOwner = await updateCompanyOwnerImageService(
      Number(req.params.id),
      req.file
    );
    res.status(200).json(companyOwner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update tenant" });
  }
};

// Delete an Company Owner by ID
export const deleteCompanyOwner = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedCompanyOwner = deleteCompanyOwnerService(Number(id));
    res
      .status(204)
      .json({ message: "CompanyOwner deleted", data: deletedCompanyOwner });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Company Owner" });
  }
};
