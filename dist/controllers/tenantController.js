"use strict";
// controllers/tenantController.ts
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
exports.deleteTenant = exports.updateTenantLogo = exports.updateTenant = exports.getTenantById = exports.getAllTenants = exports.createTenant = void 0;
const tenantService = __importStar(require("../services/tenantService"));
// Create a new tenant
const createTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenant = yield tenantService.createTenant(req.body, req.file);
        res.status(201).json(tenant);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create tenant" });
    }
});
exports.createTenant = createTenant;
// Get all tenants
const getAllTenants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenants = yield tenantService.getAllTenants();
        res.status(200).json(tenants);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch tenants" });
    }
});
exports.getAllTenants = getAllTenants;
// Get a single tenant by ID
const getTenantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tenantId } = req.params;
        const tenant = yield tenantService.getTenantById(Number(tenantId));
        if (!tenant) {
            return res.status(404).json({ error: "Tenant not found" });
        }
        res.status(200).json(tenant);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch tenant" });
    }
});
exports.getTenantById = getTenantById;
// Update a tenant
const updateTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tenantId } = req.params;
        const tenant = yield tenantService.updateTenant(Number(tenantId), req.body);
        if (!tenant) {
            return res.status(404).json({ error: "Tenant not found" });
        }
        res.status(200).json(tenant);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update tenant" });
    }
});
exports.updateTenant = updateTenant;
const updateTenantLogo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenant = yield tenantService.updateTenantLogoService(Number(req.params.tenantId), req.file);
        res.status(200).json(tenant);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update tenant" });
    }
});
exports.updateTenantLogo = updateTenantLogo;
// Delete a tenant
const deleteTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tenantId } = req.params;
        yield tenantService
            .deleteTenant(Number(tenantId))
            .then(() => {
            return res.status(200).json({ message: "Tenant deleted successfully" });
        })
            .catch((error) => {
            return res.status(404).json({ error: "Tenant not found" });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete tenant" });
    }
});
exports.deleteTenant = deleteTenant;
