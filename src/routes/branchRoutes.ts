import { Router } from "express";
import * as branchController from "../controllers/branchController";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = Router();

/**
 * @route   POST /branches
 * @desc    Create a new branch
 * @access  COMPANY_OWNER, ADMIN
 */
router.post(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  branchController.createBranch
);

/**
 * @route   GET /branches
 * @desc    Get all branches
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  branchController.getAllBranches
);

/**
 * @route   GET /branches/company/:companyId
 * @desc    Get all branches for a specific company
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get(
  "/company/:companyId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  branchController.getCompanyBranches
);

/**
 * @route   GET /branches/:branchId
 * @desc    Get a single branch by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get(
  "/:branchId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  branchController.getBranchById
);

/**
 * @route   PUT /branches/:branchId
 * @desc    Update a branch by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.put(
  "/:branchId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  branchController.updateBranch
);

/**
 * @route   DELETE /branches/:branchId
 * @desc    Delete a branch by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete(
  "/:branchId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  branchController.deleteBranch
);

export default router;
