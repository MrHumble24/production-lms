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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTeacherFromSubjectHandler = exports.addTeacherToSubjectHandler = exports.deleteSubjectHandler = exports.updateSubjectHandler = exports.getSubjectByIdHandler = exports.getAllSubjectsHandler = exports.createSubjectHandler = void 0;
const subjectService_1 = require("../services/subjectService");
// Create a new subject
const createSubjectHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, branchId } = req.body;
    console.log({ name, description, branchId });
    try {
        const newSubject = yield (0, subjectService_1.createSubject)({ name, description, branchId });
        res.status(201).json(newSubject);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create subject" });
    }
});
exports.createSubjectHandler = createSubjectHandler;
// Get all subjects
const getAllSubjectsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const branchId = req.headers["branch-id"];
    try {
        const subjects = yield (0, subjectService_1.getAllSubjects)(Number(branchId));
        res.status(200).json(subjects);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch subjects" });
    }
});
exports.getAllSubjectsHandler = getAllSubjectsHandler;
// Get a single subject by ID
const getSubjectByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const subject = yield (0, subjectService_1.getSubjectById)(Number(id));
        if (!subject) {
            res.status(404).json({ error: "Subject not found" });
            return;
        }
        res.status(200).json(subject);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch subject" });
    }
});
exports.getSubjectByIdHandler = getSubjectByIdHandler;
// Update a subject by ID
const updateSubjectHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedSubject = yield (0, subjectService_1.updateSubject)(Number(id), {
            name,
            description,
        });
        res.status(200).json(updatedSubject);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update subject" });
    }
});
exports.updateSubjectHandler = updateSubjectHandler;
// Delete a subject by ID
const deleteSubjectHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, subjectService_1.deleteSubject)(Number(id));
        res.status(204).json({ message: "Subject deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete subject" });
    }
});
exports.deleteSubjectHandler = deleteSubjectHandler;
// Add a teacher to a subject
const addTeacherToSubjectHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId, teacherId } = req.body;
    try {
        const updatedSubject = yield (0, subjectService_1.addTeacherToSubject)(Number(subjectId), Number(teacherId));
        res.status(200).json(updatedSubject);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to add teacher to subject" });
    }
});
exports.addTeacherToSubjectHandler = addTeacherToSubjectHandler;
// Remove a teacher from a subject
const removeTeacherFromSubjectHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId, teacherId } = req.body;
    try {
        const updatedSubject = yield (0, subjectService_1.removeTeacherFromSubject)(Number(subjectId), Number(teacherId));
        res.status(200).json(updatedSubject);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to remove teacher from subject" });
    }
});
exports.removeTeacherFromSubjectHandler = removeTeacherFromSubjectHandler;
