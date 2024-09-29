"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const uploadImage_1 = __importDefault(require("../helpers/uploadImage"));
const client_1 = __importDefault(require("../prisma/client"));
/**
 * Create a new task
 */
const createTask = (taskData, attachments) => __awaiter(void 0, void 0, void 0, function* () {
    const { dueDate, title, description, groupId, priority, branchId, teacherId, } = taskData;
    try {
        let files = [];
        for (const attachment of attachments) {
            const data = yield (0, uploadImage_1.default)(attachment, "attachments");
            files.push(data);
        }
        const newTask = yield client_1.default.task.create({
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
    }
    catch (error) {
        console.log(error);
        throw new Error(`Unable to create task: ${error}`);
    }
});
exports.createTask = createTask;
/**
 * Retrieve all tasks
 */
const getAllTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield client_1.default.task.findMany({
            include: {
                branch: true,
                group: true,
                Teacher: true,
            },
        });
        return tasks;
    }
    catch (error) {
        console.log(error);
        throw new Error(`Unable to retrieve tasks: ${error}`);
    }
});
exports.getAllTasks = getAllTasks;
/**
 * Retrieve a task by ID
 */
const getTaskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield client_1.default.task.findUnique({
            where: { id },
            include: {
                branch: true,
                group: true,
                Teacher: true,
            },
        });
        if (!task)
            throw new Error("Task not found");
        return task;
    }
    catch (error) {
        console.log(error);
        throw new Error(`Unable to retrieve task: ${error}`);
    }
});
exports.getTaskById = getTaskById;
/**
 * Update a task by ID
 */
const updateTask = (id, taskData, attachments) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let files = [];
        for (const attachment of attachments) {
            const data = yield (0, uploadImage_1.default)(attachment, "attachments");
            files.push(data);
        }
        const updatedTask = yield client_1.default.task.update({
            where: { id },
            data: Object.assign(Object.assign({}, taskData), { teacherId: Number(taskData.teacherId), groupId: Number(taskData.groupId), attachments: files, maxScore: Number(taskData.maxScore), minScore: Number(taskData.minScore), branchId: Number(taskData.branchId) }),
        });
        return updatedTask;
    }
    catch (error) {
        console.log(error.message);
        throw new Error(`Unable to update task: ${error}`);
    }
});
exports.updateTask = updateTask;
/**
 * Delete a task by ID
 */
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client_1.default.task.delete({
            where: { id },
        });
        return { message: "Task deleted successfully" };
    }
    catch (error) {
        console.log(error);
        throw new Error(`Unable to delete task: ${error}`);
    }
});
exports.deleteTask = deleteTask;
