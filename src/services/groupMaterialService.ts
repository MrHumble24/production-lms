// services/groupNotificationService.ts

import { PrismaClient } from "@prisma/client";
import uploadImageToSupabase from "../helpers/uploadImage";
const prisma = new PrismaClient();

export const createGroupMaterial = async (
  data: {
    title: string;
    description?: string;
    attachment?: string;
    groupId: number;
    branchId: number;
    teacherId: number;
  },
  req: any
) => {
  const { branchId, groupId, title, description, teacherId } = data;
  let files = [];
  for (const attachment of req.files) {
    const data = await uploadImageToSupabase(attachment, "attachments");
    files.push(data);
  }

  return prisma.groupMaterial.create({
    data: {
      branch: { connect: { id: Number(branchId) } },
      group: { connect: { id: Number(groupId) } },
      teacher: { connect: { id: Number(teacherId) } },
      title,
      description,
      attachments: files,
    },
  });
};
export const getGroupMaterials = async () => {
  return prisma.groupMaterial.findMany({
    where: { isDeleted: false },
    include: { group: true, branch: true },
  });
};

export const getGroupMaterialById = async (id: number) => {
  return prisma.groupMaterial.findUnique({
    where: { id },
    include: { group: true, branch: true },
  });
};

export const updateGroupMaterial = async (
  id: number,
  data: {
    title?: string;
    description?: string;
    attachment?: string;
  }
) => {
  return prisma.groupMaterial.update({
    where: { id },
    data,
  });
};

export const deleteGroupMaterial = async (id: number) => {
  return prisma.groupMaterial.update({
    where: { id },
    data: { isDeleted: true },
  });
};
