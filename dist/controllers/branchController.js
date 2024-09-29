"use strict";
// controllers/branchController.ts
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
exports.deleteBranch = exports.updateBranch = exports.getBranchById = exports.getCompanyBranches = exports.getAllBranches = exports.createBranch = void 0;
const branchService = __importStar(require("../services/branchService"));
// Create a new branch
const createBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branch = yield branchService.createBranch(req.body);
        res.status(201).json(branch);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create branch" });
    }
});
exports.createBranch = createBranch;
// Get all branches
const getAllBranches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const branches = yield branchService.getAllBranches();
        res.status(200).json(branches);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch branches" });
    }
});
exports.getAllBranches = getAllBranches;
const getCompanyBranches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        const branches = yield branchService.getCompanyBranches(Number(companyId));
        res.status(200).json(branches);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch branches" });
    }
});
exports.getCompanyBranches = getCompanyBranches;
// Get a single branch by ID
const getBranchById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { branchId } = req.params;
        const branch = yield branchService.getBranchById(Number(branchId));
        if (!branch) {
            return res.status(404).json({ error: "Branch not found" });
        }
        res.status(200).json(branch);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch branch" });
    }
});
exports.getBranchById = getBranchById;
// Update a branch
const updateBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { branchId } = req.params;
        const branch = yield branchService.updateBranch(Number(branchId), req.body);
        if (!branch) {
            return res.status(404).json({ error: "Branch not found" });
        }
        res.status(200).json(branch);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update branch" });
    }
});
exports.updateBranch = updateBranch;
// Delete a branch
const deleteBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { branchId } = req.params;
        const branch = yield branchService.deleteBranch(Number(branchId));
        if (!branch) {
            return res.status(404).json({ error: "Branch not found" });
        }
        res.status(200).json({ message: "Branch deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete branch" });
    }
});
exports.deleteBranch = deleteBranch;
