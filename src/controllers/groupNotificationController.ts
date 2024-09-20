// controllers/groupNotificationController.ts

import { Request, Response } from "express";
import {
  createGroupNotification,
  getGroupNotifications,
  getGroupNotificationById,
  updateGroupNotification,
  deleteGroupNotification,
  getNotificationsByGroup,
} from "../services/groupNotificationService";
import { GroupNotification } from "@prisma/client";
import prisma from "../prisma/client";

export const createGroupNotificationController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;
    const notification = await createGroupNotification(data, req);
    res.status(201).json(notification);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create group notification" });
  }
};

export const getGroupNotificationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const notifications = await getGroupNotifications();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve group notifications" });
  }
};

export const getGroupNotificationByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const notification = await getGroupNotificationById(Number(id));
    if (!notification) {
      return res.status(404).json({ error: "Group notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve group notification" });
  }
};

export const getNotificationsByGroupController = async (
  req: Request,
  res: Response
) => {
  try {
    const { studentId } = req.params;
    const groupIds = await prisma.student.findUnique({
      where: { id: Number(studentId) },
      include: { groups: { select: { id: true } } },
    });
    let notifications: GroupNotification[] | null = [];
    if (groupIds) {
      for (const groupId of groupIds.groups) {
        const n = await getNotificationsByGroup(groupId.id);
        notifications.push(...n);
      }
    }
    if (!notifications) {
      return res.status(404).json({ error: "Group notifications not found" });
    }
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve group notification" });
  }
};

export const updateGroupNotificationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedNotification = await updateGroupNotification(Number(id), data);
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).json({ error: "Failed to update group notification" });
  }
};

export const deleteGroupNotificationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await deleteGroupNotification(Number(id));
    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ error: "Failed to delete group notification" });
  }
};
