"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentGroupsHandler = exports.deleteStudent = exports.updateStudentImage = exports.updateStudentProfileController = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.removeStudentFromGroupHandler = exports.addStudentToGroupHandler = exports.getAllStudents = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const studentService_1 = require("../services/studentService");
// Get all students
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield (0, studentService_1.getAllStudentsService)();
        res.status(200).json(students);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch students" });
    }
});
exports.getAllStudents = getAllStudents;
const addStudentToGroupHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, groupId } = req.body;
    try {
        const result = yield (0, studentService_1.addStudentToGroup)(studentId, groupId);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.addStudentToGroupHandler = addStudentToGroupHandler;
const removeStudentFromGroupHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, groupId } = req.body;
    try {
        const result = yield (0, studentService_1.removeStudentFromGroup)(studentId, groupId);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.removeStudentFromGroupHandler = removeStudentFromGroupHandler;
// Get a single student by ID
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const student = yield client_1.default.student.findUnique({
            where: { id: Number(id), isDeleted: false },
            include: { groups: true },
        });
        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }
        res.status(200).json(student);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch student" });
    }
});
exports.getStudentById = getStudentById;
// Create a new student
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newStudent = yield (0, studentService_1.createStudentService)(req.body, req.file);
        res.status(201).json(newStudent);
    }
    catch (error) {
        console.log({ error, body: req.body });
        res.status(500).json(error);
    }
});
exports.createStudent = createStudent;
// Update a student by ID
const updateStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedStudent = yield (0, studentService_1.updateStudentService)(Number(id), req.body);
        res.status(200).json(updatedStudent);
    }
    catch (error) {
        next(error);
    }
});
exports.updateStudent = updateStudent;
const updateStudentProfileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateData = req.body;
        const { id } = req.params;
        // Call the service function to update the student's personal details
        const updatedStudent = yield (0, studentService_1.updateStudentPersonalData)(Number(id), updateData);
        return res.status(200).json(updatedStudent);
    }
    catch (error) {
        next(error);
    }
});
exports.updateStudentProfileController = updateStudentProfileController;
const updateStudentImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield (0, studentService_1.updateStudentImageService)(Number(req.params.id), req.file);
        res.status(200).json(student);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update student" });
    }
});
exports.updateStudentImage = updateStudentImage;
// Delete a student by ID
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, studentService_1.deleteStudentService)(Number(id));
        res.status(204).json({ message: "Student deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete student" });
    }
});
exports.deleteStudent = deleteStudent;
const getStudentGroupsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const groups = yield (0, studentService_1.getStudentGroups)(Number(id));
        res.status(200).json(groups);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getStudentGroupsHandler = getStudentGroupsHandler;
