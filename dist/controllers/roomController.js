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
exports.deleteRoom = exports.updateRoom = exports.createRoom = exports.getRoomById = exports.getAllRooms = void 0;
const roomService_1 = require("../services/roomService");
// Get all rooms
const getAllRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield (0, roomService_1.getAllRoomsService)(Number(req.headers["branch-id"]));
        res.status(200).json(rooms);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch rooms" });
    }
});
exports.getAllRooms = getAllRooms;
// Get a single room by ID
const getRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const room = yield (0, roomService_1.getRoomByIdService)(Number(id));
        if (!room) {
            res.status(404).json({ error: "Room not found" });
            return;
        }
        res.status(200).json(room);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch room" });
    }
});
exports.getRoomById = getRoomById;
// Create a new room
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { number, capacity, branchId } = req.body;
    console.log(number, capacity, branchId);
    try {
        const newRoom = yield (0, roomService_1.createRoomService)(number, capacity, branchId);
        res.status(201).json(newRoom);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create room" });
    }
});
exports.createRoom = createRoom;
// Update a room by ID
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { number, capacity, branchId } = req.body;
    try {
        const updatedRoom = yield (0, roomService_1.updateRoomService)(Number(id), number, capacity, branchId);
        res.status(200).json(updatedRoom);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update room" });
    }
});
exports.updateRoom = updateRoom;
// Delete a room by ID
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedRoom = yield (0, roomService_1.deleteRoomService)(Number(id));
        res.status(204).json({ message: "Room deleted", data: deletedRoom });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete room" });
    }
});
exports.deleteRoom = deleteRoom;
