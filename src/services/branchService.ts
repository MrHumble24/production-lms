// services/branchService.ts

import { PrismaClient, Branch } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new branch
export const createBranch = async (data: Partial<Branch>): Promise<Branch> => {
  const {
    address,
    createdAt,
    description,
    email,
    id,
    isDeleted,
    location,
    name,
    phone,
    tenantId,
    updatedAt,
    website,
  } = data;
  return await prisma.branch.create({
    data: {
      address: address || "",
      createdAt,
      description,
      email,
      id,
      isDeleted,
      location,
      name: name || "",
      phone,
      tenantId: tenantId!,
      updatedAt,
      website,
    },
  });
};
// Get all branches
export const getAllBranches = async (): Promise<Branch[]> => {
  return await prisma.branch.findMany({
    include: {
      tenant: true,
    },
  });
};

// Get a single branch by ID
export const getBranchById = async (
  branchId: number
): Promise<Branch | null> => {
  return await prisma.branch.findUnique({ where: { id: branchId } });
};

// Update a branch
export const updateBranch = async (
  branchId: number,
  data: Partial<Branch>
): Promise<Branch | null> => {
  return await prisma.branch.update({
    where: { id: branchId },
    data,
  });
};

export const getCompanyBranches = async (
  companyId: number
): Promise<Branch[]> => {
  return await prisma.branch.findMany({
    where: { tenantId: companyId },
    include: {
      tenant: true,
    },
  });
};
// Delete a branch
export const deleteBranch = async (
  branchId: number
): Promise<Branch | null> => {
  return await prisma.branch.delete({
    where: { id: branchId },
  });
};
