import { Router } from "express";
import multer from "multer";
import {
  createGroupMaterialController,
  getGroupMaterialsController,
  getGroupMaterialByIdController,
  updateGroupMaterialController,
  deleteGroupMaterialController,
} from "../controllers/groupMaterialsController";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = Router();
const upload = multer();

/**
 * @route   POST /group-materials
 * @desc    Create new group material with an optional attachment
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.post(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  upload.array("attachments", 10),

  createGroupMaterialController
);

/**
 * @route   GET /group-materials
 * @desc    Get all group materials
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT
 */
router.get(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  getGroupMaterialsController
);

/**
 * @route   GET /group-materials/:id
 * @desc    Get group material by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER, STUDENT
 */
router.get(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  getGroupMaterialByIdController
);

/**
 * @route   PATCH /group-materials/:id
 * @desc    Update group material with an optional attachment
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.patch(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  upload.array("attachments", 10),
  updateGroupMaterialController
);

/**
 * @route   DELETE /group-materials/:id
 * @desc    Delete group material by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  deleteGroupMaterialController
);

export default router;
