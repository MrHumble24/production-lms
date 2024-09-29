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
exports.createGroupTimetableHandler = exports.deleteTimetable = exports.updateTimetable = exports.createTimetable = exports.getTimetableById = exports.getAllTimetables = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const timetableService_1 = require("../services/timetableService");
// Get all timetables
const getAllTimetables = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const timetables = yield client_1.default.timetable.findMany({
            include: {
                group: {
                    include: {
                        students: true,
                        subject: true,
                    },
                },
                room: true,
                teacher: true,
            },
            orderBy: {
                startTime: "asc",
            },
            where: { isDeleted: false },
        });
        res.status(200).json(timetables);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch timetables" });
    }
});
exports.getAllTimetables = getAllTimetables;
// Get a single timetable by ID
const getTimetableById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const timetable = yield client_1.default.timetable.findUnique({
            where: { id: Number(id) },
            include: { group: true, room: true, teacher: true },
        });
        if (!timetable) {
            res.status(404).json({ error: "Timetable not found" });
            return;
        }
        res.status(200).json(timetable);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch timetable" });
    }
});
exports.getTimetableById = getTimetableById;
// Create a new timetable
const createTimetable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { day, startTime, endTime, groupId, roomId, teacherId, branchId } = req.body;
    console.log(req.body);
    try {
        const newTimetable = yield client_1.default.timetable.create({
            data: {
                day,
                startTime,
                endTime,
                group: { connect: { id: groupId } },
                room: { connect: { id: roomId } },
                teacher: { connect: { id: teacherId } },
                branch: { connect: { id: Number(branchId) } },
            },
        });
        res.status(201).json(newTimetable);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create timetable" });
    }
});
exports.createTimetable = createTimetable;
// Update a timetable by ID
const updateTimetable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { day, startTime, endTime, groupId, roomId, teacherId, isChangingTeacher, } = req.body;
    try {
        if (isChangingTeacher) {
            const updatedTimetable = yield client_1.default.timetable.update({
                where: { id: Number(id) },
                data: {
                    teacher: { connect: { id: teacherId } },
                },
            });
            res.status(200).json(updatedTimetable);
        }
        else {
            const updatedTimetable = yield client_1.default.timetable.update({
                where: { id: Number(id) },
                data: {
                    day,
                    startTime,
                    endTime,
                    group: { connect: { id: groupId } },
                    room: { connect: { id: roomId } },
                    teacher: { connect: { id: teacherId } },
                },
            });
            res.status(200).json(updatedTimetable);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update timetable" });
    }
});
exports.updateTimetable = updateTimetable;
// Delete a timetable by ID
const deleteTimetable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield client_1.default.timetable.delete({
            where: { id: Number(id) },
        });
        res.status(204).json({ message: "Timetable deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete timetable" });
    }
});
exports.deleteTimetable = deleteTimetable;
const createGroupTimetableHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId, timetableData } = req.body;
    try {
        const result = yield (0, timetableService_1.createGroupTimetable)(groupId, timetableData);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.createGroupTimetableHandler = createGroupTimetableHandler;
