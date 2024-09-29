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
exports.deleteTenant = exports.updateTenantLogoService = exports.updateTenant = exports.getTenantById = exports.getAllTenants = exports.createTenant = void 0;
// services/tenantService.ts
const client_1 = require("@prisma/client");
const removeImage_1 = __importDefault(require("../helpers/removeImage"));
const uploadImage_1 = __importDefault(require("../helpers/uploadImage"));
const prisma = new client_1.PrismaClient();
const createTenant = (data, file) => __awaiter(void 0, void 0, void 0, function* () {
    const { address = "", createdAt, description, email, id, isDeleted, name = "", phone, updatedAt, website, } = data;
    const logoUrl = yield (0, uploadImage_1.default)(file, "logo");
    // Prepare tenant data
    const tenantData = {
        address,
        createdAt,
        description,
        email,
        id,
        isDeleted,
        logo: logoUrl,
        name,
        phone,
        updatedAt,
        website,
    };
    const newTenant = yield prisma.tenant.create({
        data: tenantData,
    });
    const mainBranch = yield prisma.branch.create({
        data: {
            name: "Main Branch",
            tenantId: newTenant.id,
            address: address,
            description,
            phone,
            email,
            website,
        },
    });
    return { newTenant, mainBranch };
});
exports.createTenant = createTenant;
// Get all tenants
const getAllTenants = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.tenant.findMany({
        include: {
            branches: true,
            socialMedia: true,
            CompanyOwner: true,
        },
    });
});
exports.getAllTenants = getAllTenants;
// Get a single tenant by ID
const getTenantById = (tenantId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.tenant.findUnique({
        where: { id: tenantId },
        include: {
            branches: true,
            socialMedia: true,
            CompanyOwner: true,
        },
    });
});
exports.getTenantById = getTenantById;
// Update a tenant
const updateTenant = (tenantId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.tenant.update({
        where: { id: tenantId },
        data,
    });
});
exports.updateTenant = updateTenant;
const updateTenantLogoService = (tenantId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const tenant = yield prisma.tenant.findUnique({
        where: { id: tenantId },
        select: { logo: true },
    });
    if (tenant === null || tenant === void 0 ? void 0 : tenant.logo) {
        yield (0, removeImage_1.default)(tenant === null || tenant === void 0 ? void 0 : tenant.logo);
    }
    const newLogo = yield (0, uploadImage_1.default)(data, "logo");
    return yield prisma.tenant.update({
        where: { id: tenantId },
        data: {
            logo: newLogo,
        },
    });
});
exports.updateTenantLogoService = updateTenantLogoService;
// Delete a tenant
const deleteTenant = (tenantId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tenant = yield prisma.tenant.findUnique({
            where: { id: tenantId },
            select: { logo: true },
        });
        if (tenant && tenant.logo) {
            yield (0, removeImage_1.default)(tenant.logo);
        }
        yield prisma.tenant.delete({
            where: { id: tenantId },
        });
        console.log(`Tenant with ID ${tenantId} and associated image deleted successfully.`);
    }
    catch (error) {
        console.error(`Failed to delete tenant: `, error);
        throw new Error(`Failed to delete tenant: ${error}`);
    }
});
exports.deleteTenant = deleteTenant;
