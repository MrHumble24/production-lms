import { Request, Response } from "express";
import prisma from "../prisma/client";
import { Room } from "@prisma/client";
import {
  createRoomService,
  deleteRoomService,
  getAllRoomsService,
  getRoomByIdService,
  updateRoomService,
} from "../services/roomService";

// Get all rooms
export const getAllRooms = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const rooms = await getAllRoomsService(Number(req.headers["branch-id"]));
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

// Get a single room by ID
export const getRoomById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const room = await getRoomByIdService(Number(id));
    if (!room) {
      res.status(404).json({ error: "Room not found" });
      return;
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch room" });
  }
};

// Create a new room
export const createRoom = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { number, capacity, branchId } = req.body;
  console.log(number, capacity, branchId);
  try {
    const newRoom = await createRoomService(number, capacity, branchId);
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: "Failed to create room" });
  }
};
// Update a room by ID
export const updateRoom = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { number, capacity, branchId } = req.body;
  try {
    const updatedRoom = await updateRoomService(
      Number(id),
      number,
      capacity,
      branchId
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ error: "Failed to update room" });
  }
};

// Delete a room by ID
export const deleteRoom = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedRoom = await deleteRoomService(Number(id));
    res.status(204).json({ message: "Room deleted", data: deletedRoom });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete room" });
  }
};
