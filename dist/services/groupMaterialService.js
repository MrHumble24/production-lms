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
exports.deleteGroupMaterial = exports.updateGroupMaterial = exports.getGroupMaterialById = exports.getGroupMaterials = exports.createGroupMaterial = void 0;
const client_1 = require("@prisma/client");
const uploadImage_1 = __importDefault(require("../helpers/uploadImage"));
const prisma = new client_1.PrismaClient();
const createGroupMaterial = (data, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { branchId, groupId, title, description, teacherId } = data;
    let files = [];
    for (const attachment of req.files) {
        const data = yield (0, uploadImage_1.default)(attachment, "attachments");
        files.push(data);
    }
    return prisma.groupMaterial.create({
        data: {
            branch: { connect: { id: Number(branchId) } },
            group: { connect: { id: Number(groupId) } },
            teacher: { connect: { id: Number(teacherId) } },
            title,
            description,
            attachments: files,
        },
    });
});
exports.createGroupMaterial = createGroupMaterial;
const getGroupMaterials = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.groupMaterial.findMany({
        where: { isDeleted: false },
        include: { group: true, branch: true },
    });
});
exports.getGroupMaterials = getGroupMaterials;
const getGroupMaterialById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.groupMaterial.findUnique({
        where: { id },
        include: { group: true, branch: true },
    });
});
exports.getGroupMaterialById = getGroupMaterialById;
const updateGroupMaterial = (data, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { branchId, groupId, title, description, teacherId } = data;
    let files = [];
    for (const attachment of req.files) {
        const data = yield (0, uploadImage_1.default)(attachment, "attachments");
        files.push(data);
    }
    console.log(data);
    return prisma.groupMaterial.update({
        where: {
            id: Number(data.id),
        },
        data: {
            groupId: Number(groupId),
            title,
            description,
            attachments: files,
        },
    });
});
exports.updateGroupMaterial = updateGroupMaterial;
const deleteGroupMaterial = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.groupMaterial.update({
        where: { id },
        data: { isDeleted: true },
    });
});
exports.deleteGroupMaterial = deleteGroupMaterial;
