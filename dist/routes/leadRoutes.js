"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leadController_1 = __importDefault(require("../controllers/leadController"));
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
/**
 * @route   POST /leads
 * @desc    Create a new lead
 * @access  COMPANY_OWNER, ADMIN
 */
router.post("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), leadController_1.default.createLead);
/**
 * @route   GET /leads
 * @desc    Get all leads
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), leadController_1.default.getLeads);
/**
 * @route   GET /leads/:id
 * @desc    Get a specific lead by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), leadController_1.default.getLeadById);
/**
 * @route   PATCH /leads/:id
 * @desc    Update a lead by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.patch("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), leadController_1.default.updateLead);
/**
 * @route   DELETE /leads/:id
 * @desc    Delete a lead by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), leadController_1.default.deleteLead);
exports.default = router;
