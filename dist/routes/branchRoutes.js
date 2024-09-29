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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const branchController = __importStar(require("../controllers/branchController"));
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
/**
 * @route   POST /branches
 * @desc    Create a new branch
 * @access  COMPANY_OWNER, ADMIN
 */
router.post("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), branchController.createBranch);
/**
 * @route   GET /branches
 * @desc    Get all branches
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), branchController.getAllBranches);
/**
 * @route   GET /branches/company/:companyId
 * @desc    Get all branches for a specific company
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get("/company/:companyId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), branchController.getCompanyBranches);
/**
 * @route   GET /branches/:branchId
 * @desc    Get a single branch by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get("/:branchId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), branchController.getBranchById);
/**
 * @route   PUT /branches/:branchId
 * @desc    Update a branch by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.put("/:branchId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), branchController.updateBranch);
/**
 * @route   DELETE /branches/:branchId
 * @desc    Delete a branch by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete("/:branchId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), branchController.deleteBranch);
exports.default = router;
