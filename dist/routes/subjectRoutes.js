"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subjectController_1 = require("../controllers/subjectController");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
/**
 * @route   POST /subjects
 * @desc    Create a new subject
 * @access  COMPANY_OWNER, ADMIN
 */
router.post("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), subjectController_1.createSubjectHandler);
/**
 * @route   GET /subjects
 * @desc    Get all subjects
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get("/", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), subjectController_1.getAllSubjectsHandler);
/**
 * @route   GET /subjects/:id
 * @desc    Get subject details by ID
 * @access  COMPANY_OWNER, ADMIN, TEACHER
 */
router.get("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN", "TEACHER"]), subjectController_1.getSubjectByIdHandler);
/**
 * @route   PUT /subjects/:id
 * @desc    Update a subject by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.put("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), subjectController_1.updateSubjectHandler);
/**
 * @route   DELETE /subjects/:id
 * @desc    Delete a subject by ID
 * @access  COMPANY_OWNER, ADMIN
 */
router.delete("/:id", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), subjectController_1.deleteSubjectHandler);
/**
 * @route   POST /subjects/add-teacher
 * @desc    Assign a teacher to a subject
 * @access  COMPANY_OWNER, ADMIN
 */
router.post("/add-teacher", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), subjectController_1.addTeacherToSubjectHandler);
/**
 * @route   POST /subjects/remove-teacher
 * @desc    Remove a teacher from a subject
 * @access  COMPANY_OWNER, ADMIN
 */
router.post("/remove-teacher", (0, roleMiddleware_1.authorizeRoles)(["COMPANY_OWNER", "ADMIN"]), subjectController_1.removeTeacherFromSubjectHandler);
exports.default = router;
