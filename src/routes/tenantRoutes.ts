import { Router } from "express";
import * as tenantController from "../controllers/tenantController";
import multer from "multer";
import { authorizeRoles } from "../middleware/roleMiddleware";

const upload = multer();
const router = Router();

/**
 * @route   POST /tenants
 * @desc    Create a new tenant with an optional logo upload
 * @access  COMPANY_OWNER, ADMIN
 * @params  Logo image upload (optional)
 */
router.post(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  upload.single("logo"),
  tenantController.createTenant
);

/**
 * @route   GET /tenants
 * @desc    Get all tenants
 * @access  COMPANY_OWNER, ADMIN
 */
router.get(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  tenantController.getAllTenants
);

/**
 * @route   GET /tenants/:tenantId
 * @desc    Get a tenant by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.get(
  "/:tenantId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  tenantController.getTenantById
);

/**
 * @route   PUT /tenants/:tenantId
 * @desc    Update a tenant's details with an optional logo upload
 * @access  COMPANY_OWNER, ADMIN
 * @params  Logo image upload (optional)
 */
router.put(
  "/:tenantId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  upload.single("logo"),
  tenantController.updateTenant
);

/**
 * @route   PUT /tenants/:tenantId/logo
 * @desc    Update a tenant's logo
 * @access  COMPANY_OWNER, ADMIN
 * @params  Logo image upload (required)
 */
router.put(
  "/:tenantId/logo",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  upload.single("logo"),
  tenantController.updateTenantLogo
);

/**
 * @route   DELETE /tenants/:tenantId
 * @desc    Delete a tenant by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete(
  "/:tenantId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN"]),
  tenantController.deleteTenant
);

export default router;
