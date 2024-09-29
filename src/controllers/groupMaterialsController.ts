// controllers/groupMaterialController.ts

import { NextFunction, Request, Response } from "express";
import {
  createGroupMaterial,
  getGroupMaterials,
  getGroupMaterialById,
  updateGroupMaterial,
  deleteGroupMaterial,
} from "../services/groupMaterialService";

export const createGroupMaterialController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;

    const material = await createGroupMaterial(data, req);
    res.status(201).json(material);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create group material" });
  }
};

export const getGroupMaterialsController = async (
  req: Request,
  res: Response
) => {
  try {
    const materials = await getGroupMaterials();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve group materials" });
  }
};

export const getGroupMaterialByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const material = await getGroupMaterialById(Number(id));
    if (!material) {
      return res.status(404).json({ error: "Group material not found" });
    }
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve group material" });
  }
};

export const updateGroupMaterialController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedMaterial = await updateGroupMaterial({ ...data, id }, req);
    res.status(200).json(updatedMaterial);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update group material" });
  }
};

export const deleteGroupMaterialController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await deleteGroupMaterial(Number(id));
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ error: "Failed to delete group material" });
  }
};
