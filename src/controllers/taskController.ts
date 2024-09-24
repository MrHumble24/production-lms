// src/controllers/taskController.ts

import { NextFunction, Request, Response } from "express";
import * as taskService from "../services/taskService";

/**
 * Controller to create a new task
 */
export const createTask = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const newTask = await taskService.createTask(req.body, req.files);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

/**
 * Controller to get all tasks
 */
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/**
 * Controller to get a task by ID
 */
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await taskService.getTaskById(Number(req.params.id));
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

/**
 * Controller to update a task by ID
 */
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedTask = await taskService.updateTask(
      Number(req.params.id),
      req.body,
      req.files
    );
    res.status(200).json(updatedTask);
  } catch (error: any) {
    next(error);
  }
};

/**
 * Controller to delete a task by ID
 */
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const result = await taskService.deleteTask(Number(req.params.id));
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
