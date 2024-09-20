import prisma from "../prisma/client";

/**
 * Retrieves all groups from the database, optionally filtering by branch ID.
 * @param all - A boolean indicating whether to retrieve all groups or only those not marked as deleted.
 * @param branchId - The ID of the branch for which to retrieve groups.
 * @returns A promise that resolves to an array of group objects, including related students, teacher, timetables, and subject data.
 */
export const getAllGroupsService = async (all: boolean, branchId: number) => {
  if (all) {
    return await prisma.group.findMany({
      include: {
        students: true,
        teacher: true,
        timetables: true,
        subject: true,
      },
    });
  } else {
    return await prisma.group.findMany({
      include: {
        students: true,
        teacher: true,
        timetables: true,
        subject: true,
      },
      where: { isDeleted: false },
    });
  }
};

/**
 * Retrieves a group by its ID from the database.
 * @param id - The ID of the group to retrieve.
 * @returns A promise that resolves to the group object, including related students, teacher, timetables, and subject data, or null if not found.
 */
export const getGroupByIdService = async (id: number) => {
  return await prisma.group.findUnique({
    where: { id },
    include: {
      students: true,
      teacher: true,
      timetables: true,
      subject: true,
    },
  });
};

/**
 * Creates a new group in the database.
 * @param body - The data for the new group, including name, capacity, teacherId, subjectId, and description.
 * @returns A promise that resolves to the created group object.
 */
export const createGroupService = async (body: any) => {
  const { name, capacity, teacherId, subjectId, description, branchId, price } =
    body;
  return await prisma.group.create({
    data: {
      name,
      capacity,
      description,
      branch: { connect: { id: branchId } },
      teacher: teacherId ? { connect: { id: teacherId } } : undefined,
      subject: subjectId ? { connect: { id: subjectId } } : undefined,
      price: Number(price),
    },
  });
};

/**
 * Updates an existing group in the database.
 * @param id - The ID of the group to update.
 * @param body - The updated data for the group, including name, capacity, teacherId, subjectId, and description.
 * @returns A promise that resolves to the updated group object.
 */
export const updateGroupService = async (id: number, body: any) => {
  const { name, capacity, teacherId, subjectId, description, days, price } =
    body;
  return await prisma.group.update({
    where: { id },
    data: {
      name,
      capacity,
      description,
      days,
      teacher: teacherId ? { connect: { id: teacherId } } : undefined,
      subject: subjectId ? { connect: { id: subjectId } } : undefined,
      price: Number(price),
    },
  });
};

/**
 * Updates the capacity of a specific group.
 * @param groupId - The ID of the group to update.
 * @param newCapacity - The new capacity value for the group.
 * @returns A promise that resolves to the updated group object.
 * @throws An error if the group is not found.
 */
export const updateGroupCapacity = async (
  groupId: number,
  newCapacity: number
) => {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
  });

  if (!group) {
    throw new Error("Group not found");
  }

  const updatedGroup = await prisma.group.update({
    where: { id: groupId },
    data: { capacity: newCapacity },
  });

  return updatedGroup;
};

/**
 * Deletes a group from the database permanently.
 * @param groupId - The ID of the group to delete.
 * @returns A promise that resolves to the deleted group object.
 */
export const deleteGroupHard = async (groupId: number) => {
  return await prisma.group.delete({
    where: { id: groupId },
  });
};

/**
 * Removes a student from a group.
 * @param studentId - The ID of the student to remove.
 * @param groupId - The ID of the group from which to remove the student.
 * @returns A promise that resolves to a success message if the operation is successful.
 * @throws An error if the group or student is not found or if the student is not in the group.
 */
export const removeStudentFromGroup = async (
  studentId: number,
  groupId: number
) => {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: { students: true },
  });

  if (!group) {
    throw new Error("Group not found");
  }

  const isStudentInGroup = group.students.some(
    (student) => student.id === studentId
  );

  if (!isStudentInGroup) {
    throw new Error("Student is not in this group");
  }

  await prisma.$transaction([
    prisma.student.update({
      where: { id: studentId },
      data: {
        groups: {
          disconnect: { id: groupId },
        },
      },
    }),
  ]);

  return { message: "Student removed from group successfully" };
};

/**
 * Reassigns a teacher to a group, checking for timetable conflicts.
 * @param groupId - The ID of the group to reassign.
 * @param newTeacherId - The ID of the new teacher to assign to the group.
 * @returns A promise that resolves to the updated group object.
 * @throws An error if the group or teacher is not found or if there is a timetable conflict.
 */
export const reassignTeacherToGroup = async (
  groupId: number,
  newTeacherId: number
) => {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: { timetables: true },
  });

  if (!group) {
    throw new Error("Group not found");
  }

  const teacher = await prisma.teacher.findUnique({
    where: { id: newTeacherId },
    include: { timetables: true },
  });

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  // Check for timetable conflicts
  const hasConflict = teacher.timetables.some((teacherTimetable) =>
    group.timetables.some(
      (groupTimetable) =>
        teacherTimetable.day === groupTimetable.day &&
        ((teacherTimetable.startTime >= groupTimetable.startTime &&
          teacherTimetable.startTime < groupTimetable.endTime) ||
          (groupTimetable.startTime >= teacherTimetable.startTime &&
            groupTimetable.startTime < teacherTimetable.endTime))
    )
  );

  if (hasConflict) {
    throw new Error("The new teacher has a timetable conflict with this group");
  }

  // Reassign the teacher
  const updatedGroup = await prisma.group.update({
    where: { id: groupId },
    data: { teacherId: newTeacherId },
  });

  return updatedGroup;
};

/**
 * Retrieves the timetable for a specific group.
 * @param groupId - The ID of the group for which to retrieve the timetable.
 * @returns A promise that resolves to the group's timetable.
 * @throws An error if the group is not found.
 */
export const getGroupTimetable = async (groupId: number) => {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: { timetables: true },
  });

  if (!group) {
    throw new Error("Group not found");
  }

  return group.timetables;
};

/**
 * Retrieves all students in a specific group.
 * @param groupId - The ID of the group for which to retrieve students.
 * @returns A promise that resolves to an array of students in the group.
 */
export const getGroupStudents = async (groupId: number) => {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: { students: true },
  });

  if (!group) {
    throw new Error("Group not found");
  }

  return group;
};

/**
 * Soft deletes a group by marking it as deleted and disconnecting related entities.
 * @param groupId - The ID of the group to soft delete.
 * @returns A promise that resolves to the updated group object.
 * @throws An error if the group is not found.
 */
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
        updateMany: {
          where: { groupId },
          data: {
            isDeleted: true, // Set groupId to null to disconnect the group
          },
        }, // Delete all associated timetables
      },
      students: {
        disconnect: group.students.map((student) => ({ id: student.id })), // Disconnect all students
      },
    },
  });

  return updatedGroup;
};

export const getGroupStudentsService = async (groupId: number) => {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: { students: true },
  });

  console.log({ group });
  if (!group?.students) {
    throw new Error("Group not found");
  }

  return group.students;
};
