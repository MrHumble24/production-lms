import { Request, Response } from "express";
import {
  createGroupService,
  deleteGroupHard,
  getAllGroupsService,
  getGroupByIdService,
  getGroupStudentsService,
  getGroupTimetable,
  reassignTeacherToGroup,
  removeStudentFromGroup,
  updateGroupCapacity,
  updateGroupService,
} from "../services/groupService";

export const getAllGroups = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const all = req.body?.all || false;
    const branchId = req.headers["branch-id"];
    const groups = (await getAllGroupsService(all, Number(branchId))).map(
      (group) => {
        const currentSize = group.students.length;
        return { ...group, currentSize };
      }
    );
    if (!groups) {
      res.status(404).json({ error: "No groups found" });
      return;
    }
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch groups" });
  }
};

export const getGroupById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const group = await getGroupByIdService(Number(id));
    const currentSize = group?.students.length || 0;
    if (!group) {
      res.status(404).json({ error: "Group not found" });
      return;
    }
    res.status(200).json({ ...group, currentSize });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch group" });
  }
};

// Create a new group
export const createGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  const body = req.body;
  try {
    const newGroup = await createGroupService(body);
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: "Failed to create group" });
  }
};

// Update a group by ID
export const updateGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedGroup = await updateGroupService(Number(id), req.body);
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(500).json({ error: "Failed to update group" });
  }
};

// Delete a group by ID
export const deleteGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groupId = Number(req.params.id);
    const deletedGroup = await deleteGroupHard(Number(groupId));
    if (!deletedGroup) {
      res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json({ message: "Group soft deleted successfully" });
  } catch (error) {
    console.log({ par: req.params.id, body: req.body, error });
    res.status(500).json(error);
  }
};

export const removeStudentFromGroupHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { studentId, groupId } = req.body;

  try {
    const result = await removeStudentFromGroup(studentId, groupId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateGroupCapacityHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { groupId, newCapacity } = req.body;

  try {
    const updatedGroup = await updateGroupCapacity(groupId, newCapacity);
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const reassignTeacherToGroupHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { groupId, newTeacherId } = req.body;

  try {
    const updatedGroup = await reassignTeacherToGroup(groupId, newTeacherId);
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getGroupTimetableHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const timetables = await getGroupTimetable(Number(id));
    res.status(200).json(timetables);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getGroupStudentsHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const students = await getGroupStudentsService(Number(req.params.id));

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch group" });
  }
};
