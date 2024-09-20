import { Router } from "express";
import LeadController from "../controllers/leadController";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = Router();

/**
 * @route   POST /leads
 * @desc    Create a new lead
 * @access  COMPANY_OWNER, ADMIN
 */
router.post(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  LeadController.createLead
);

/**
 * @route   GET /leads
 * @desc    Get all leads
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  LeadController.getLeads
);

/**
 * @route   GET /leads/:id
 * @desc    Get a specific lead by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  LeadController.getLeadById
);

/**
 * @route   PATCH /leads/:id
 * @desc    Update a lead by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.patch(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  LeadController.updateLead
);

/**
 * @route   DELETE /leads/:id
 * @desc    Delete a lead by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  LeadController.deleteLead
);

export default router;
