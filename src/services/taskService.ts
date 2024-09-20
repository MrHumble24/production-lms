import uploadImageToSupabase from "../helpers/uploadImage";
import prisma from "../prisma/client";

/**
 * Create a new task
 */
export const createTask = async (taskData: any, attachments: any) => {
  const {
    dueDate,
    title,
    description,
    groupId,
    priority,
    branchId,
    teacherId,
  } = taskData;
  try {
    let files = [];
    for (const attachment of attachments) {
      const data = await uploadImageToSupabase(attachment, "attachments");
      files.push(data);
    }
    const newTask = await prisma.task.create({
      data: {
        dueDate: new Date(dueDate),
        title,
        attachments: files,
        description,
        priority,
        Teacher: {
          connect: {
            id: Number(teacherId),
          },
        },
        group: {
          connect: {
            id: Number(groupId),
          },
        },
        branch: {
          connect: {
            id: Number(branchId),
          },
        },
      },
    });
    return newTask;
  } catch (error) {
    console.log(error);
    throw new Error(`Unable to create task: ${error}`);
  }
};
/**
 * Retrieve all tasks
 */
export const getAllTasks = async () => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        branch: true,
        group: true,
        Teacher: true,
      },
    });
    return tasks;
  } catch (error) {
    console.log(error);
    throw new Error(`Unable to retrieve tasks: ${error}`);
  }
};

/**
 * Retrieve a task by ID
 */
export const getTaskById = async (id: number) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        branch: true,
        group: true,
        Teacher: true,
      },
    });
    if (!task) throw new Error("Task not found");
    return task;
  } catch (error) {
    console.log(error);
    throw new Error(`Unable to retrieve task: ${error}`);
  }
};

/**
 * Update a task by ID
 */
export const updateTask = async (id: number, taskData: any) => {
  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: taskData,
    });
    return updatedTask;
  } catch (error) {
    console.log(error);
    throw new Error(`Unable to update task: ${error}`);
  }
};

/**
 * Delete a task by ID
 */
export const deleteTask = async (id: number) => {
  try {
    await prisma.task.delete({
      where: { id },
    });
    return { message: "Task deleted successfully" };
  } catch (error) {
    console.log(error);
    throw new Error(`Unable to delete task: ${error}`);
  }
};
