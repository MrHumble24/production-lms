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
exports.deleteCompanyOwner = exports.updateCompanyOwnerImage = exports.updateCompanyOwner = exports.createCompanyOwner = exports.getCompanyOwnerById = exports.getAllCompanyOwners = void 0;
const companyOwnerService_1 = require("../services/companyOwnerService");
// Get all admins
const getAllCompanyOwners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyOwners = yield (0, companyOwnerService_1.getAllCompanyOwnerService)();
        console.log(companyOwners);
        res.status(200).json(companyOwners);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch companyOwners" });
    }
});
exports.getAllCompanyOwners = getAllCompanyOwners;
// Get a single CompanyOwner by ID
const getCompanyOwnerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const companyOwner = yield (0, companyOwnerService_1.getCompanyOwnerByIdService)(Number(id));
        res.status(200).json(companyOwner);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch CompanyOwner" });
    }
});
exports.getCompanyOwnerById = getCompanyOwnerById;
const createCompanyOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCompanyOwner = yield (0, companyOwnerService_1.createCompanyOwnerService)(req.body, req.file);
        res.status(201).json(newCompanyOwner);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create Company Owner" });
    }
});
exports.createCompanyOwner = createCompanyOwner;
const updateCompanyOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedCompanyOwner = yield (0, companyOwnerService_1.updateCompanyOwnerService)(req.body, id);
        if (!updatedCompanyOwner) {
            res.status(404).json({ error: "CompanyOwner not found" });
        }
        res.status(200).json(updatedCompanyOwner);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update Company Owner" });
    }
});
exports.updateCompanyOwner = updateCompanyOwner;
const updateCompanyOwnerImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyOwner = yield (0, companyOwnerService_1.updateCompanyOwnerImageService)(Number(req.params.id), req.file);
        res.status(200).json(companyOwner);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update tenant" });
    }
});
exports.updateCompanyOwnerImage = updateCompanyOwnerImage;
// Delete an Company Owner by ID
const deleteCompanyOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedCompanyOwner = (0, companyOwnerService_1.deleteCompanyOwnerService)(Number(id));
        res
            .status(204)
            .json({ message: "CompanyOwner deleted", data: deletedCompanyOwner });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete Company Owner" });
    }
});
exports.deleteCompanyOwner = deleteCompanyOwner;
