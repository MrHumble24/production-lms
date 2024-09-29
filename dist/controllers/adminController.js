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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.updateAdmin = exports.createAdmin = exports.getAdminById = exports.getAllAdmins = void 0;
const adminService_1 = require("../services/adminService");
// Get all admins
const getAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield (0, adminService_1.getAllAdminService)();
        res.status(200).json(admins);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch admins" });
    }
});
exports.getAllAdmins = getAllAdmins;
// Get a single admin by ID
const getAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const admin = yield (0, adminService_1.getAdminByIdService)(Number(id));
        res.status(200).json(admin);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch admin" });
    }
});
exports.getAdminById = getAdminById;
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAdmin = yield (0, adminService_1.createAdminService)(req.body);
        res.status(201).json(newAdmin);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create admin" });
    }
});
exports.createAdmin = createAdmin;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedAdmin = yield (0, adminService_1.updateAdminService)(req.body, id);
        if (!updatedAdmin) {
            res.status(404).json({ error: "Admin not found" });
        }
        res.status(200).json(updatedAdmin);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update admin" });
    }
});
exports.updateAdmin = updateAdmin;
// Delete an admin by ID
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedAdmin = (0, adminService_1.deleteAdminService)(Number(id));
        res.status(204).json({ message: "Admin deleted", data: deletedAdmin });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete admin" });
    }
});
exports.deleteAdmin = deleteAdmin;
