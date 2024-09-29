"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const companyOwnerController_1 = require("../controllers/companyOwnerController");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
/**
 * @route   GET /company-owners
 * @desc    Get all company owners
 * @access  ADMIN, COMPANY_OWNER
 */
router.get("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), companyOwnerController_1.getAllCompanyOwners);
/**
 * @route   GET /company-owners/:id
 * @desc    Get a company owner by ID
 * @access  ADMIN, COMPANY_OWNER
 */
router.get("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), companyOwnerController_1.getCompanyOwnerById);
/**
 * @route   POST /company-owners
 * @desc    Create a new company owner with an optional avatar upload
 * @access  ADMIN, COMPANY_OWNER
 */
router.post("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), upload.single("avatar"), companyOwnerController_1.createCompanyOwner);
/**
 * @route   PUT /company-owners/:id
 * @desc    Update a company owner by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.put("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), companyOwnerController_1.updateCompanyOwner);
/**
 * @route   PUT /company-owners/:id/image
 * @desc    Update the company owner's avatar by ID
 * @access  COMPANY_OWNER, ADMIN
 * @params  Avatar image upload (optional)
 */
router.put("/:id/image", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), upload.single("avatar"), companyOwnerController_1.updateCompanyOwnerImage);
/**
 * @route   DELETE /company-owners/:id
 * @desc    Delete a company owner by ID
 * @access  ADMIN, COMPANY_OWNER
 */
router.delete("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), companyOwnerController_1.deleteCompanyOwner);
exports.default = router;
