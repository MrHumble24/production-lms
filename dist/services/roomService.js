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
exports.deleteRoomService = exports.updateRoomService = exports.createRoomService = exports.getRoomByIdService = exports.getAllRoomsService = void 0;
// src/services/roomService.ts
const client_1 = __importDefault(require("../prisma/client"));
/**
 * Retrieves all rooms from the database for a specific branch.
 * @param branchId - The ID of the branch to filter rooms by.
 * @returns A promise that resolves to an array of Room objects.
 */
const getAllRoomsService = (branchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.room.findMany({
        include: { timetables: true, branch: true },
        orderBy: {
            number: "asc",
        },
    });
});
exports.getAllRoomsService = getAllRoomsService;
/**
 * Retrieves a room by its ID.
 * @param id - The ID of the room to retrieve.
 * @returns A promise that resolves to a Room object if found, otherwise null.
 */
const getRoomByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.room.findUnique({
        where: { id },
        include: { timetables: true },
    });
});
exports.getRoomByIdService = getRoomByIdService;
/**
 * Creates a new room in the database.
 * @param number - The room number.
 * @param capacity - The capacity of the room.
 * @param branchId - The ID of the branch to filter rooms by.
 * @returns A promise that resolves to the newly created Room object.
 */
const createRoomService = (number, capacity, branchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.room.create({
        data: {
            number,
            capacity,
            branchId: Number(branchId),
        },
    });
});
exports.createRoomService = createRoomService;
/**
 * Updates a room by its ID.
 * @param id - The ID of the room to update.
 * @param number - The new room number.
 * @param capacity - The new capacity of the room.
 * @returns A promise that resolves to the updated Room object.
 */
const updateRoomService = (id, number, capacity, branchId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.room.update({
        where: { id },
        data: {
            number,
            capacity,
        },
    });
});
exports.updateRoomService = updateRoomService;
/**
 * Deletes a room by its ID.
 * @param id - The ID of the room to delete.
 * @returns A promise that resolves when the room is deleted.
 */
const deleteRoomService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedRoom = yield client_1.default.room.delete({
        where: { id },
    });
    return deletedRoom;
});
exports.deleteRoomService = deleteRoomService;
