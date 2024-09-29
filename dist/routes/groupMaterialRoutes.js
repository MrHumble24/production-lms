"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const groupMaterialsController_1 = require("../controllers/groupMaterialsController");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
/**
 * @route   POST /group-materials
 * @desc    Create new group material with an optional attachment
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.post("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), upload.array("attachments", 10), groupMaterialsController_1.createGroupMaterialController);
/**
 * @route   GET /group-materials
 * @desc    Get all group materials
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT
 */
router.get("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), groupMaterialsController_1.getGroupMaterialsController);
/**
 * @route   GET /group-materials/:id
 * @desc    Get group material by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT
 */
router.get("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), groupMaterialsController_1.getGroupMaterialByIdController);
/**
 * @route   PATCH /group-materials/:id
 * @desc    Update group material with an optional attachment
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.patch("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), upload.array("attachments", 10), groupMaterialsController_1.updateGroupMaterialController);
/**
 * @route   DELETE /group-materials/:id
 * @desc    Delete group material by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), groupMaterialsController_1.deleteGroupMaterialController);
exports.default = router;
