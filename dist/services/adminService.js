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
exports.deleteAdminService = exports.updateAdminService = exports.createAdminService = exports.getAdminByIdService = exports.getAllAdminService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
/**
 * Retrieves all admins from the database, ordered by first name in ascending order.
 * @returns A promise that resolves to an array of Admin objects.
 */
const getAllAdminService = () => __awaiter(void 0, void 0, void 0, function* () {
    const admins = yield client_1.default.admin.findMany({
        orderBy: {
            firstName: "asc",
        },
    });
    return admins;
});
exports.getAllAdminService = getAllAdminService;
/**
 * Retrieves an admin from the database by their ID.
 * @param id - The ID of the admin to retrieve.
 * @returns A promise that resolves to an Admin object if found, or null if not found.
 */
const getAdminByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield client_1.default.admin.findUnique({
        where: { id },
        include: {
            branch: { include: { tenant: true } },
        },
    });
    return admin;
});
exports.getAdminByIdService = getAdminByIdService;
/**
 * Creates a new admin in the database.
 * @param data - The data for the new admin, including fields such as firstName, lastName, email, phone, role, avatar, branchId, isDeleted, and telegramUsername.
 * @returns A promise that resolves to the created Admin object or null if creation fails.
 */
const createAdminService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, phone, role, avatar, branchId, isDeleted, telegramUsername, } = data;
    const admin = yield client_1.default.admin.create({
        data: {
            firstName,
            lastName,
            email,
            phone,
            role,
            avatar,
            branchId,
            isDeleted,
            telegramUsername,
        },
    });
    return admin;
});
exports.createAdminService = createAdminService;
/**
 * Updates an existing admin in the database.
 * @param data - The updated data for the admin, including fields such as firstName, lastName, email, phone, role, avatar, branchId, isDeleted, password, and telegramUsername.
 * @param adminId - The ID of the admin to update.
 * @returns A promise that resolves to the updated Admin object or null if update fails.
 */
const updateAdminService = (data, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, phone, role, avatar, branchId, isDeleted, password, telegramUsername, } = data;
    const updatedAdmin = yield client_1.default.admin.update({
        where: { id: Number(adminId) },
        data: {
            firstName,
            lastName,
            email,
            phone,
            role,
            avatar,
            branchId,
            isDeleted,
            password,
            telegramUsername,
        },
    });
    return updatedAdmin;
});
exports.updateAdminService = updateAdminService;
/**
 * Deletes an admin from the database by their ID.
 * @param adminId - The ID of the admin to delete.
 * @returns A promise that resolves to the deleted Admin object if successful, or null if no admin with the specified ID was found.
 */
const deleteAdminService = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedAdmin = yield client_1.default.admin.delete({
        where: { id: adminId },
    });
    return deletedAdmin;
});
exports.deleteAdminService = deleteAdminService;
