import { Attendance } from "@prisma/client";

export const groupAttendancesByDate = (attendances: Attendance[]) => {
	return attendances.reduce((groups, attendance) => {
		const date = attendance.createdAt.toISOString().split("T")[0]; // Extract the date part
		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(attendance);
		return groups;
	}, {} as Record<string, Attendance[]>);
};
