"use strict";
// controllers/groupNotificationController.ts
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
exports.deleteGroupNotificationController = exports.updateGroupNotificationController = exports.getNotificationsByGroupController = exports.getGroupNotificationByIdController = exports.getGroupNotificationsController = exports.createGroupNotificationController = void 0;
const groupNotificationService_1 = require("../services/groupNotificationService");
const client_1 = __importDefault(require("../prisma/client"));
const createGroupNotificationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const notification = yield (0, groupNotificationService_1.createGroupNotification)(data, req);
        res.status(201).json(notification);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create group notification" });
    }
});
exports.createGroupNotificationController = createGroupNotificationController;
const getGroupNotificationsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield (0, groupNotificationService_1.getGroupNotifications)();
        res.status(200).json(notifications);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve group notifications" });
    }
});
exports.getGroupNotificationsController = getGroupNotificationsController;
const getGroupNotificationByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const notification = yield (0, groupNotificationService_1.getGroupNotificationById)(Number(id));
        if (!notification) {
            return res.status(404).json({ error: "Group notification not found" });
        }
        res.status(200).json(notification);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve group notification" });
    }
});
exports.getGroupNotificationByIdController = getGroupNotificationByIdController;
const getNotificationsByGroupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const groupIds = yield client_1.default.student.findUnique({
            where: { id: Number(studentId) },
            include: { groups: { select: { id: true } } },
        });
        let notifications = [];
        if (groupIds) {
            for (const groupId of groupIds.groups) {
                const n = yield (0, groupNotificationService_1.getNotificationsByGroup)(groupId.id);
                notifications.push(...n);
            }
        }
        if (!notifications) {
            return res.status(404).json({ error: "Group notifications not found" });
        }
        res.status(200).json(notifications);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve group notification" });
    }
});
exports.getNotificationsByGroupController = getNotificationsByGroupController;
const updateGroupNotificationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedNotification = yield (0, groupNotificationService_1.updateGroupNotification)(Number(id), data, req.files);
        res.status(200).json(updatedNotification);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update group notification" });
    }
});
exports.updateGroupNotificationController = updateGroupNotificationController;
const deleteGroupNotificationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, groupNotificationService_1.deleteGroupNotification)(Number(id));
        res.status(204).send(); // No Content
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete group notification" });
    }
});
exports.deleteGroupNotificationController = deleteGroupNotificationController;
