// services/groupNotificationService.ts

import { PrismaClient } from "@prisma/client";
import uploadImageToSupabase from "../helpers/uploadImage";
const prisma = new PrismaClient();

export const createGroupNotification = async (
  data: {
    title: string;
    description?: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    type: "ANNOUNCEMENT" | "REMINDER" | "ALERT" | "EVENT";
    status: "UNREAD" | "READ" | "SENT" | "ARCHIVED";
    attachment?: string;
    groupId: number;
    branchId: number;
    teacherId: number;
  },
  req: any
) => {
  const {
    branchId,
    groupId,
    priority,
    status,
    title,
    type,
    description,
    teacherId,
  } = data;

  let files = [];
  for (const attachment of req.files) {
    const data = await uploadImageToSupabase(attachment, "attachments");
    files.push(data);
  }

  return prisma.groupNotification.create({
    data: {
      branch: { connect: { id: Number(branchId) } },
      group: { connect: { id: Number(groupId) } },
      teacher: { connect: { id: Number(teacherId) } },
      title,
      description,
      priority,
      attachments: files,
      status,
      type,
    },
  });
};
export const getGroupNotifications = async () => {
  return prisma.groupNotification.findMany({
    where: { isDeleted: false },
    include: { group: true, branch: true },
  });
};

export const getGroupNotificationById = async (id: number) => {
  return prisma.groupNotification.findUnique({
    where: { id },
    include: { group: true, branch: true },
  });
};
export const getNotificationsByGroup = async (id: number) => {
  return prisma.groupNotification.findMany({
    where: { groupId: id },
    include: { group: true, branch: true },
  });
};

export const updateGroupNotification = async (
  id: number,
  data: {
    title?: string;
    description?: string;
    priority?: "LOW" | "MEDIUM" | "HIGH";
    type?: "ANNOUNCEMENT" | "REMINDER" | "ALERT" | "EVENT";
    status?: "UNREAD" | "READ" | "SENT" | "ARCHIVED";
    attachment?: string;
    isDeleted?: boolean;
  }
) => {
  return prisma.groupNotification.update({
    where: { id },
    data,
  });
};

export const deleteGroupNotification = async (id: number) => {
  return prisma.groupNotification.update({
    where: { id },
    data: { isDeleted: true },
  });
};
