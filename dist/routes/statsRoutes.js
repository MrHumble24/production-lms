"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statsController_1 = require("../controllers/statsController");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
/**
 * @route   GET /stats/:branchId
 * @desc    Get statistical data for a specific branch
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get("/:branchId", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), statsController_1.getStats);
exports.default = router;
