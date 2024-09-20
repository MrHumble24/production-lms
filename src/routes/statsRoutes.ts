import { Router } from "express";
import { getStats } from "../controllers/statsController";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = Router();

/**
 * @route   GET /stats/:branchId
 * @desc    Get statistical data for a specific branch
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get(
  "/:branchId",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  getStats
);

export default router;
