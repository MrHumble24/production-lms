"use strict";
// src/controllers/taskController.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const taskService = __importStar(require("../services/taskService"));
/**
 * Controller to create a new task
 */
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const newTask = yield taskService.createTask(req.body, req.files);
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.createTask = createTask;
/**
 * Controller to get all tasks
 */
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskService.getAllTasks();
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.getAllTasks = getAllTasks;
/**
 * Controller to get a task by ID
 */
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield taskService.getTaskById(Number(req.params.id));
        res.status(200).json(task);
    }
    catch (error) {
        res.status(404).json({ error: error });
    }
});
exports.getTaskById = getTaskById;
/**
 * Controller to update a task by ID
 */
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedTask = yield taskService.updateTask(Number(req.params.id), req.body, req.files);
        res.status(200).json(updatedTask);
    }
    catch (error) {
        next(error);
    }
});
exports.updateTask = updateTask;
/**
 * Controller to delete a task by ID
 */
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield taskService.deleteTask(Number(req.params.id));
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.deleteTask = deleteTask;
