// src/services/roomService.ts
import prisma from "../prisma/client";
import { Room } from "@prisma/client";

/**
 * Retrieves all rooms from the database for a specific branch.
 * @param branchId - The ID of the branch to filter rooms by.
 * @returns A promise that resolves to an array of Room objects.
 */
export const getAllRoomsService = async (
  branchId: number
): Promise<Room[] | null> => {
  return await prisma.room.findMany({
    include: { timetables: true, branch: true },
    orderBy: {
      number: "asc",
    },
  });
};

/**
 * Retrieves a room by its ID.
 * @param id - The ID of the room to retrieve.
 * @returns A promise that resolves to a Room object if found, otherwise null.
 */
export const getRoomByIdService = async (id: number): Promise<Room | null> => {
  return await prisma.room.findUnique({
    where: { id },
    include: { timetables: true },
  });
};

/**
 * Creates a new room in the database.
 * @param number - The room number.
 * @param capacity - The capacity of the room.
 * @param branchId - The ID of the branch to filter rooms by.
 * @returns A promise that resolves to the newly created Room object.
 */
export const createRoomService = async (
  number: string,
  capacity: number,
  branchId?: string
): Promise<Room> => {
  return await prisma.room.create({
    data: {
      number,
      capacity,
      branchId: Number(branchId),
    },
  });
};

/**
 * Updates a room by its ID.
 * @param id - The ID of the room to update.
 * @param number - The new room number.
 * @param capacity - The new capacity of the room.
 * @returns A promise that resolves to the updated Room object.
 */
export const updateRoomService = async (
  id: number,
  number: string,
  capacity: number,
  branchId: string
): Promise<Room> => {
  return await prisma.room.update({
    where: { id },
    data: {
      number,
      capacity,
    },
  });
};

/**
 * Deletes a room by its ID.
 * @param id - The ID of the room to delete.
 * @returns A promise that resolves when the room is deleted.
 */
export const deleteRoomService = async (id: number): Promise<Room | null> => {
  const deletedRoom = await prisma.room.delete({
    where: { id },
  });
  return deletedRoom;
};
