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
exports.createGroupTimetable = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const createGroupTimetable = (groupId, timetableData) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield client_1.default.group.findUnique({
        where: { id: groupId },
    });
    if (!group) {
        throw new Error("Group not found");
    }
    const timetableEntries = timetableData.map((entry) => ({
        day: entry.day,
        startTime: entry.startTime,
        endTime: entry.endTime,
        groupId,
        roomId: entry.roomId,
        teacherId: entry.teacherId,
    }));
    const createdTimetable = yield client_1.default.timetable.createMany({
        data: timetableEntries,
    });
    return createdTimetable;
});
exports.createGroupTimetable = createGroupTimetable;
