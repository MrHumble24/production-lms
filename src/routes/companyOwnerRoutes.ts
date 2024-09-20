import { Router } from "express";
import multer from "multer";
import {
  createCompanyOwner,
  deleteCompanyOwner,
  getAllCompanyOwners,
  getCompanyOwnerById,
  updateCompanyOwner,
  updateCompanyOwnerImage,
} from "../controllers/companyOwnerController";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = Router();
const upload = multer();

/**
 * @route   GET /company-owners
 * @desc    Get all company owners
 * @access  ADMIN, COMPANY_OWNER
 */
router.get(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  getAllCompanyOwners
);

/**
 * @route   GET /company-owners/:id
 * @desc    Get a company owner by ID
 * @access  ADMIN, COMPANY_OWNER
 */
router.get(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  getCompanyOwnerById
);

/**
 * @route   POST /company-owners
 * @desc    Create a new company owner with an optional avatar upload
 * @access  ADMIN, COMPANY_OWNER
 */
router.post(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  upload.single("avatar"),
  createCompanyOwner
);

/**
 * @route   PUT /company-owners/:id
 * @desc    Update a company owner by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.put(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  updateCompanyOwner
);

/**
 * @route   PUT /company-owners/:id/image
 * @desc    Update the company owner's avatar by ID
 * @access  COMPANY_OWNER, ADMIN
 * @params  Avatar image upload (optional)
 */
router.put(
  "/:id/image",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  upload.single("avatar"),
  updateCompanyOwnerImage
);

/**
 * @route   DELETE /company-owners/:id
 * @desc    Delete a company owner by ID
 * @access  ADMIN, COMPANY_OWNER
 */
router.delete(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  deleteCompanyOwner
);

export default router;
