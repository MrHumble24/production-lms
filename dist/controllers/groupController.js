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
exports.getGroupStudentsHandler = exports.getGroupTimetableHandler = exports.reassignTeacherToGroupHandler = exports.updateGroupCapacityHandler = exports.removeStudentFromGroupHandler = exports.deleteGroup = exports.updateGroup = exports.createGroup = exports.getGroupById = exports.getAllGroups = void 0;
const groupService_1 = require("../services/groupService");
const getAllGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const all = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.all) || false;
        const branchId = req.headers["branch-id"];
        const groups = (yield (0, groupService_1.getAllGroupsService)(all, Number(branchId))).map((group) => {
            const currentSize = group.students.length;
            return Object.assign(Object.assign({}, group), { currentSize });
        });
        if (!groups) {
            res.status(404).json({ error: "No groups found" });
            return;
        }
        res.status(200).json(groups);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch groups" });
    }
});
exports.getAllGroups = getAllGroups;
const getGroupById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const group = yield (0, groupService_1.getGroupByIdService)(Number(id));
        const currentSize = (group === null || group === void 0 ? void 0 : group.students.length) || 0;
        if (!group) {
            res.status(404).json({ error: "Group not found" });
            return;
        }
        res.status(200).json(Object.assign(Object.assign({}, group), { currentSize }));
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch group" });
    }
});
exports.getGroupById = getGroupById;
// Create a new group
const createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const newGroup = yield (0, groupService_1.createGroupService)(body);
        res.status(201).json(newGroup);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create group" });
    }
});
exports.createGroup = createGroup;
// Update a group by ID
const updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedGroup = yield (0, groupService_1.updateGroupService)(Number(id), req.body);
        res.status(200).json(updatedGroup);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update group" });
    }
});
exports.updateGroup = updateGroup;
// Delete a group by ID
const deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groupId = Number(req.params.id);
        const deletedGroup = yield (0, groupService_1.deleteGroupHard)(Number(groupId));
        if (!deletedGroup) {
            res.status(404).json({ message: "Group not found" });
        }
        res.status(200).json({ message: "Group soft deleted successfully" });
    }
    catch (error) {
        console.log({ par: req.params.id, body: req.body, error });
        res.status(500).json(error);
    }
});
exports.deleteGroup = deleteGroup;
const removeStudentFromGroupHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, groupId } = req.body;
    try {
        const result = yield (0, groupService_1.removeStudentFromGroup)(studentId, groupId);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.removeStudentFromGroupHandler = removeStudentFromGroupHandler;
const updateGroupCapacityHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId, newCapacity } = req.body;
    try {
        const updatedGroup = yield (0, groupService_1.updateGroupCapacity)(groupId, newCapacity);
        res.status(200).json(updatedGroup);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.updateGroupCapacityHandler = updateGroupCapacityHandler;
const reassignTeacherToGroupHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId, newTeacherId } = req.body;
    try {
        const updatedGroup = yield (0, groupService_1.reassignTeacherToGroup)(groupId, newTeacherId);
        res.status(200).json(updatedGroup);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.reassignTeacherToGroupHandler = reassignTeacherToGroupHandler;
const getGroupTimetableHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const timetables = yield (0, groupService_1.getGroupTimetable)(Number(id));
        res.status(200).json(timetables);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getGroupTimetableHandler = getGroupTimetableHandler;
const getGroupStudentsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield (0, groupService_1.getGroupStudentsService)(Number(req.params.id));
        res.status(200).json(students);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch group" });
    }
});
exports.getGroupStudentsHandler = getGroupStudentsHandler;
