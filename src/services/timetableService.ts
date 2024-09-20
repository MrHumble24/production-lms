import prisma from "../prisma/client";

export const createGroupTimetable = async (
	groupId: number,
	timetableData: Array<{
		day: string;
		startTime: string;
		endTime: string;
		roomId: number;
		teacherId: number;
	}>
) => {
	const group = await prisma.group.findUnique({
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

	const createdTimetable = await prisma.timetable.createMany({
		data: timetableEntries,
	});

	return createdTimetable;
};
