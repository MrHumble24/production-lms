"use strict";
// services/branchService.ts
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
exports.deleteBranch = exports.getCompanyBranches = exports.updateBranch = exports.getBranchById = exports.getAllBranches = exports.createBranch = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a new branch
const createBranch = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, createdAt, description, email, id, isDeleted, location, name, phone, tenantId, updatedAt, website, } = data;
    return yield prisma.branch.create({
        data: {
            address: address || "",
            createdAt,
            description,
            email,
            id,
            isDeleted,
            location,
            name: name || "",
            phone,
            tenantId: tenantId,
            updatedAt,
            website,
        },
    });
});
exports.createBranch = createBranch;
// Get all branches
const getAllBranches = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.branch.findMany({
        include: {
            tenant: true,
        },
    });
});
exports.getAllBranches = getAllBranches;
// Get a single branch by ID
const getBranchById = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.branch.findUnique({ where: { id: branchId } });
});
exports.getBranchById = getBranchById;
// Update a branch
const updateBranch = (branchId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.branch.update({
        where: { id: branchId },
        data,
    });
});
exports.updateBranch = updateBranch;
const getCompanyBranches = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.branch.findMany({
        where: { tenantId: companyId },
        include: {
            tenant: true,
        },
    });
});
exports.getCompanyBranches = getCompanyBranches;
// Delete a branch
const deleteBranch = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.branch.delete({
        where: { id: branchId },
    });
});
exports.deleteBranch = deleteBranch;
