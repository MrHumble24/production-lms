import { Router } from "express";
import {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = Router();

/**
 * @route   GET /rooms
 * @desc    Get all rooms
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get(
  "/",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]),
  getAllRooms
);

/**
 * @route   GET /rooms/:id
 * @desc    Get room details by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get(
  "/:id",
  authorizeRoles(["COMPANY_OWNER", "ADMIN", "TEACHER"]),
  getRoomById
);

/**
 * @route   POST /rooms
 * @desc    Create a new room
 * @access  COMPANY_OWNER, ADMIN
 */
router.post("/", authorizeRoles(["COMPANY_OWNER", "ADMIN"]), createRoom);

/**
 * @route   PATCH /rooms/:id
 * @desc    Update room details by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.patch("/:id", authorizeRoles(["COMPANY_OWNER", "ADMIN"]), updateRoom);

/**
 * @route   DELETE /rooms/:id
 * @desc    Delete a room by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete("/:id", authorizeRoles(["COMPANY_OWNER", "ADMIN"]), deleteRoom);

export default router;
