import prisma from "../prisma/client";

export const getTotalTeachers = async (branchId: string) => {
  return await prisma.teacher.count({
    where: {
      branchId: Number(branchId),
    },
  });
};

export const getTotalStudents = async (branchId: string) => {
  return await prisma.student.count({
    where: {
      branchId: Number(branchId),
    },
  });
};

export const getTotalGroups = async (branchId: string) => {
  return await prisma.group.count({
    where: {
      branchId: Number(branchId),
    },
  });
};

export const getTotalSubjects = async (branchId: string) => {
  return await prisma.subject.count({
    where: {
      branchId: Number(branchId),
    },
  });
};

export const getTotalTimetables = async (branchId: string) => {
  return await prisma.timetable.count({
    where: {
      branchId: Number(branchId),
    },
  });
};

export const getTotalRooms = async (branchId: string) => {
  return await prisma.room.count({
    where: {
      branchId: Number(branchId),
    },
  });
};

export const getTotalAttendanceRecords = async (branchId: string) => {
  return await prisma.attendance.count({
    where: {
      branchId: Number(branchId),
    },
  });
};

export const getAttendanceStatusBreakdown = async (branchId: string) => {
  return await prisma.attendance.groupBy({
    by: ["status"],
    where: {
      branchId: Number(branchId),
    },
    _count: {
      status: true,
    },
  });
};

export const getGroupProgressBreakdown = async (branchId: string) => {
  return await prisma.group.groupBy({
    by: ["progress"],
    where: {
      branchId: Number(branchId),
    },
    _count: {
      progress: true,
    },
  });
};
