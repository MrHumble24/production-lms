"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController = __importStar(require("../controllers/taskController"));
const multer_1 = __importDefault(require("multer"));
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
/**
 * @route   POST /tasks
 * @desc    Create a new task with optional attachments
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 * @params  Attachments (optional, up to 10 files)
 */
router.post("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), upload.array("attachments", 10), taskController.createTask);
/**
 * @route   GET /tasks
 * @desc    Get a list of all tasks
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT (can view tasks assigned to them)
 */
router.get("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), taskController.getAllTasks);
/**
 * @route   GET /tasks/:id
 * @desc    Get task details by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT (can view tasks assigned to them)
 */
router.get("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), taskController.getTaskById);
/**
 * @route   PATCH /tasks/:id
 * @desc    Update a task by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.patch("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), upload.array("attachments", 10), taskController.updateTask);
/**
 * @route   DELETE /tasks/:id
 * @desc    Delete a task by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), taskController.deleteTask);
exports.default = router;
