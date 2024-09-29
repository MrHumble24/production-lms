"use strict";
// services/groupNotificationService.ts
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
exports.deleteGroupNotification = exports.updateGroupNotification = exports.getNotificationsByGroup = exports.getGroupNotificationById = exports.getGroupNotifications = exports.createGroupNotification = void 0;
const client_1 = require("@prisma/client");
const uploadImage_1 = __importDefault(require("../helpers/uploadImage"));
const prisma = new client_1.PrismaClient();
const createGroupNotification = (data, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { branchId, groupId, priority, status, title, type, description, teacherId, } = data;
    let files = [];
    for (const attachment of req.files) {
        const data = yield (0, uploadImage_1.default)(attachment, "attachments");
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
});
exports.createGroupNotification = createGroupNotification;
const getGroupNotifications = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.groupNotification.findMany({
        where: { isDeleted: false },
        include: { group: true, branch: true },
    });
});
exports.getGroupNotifications = getGroupNotifications;
const getGroupNotificationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.groupNotification.findUnique({
        where: { id },
        include: { group: true, branch: true },
    });
});
exports.getGroupNotificationById = getGroupNotificationById;
const getNotificationsByGroup = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.groupNotification.findMany({
        where: { groupId: id },
        include: { group: true, branch: true },
    });
});
exports.getNotificationsByGroup = getNotificationsByGroup;
const updateGroupNotification = (id, data, attachments) => __awaiter(void 0, void 0, void 0, function* () {
    let files = [];
    for (const attachment of attachments) {
        const data = yield (0, uploadImage_1.default)(attachment, "attachments");
        files.push(data);
    }
    console.log(data);
    return prisma.groupNotification.update({
        where: { id },
        data: Object.assign(Object.assign({}, data), { groupId: Number(data.groupId), branchId: Number(data.branchId), attachments: files }),
    });
});
exports.updateGroupNotification = updateGroupNotification;
const deleteGroupNotification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.groupNotification.update({
        where: { id },
        data: { isDeleted: true },
    });
});
exports.deleteGroupNotification = deleteGroupNotification;
