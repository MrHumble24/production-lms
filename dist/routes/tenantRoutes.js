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
const tenantController = __importStar(require("../controllers/tenantController"));
const multer_1 = __importDefault(require("multer"));
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const upload = (0, multer_1.default)();
const router = (0, express_1.Router)();
/**
 * @route   POST /tenants
 * @desc    Create a new tenant with an optional logo upload
 * @access  COMPANY_OWNER, ADMIN
 * @params  Logo image upload (optional)
 */
router.post("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), upload.single("logo"), tenantController.createTenant);
/**
 * @route   GET /tenants
 * @desc    Get all tenants
 * @access  COMPANY_OWNER, ADMIN
 */
router.get("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), tenantController.getAllTenants);
/**
 * @route   GET /tenants/:tenantId
 * @desc    Get a tenant by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.get("/:tenantId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), tenantController.getTenantById);
/**
 * @route   PUT /tenants/:tenantId
 * @desc    Update a tenant's details with an optional logo upload
 * @access  COMPANY_OWNER, ADMIN
 * @params  Logo image upload (optional)
 */
router.put("/:tenantId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), upload.single("logo"), tenantController.updateTenant);
/**
 * @route   PUT /tenants/:tenantId/logo
 * @desc    Update a tenant's logo
 * @access  COMPANY_OWNER, ADMIN
 * @params  Logo image upload (required)
 */
router.put("/:tenantId/logo", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), upload.single("logo"), tenantController.updateTenantLogo);
/**
 * @route   DELETE /tenants/:tenantId
 * @desc    Delete a tenant by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete("/:tenantId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), tenantController.deleteTenant);
exports.default = router;
