"use strict";
// controllers/groupMaterialController.ts
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
exports.deleteGroupMaterialController = exports.updateGroupMaterialController = exports.getGroupMaterialByIdController = exports.getGroupMaterialsController = exports.createGroupMaterialController = void 0;
const groupMaterialService_1 = require("../services/groupMaterialService");
const createGroupMaterialController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const material = yield (0, groupMaterialService_1.createGroupMaterial)(data, req);
        res.status(201).json(material);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create group material" });
    }
});
exports.createGroupMaterialController = createGroupMaterialController;
const getGroupMaterialsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const materials = yield (0, groupMaterialService_1.getGroupMaterials)();
        res.status(200).json(materials);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve group materials" });
    }
});
exports.getGroupMaterialsController = getGroupMaterialsController;
const getGroupMaterialByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const material = yield (0, groupMaterialService_1.getGroupMaterialById)(Number(id));
        if (!material) {
            return res.status(404).json({ error: "Group material not found" });
        }
        res.status(200).json(material);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve group material" });
    }
});
exports.getGroupMaterialByIdController = getGroupMaterialByIdController;
const updateGroupMaterialController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedMaterial = yield (0, groupMaterialService_1.updateGroupMaterial)(Object.assign(Object.assign({}, data), { id }), req);
        res.status(200).json(updatedMaterial);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update group material" });
    }
});
exports.updateGroupMaterialController = updateGroupMaterialController;
const deleteGroupMaterialController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, groupMaterialService_1.deleteGroupMaterial)(Number(id));
        res.status(204).send(); // No Content
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete group material" });
    }
});
exports.deleteGroupMaterialController = deleteGroupMaterialController;
