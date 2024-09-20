import { Admin, Teacher } from "@prisma/client";
import prisma from "../prisma/client";
/**
 * Retrieves all admins from the database, ordered by first name in ascending order.
 * @returns A promise that resolves to an array of Admin objects.
 */
export const getAllAdminService = async (): Promise<Admin[]> => {
  const admins = await prisma.admin.findMany({
    orderBy: {
      firstName: "asc",
    },
  });
  return admins;
};

/**
 * Retrieves an admin from the database by their ID.
 * @param id - The ID of the admin to retrieve.
 * @returns A promise that resolves to an Admin object if found, or null if not found.
 */
export const getAdminByIdService = async (
  id: number
): Promise<Admin | null> => {
  const admin = await prisma.admin.findUnique({
    where: { id },
    include: {
      branch: { include: { tenant: true } },
    },
  });
  return admin;
};

/**
 * Creates a new admin in the database.
 * @param data - The data for the new admin, including fields such as firstName, lastName, email, phone, role, avatar, branchId, isDeleted, and telegramUsername.
 * @returns A promise that resolves to the created Admin object or null if creation fails.
 */
export const createAdminService = async (data: any): Promise<Admin | null> => {
  const {
    firstName,
    lastName,
    email,
    phone,
    role,
    avatar,
    branchId,
    isDeleted,
    telegramUsername,
  } = data;

  const admin = await prisma.admin.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      role,
      avatar,
      branchId,
      isDeleted,
      telegramUsername,
    },
  });
  return admin;
};

/**
 * Updates an existing admin in the database.
 * @param data - The updated data for the admin, including fields such as firstName, lastName, email, phone, role, avatar, branchId, isDeleted, password, and telegramUsername.
 * @param adminId - The ID of the admin to update.
 * @returns A promise that resolves to the updated Admin object or null if update fails.
 */
export const updateAdminService = async (
  data: any,
  adminId: string
): Promise<Admin | null> => {
  const {
    firstName,
    lastName,
    email,
    phone,
    role,
    avatar,
    branchId,
    isDeleted,
    password,
    telegramUsername,
  } = data;

  const updatedAdmin = await prisma.admin.update({
    where: { id: Number(adminId) },
    data: {
      firstName,
      lastName,
      email,
      phone,
      role,
      avatar,
      branchId,
      isDeleted,
      password,
      telegramUsername,
    },
  });

  return updatedAdmin;
};

/**
 * Deletes an admin from the database by their ID.
 * @param adminId - The ID of the admin to delete.
 * @returns A promise that resolves to the deleted Admin object if successful, or null if no admin with the specified ID was found.
 */
export const deleteAdminService = async (
  adminId: number
): Promise<Admin | null> => {
  const deletedAdmin = await prisma.admin.delete({
    where: { id: adminId },
  });
  return deletedAdmin;
};
