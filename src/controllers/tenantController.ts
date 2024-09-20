// controllers/tenantController.ts

import { Request, Response } from "express";
import * as tenantService from "../services/tenantService";

// Create a new tenant
export const createTenant = async (req: Request, res: Response) => {
  try {
    const tenant = await tenantService.createTenant(req.body, req.file);
    res.status(201).json(tenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create tenant" });
  }
};

// Get all tenants
export const getAllTenants = async (req: Request, res: Response) => {
  try {
    const tenants = await tenantService.getAllTenants();
    res.status(200).json(tenants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tenants" });
  }
};

// Get a single tenant by ID
export const getTenantById = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.params;
    const tenant = await tenantService.getTenantById(Number(tenantId));
    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }
    res.status(200).json(tenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tenant" });
  }
};

// Update a tenant
export const updateTenant = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.params;
    const tenant = await tenantService.updateTenant(Number(tenantId), req.body);
    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }
    res.status(200).json(tenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update tenant" });
  }
};

export const updateTenantLogo = async (req: Request, res: Response) => {
  try {
    const tenant = await tenantService.updateTenantLogoService(
      Number(req.params.tenantId),
      req.file
    );
    res.status(200).json(tenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update tenant" });
  }
};

// Delete a tenant
export const deleteTenant = async (req: Request, res: Response) => {
  try {
    const { tenantId } = req.params;
    await tenantService
      .deleteTenant(Number(tenantId))
      .then(() => {
        return res.status(200).json({ message: "Tenant deleted successfully" });
      })
      .catch((error) => {
        return res.status(404).json({ error: "Tenant not found" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete tenant" });
  }
};
