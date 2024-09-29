"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roomController_1 = require("../controllers/roomController");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
/**
 * @route   GET /rooms
 * @desc    Get all rooms
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER", "STUDENT"]), roomController_1.getAllRooms);
/**
 * @route   GET /rooms/:id
 * @desc    Get room details by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), roomController_1.getRoomById);
/**
 * @route   POST /rooms
 * @desc    Create a new room
 * @access  COMPANY_OWNER, ADMIN
 */
router.post("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), roomController_1.createRoom);
/**
 * @route   PATCH /rooms/:id
 * @desc    Update room details by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.patch("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), roomController_1.updateRoom);
/**
 * @route   DELETE /rooms/:id
 * @desc    Delete a room by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), roomController_1.deleteRoom);
exports.default = router;
