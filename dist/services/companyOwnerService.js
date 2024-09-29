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
exports.deleteCompanyOwnerService = exports.updateCompanyOwnerService = exports.updateCompanyOwnerImageService = exports.createCompanyOwnerService = exports.getCompanyOwnerByIdService = exports.getAllCompanyOwnerService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const uploadImage_1 = __importDefault(require("../helpers/uploadImage"));
const removeImage_1 = __importDefault(require("../helpers/removeImage"));
const getAllCompanyOwnerService = () => __awaiter(void 0, void 0, void 0, function* () {
    const companyOwners = yield client_1.default.companyOwner.findMany({
        orderBy: {
            firstName: "asc",
        },
    });
    return companyOwners;
});
exports.getAllCompanyOwnerService = getAllCompanyOwnerService;
const getCompanyOwnerByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const companyOwner = yield client_1.default.companyOwner.findUnique({
        where: { id },
        include: {
            tenant: {
                include: {
                    branches: true,
                },
            },
        },
    });
    return companyOwner;
});
exports.getCompanyOwnerByIdService = getCompanyOwnerByIdService;
const createCompanyOwnerService = (data, avatar) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, phone, isDeleted, telegramUsername, tenantId, password, } = data;
    const img = yield (0, uploadImage_1.default)(avatar, "avatars");
    const companyOwner = yield client_1.default.companyOwner.create({
        data: {
            firstName,
            lastName,
            email,
            phone,
            avatar: img,
            tenantId: Number(tenantId),
            isDeleted,
            telegramUsername,
            password: password,
        },
    });
    return companyOwner;
});
exports.createCompanyOwnerService = createCompanyOwnerService;
const updateCompanyOwnerImageService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const companyOwner = yield client_1.default.companyOwner.findUnique({
        where: { id: id },
        select: { avatar: true },
    });
    console.log(id, data);
    if (companyOwner === null || companyOwner === void 0 ? void 0 : companyOwner.avatar) {
        yield (0, removeImage_1.default)(companyOwner === null || companyOwner === void 0 ? void 0 : companyOwner.avatar).then((res) => __awaiter(void 0, void 0, void 0, function* () { }));
    }
    const newLogo = yield (0, uploadImage_1.default)(data, "avatars");
    return yield client_1.default.companyOwner.update({
        where: { id: id },
        data: {
            avatar: newLogo,
        },
    });
});
exports.updateCompanyOwnerImageService = updateCompanyOwnerImageService;
const updateCompanyOwnerService = (data, companyOwnerId) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, phone, role, avatar, branchId, isDeleted, password, telegramUsername, tenantId, } = data;
    const updatedCompanyOwner = yield client_1.default.companyOwner.update({
        where: { id: Number(companyOwnerId) },
        data: {
            firstName,
            lastName,
            email,
            phone,
            role,
            avatar,
            tenantId,
            isDeleted,
            password,
            telegramUsername,
        },
    });
    return updatedCompanyOwner;
});
exports.updateCompanyOwnerService = updateCompanyOwnerService;
const deleteCompanyOwnerService = (companyOwnerId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedAdmin = yield client_1.default.companyOwner.delete({
        where: { id: companyOwnerId },
    });
    return deletedAdmin;
});
exports.deleteCompanyOwnerService = deleteCompanyOwnerService;
