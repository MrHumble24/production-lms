import { Teacher } from "@prisma/client";
import prisma from "../prisma/client";
import deleteImageFromSupabase from "../helpers/removeImage";
import uploadImageToSupabase from "../helpers/uploadImage";

export const deleteTeacherService = async (teacherId: number) => {
  // Check if the teacher exists
  const teacher = await prisma.teacher.findUnique({
    where: { id: teacherId },
  });

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  // Begin a transaction to ensure data consistency
  await prisma.$transaction(async (prisma) => {
    // Soft delete the teacher by setting isDeleted to true
    await prisma.teacher.delete({
      where: { id: teacherId },
    });

    // Set teacherId to null for all related groups
    await prisma.group.updateMany({
      where: { teacherId: teacherId },
      data: { teacherId: null },
    });

    // Set teacherId to null for all related timetables
    await prisma.timetable.updateMany({
      where: { teacherId: teacherId },
      data: { teacherId: null },
    });
  });

  return {
    message: "Teacher soft deleted successfully and related records updated",
  };
};
export const softDeleteGroup = async (groupId: number) => {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: { students: true, teacher: true },
  });

  if (!group) {
    throw new Error("Group not found");
  }

  const updatedGroup = await prisma.group.update({
    where: { id: groupId },
    data: {
      isDeleted: true,
      teacherId: null, // Set teacherId to null to disconnect the teacher
      timetables: {
        deleteMany: {}, // Delete all associated timetables
      },
      students: {
        disconnect: group.students.map((student) => ({ id: student.id })), // Disconnect all students
      },
    },
  });

  return updatedGroup;
};

export const updateTeacherImageService = async (
  teacherId: number,
  data: any | undefined
): Promise<Teacher | null> => {
  const teacher = await prisma.teacher.findUnique({
    where: { id: teacherId },
    select: { avatar: true },
  });

  if (teacher?.avatar) {
    await deleteImageFromSupabase(teacher?.avatar).then(async (res) => {});
  }

  const newLogo = await uploadImageToSupabase(data, "avatars");
  return await prisma.teacher.update({
    where: { id: teacherId },
    data: {
      avatar: newLogo,
    },
  });
};
