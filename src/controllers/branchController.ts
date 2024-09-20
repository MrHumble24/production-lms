// controllers/branchController.ts

import { Request, Response } from "express";
import * as branchService from "../services/branchService";

// Create a new branch
export const createBranch = async (req: Request, res: Response) => {
  try {
    const branch = await branchService.createBranch(req.body);
    res.status(201).json(branch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create branch" });
  }
};

// Get all branches
export const getAllBranches = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    const branches = await branchService.getAllBranches();
    res.status(200).json(branches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch branches" });
  }
};

export const getCompanyBranches = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const branches = await branchService.getCompanyBranches(Number(companyId));
    res.status(200).json(branches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch branches" });
  }
};

// Get a single branch by ID
export const getBranchById = async (req: Request, res: Response) => {
  try {
    const { branchId } = req.params;
    const branch = await branchService.getBranchById(Number(branchId));
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }
    res.status(200).json(branch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch branch" });
  }
};

// Update a branch
export const updateBranch = async (req: Request, res: Response) => {
  try {
    const { branchId } = req.params;
    const branch = await branchService.updateBranch(Number(branchId), req.body);
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }
    res.status(200).json(branch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update branch" });
  }
};

// Delete a branch
export const deleteBranch = async (req: Request, res: Response) => {
  try {
    const { branchId } = req.params;
    const branch = await branchService.deleteBranch(Number(branchId));
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }
    res.status(200).json({ message: "Branch deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete branch" });
  }
};
