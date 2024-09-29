import { Gender, Prisma, Student, Timetable } from "@prisma/client";
import deleteImageFromSupabase from "../helpers/removeImage";
import uploadImageToSupabase from "../helpers/uploadImage";
import prisma from "../prisma/client";
import { toNumberArray } from "../utils/toNumberArray";

/**
 * Retrieves all students from the database.
 * @returns A promise that resolves to an array of Student objects.
 */
export const getAllStudentsService = async (): Promise<Student[]> => {
  return await prisma.student.findMany({
    include: { groups: true },
    orderBy: { firstName: "asc" },
    where: { isDeleted: false },
  });
};

/**
 * Retrieves a student by ID.
 * @param id - The ID of the student to retrieve.
 * @returns A promise that resolves to a Student object if found, otherwise null.
 */
export const getStudentByIdService = async (
  id: number
): Promise<Student | null> => {
  return await prisma.student.findUnique({
    where: { id, isDeleted: false },
    include: { groups: true },
  });
};

/**
 * Updates a student's information by ID and handles timetable conflicts.
 * @param id - The ID of the student to update.
 * @param data - The updated student data.
 * @returns A promise that resolves to the updated Student object.
 */
export const updateStudentService = async (
  id: number,
  data: any
): Promise<Student> => {
  const {
    firstName,
    lastName,
    email,
    phone,
    enrollmentDate,
    groupIds,
    avatar,
    bio,
    branchId,
    gender,
    password,
    telegramUsername,
  } = data;

  const studentPrevData = await prisma.student.findUnique({
    where: { id },
    include: { groups: { select: { id: true, name: true, timetables: true } } },
  });

  if (!studentPrevData) {
    throw new Error(`Student with ID ${id} not found`);
  }

  const prevGroupIds = studentPrevData.groups.map((group) => group.id);
  const newGroupIds = toNumberArray(groupIds) || [];
  const hasGroupChange =
    newGroupIds.length !== prevGroupIds.length ||
    !newGroupIds.every((id: number) => prevGroupIds.includes(id));

  if (hasGroupChange) {
    const newGroupTimetables = await prisma.group.findMany({
      where: { id: { in: newGroupIds } },
      include: { timetables: { include: { group: true } } },
    });

    const conflictingTimetables: string[] = [];

    studentPrevData.groups.forEach((existingGroup) => {
      existingGroup.timetables.forEach((studentTimetable: Timetable) => {
        newGroupTimetables.forEach((newGroup) => {
          if (existingGroup.id === newGroup.id) return;

          newGroup.timetables.forEach((newTimetable) => {
            const isSameDay = studentTimetable.day === newTimetable.day;
            const isTimeConflict =
              (studentTimetable.startTime >= newTimetable.startTime &&
                studentTimetable.startTime < newTimetable.endTime) ||
              (newTimetable.startTime >= studentTimetable.startTime &&
                newTimetable.startTime < studentTimetable.endTime);

            if (isSameDay && isTimeConflict) {
              conflictingTimetables.push(
                `Conflict on ${studentTimetable.day} between ` +
                  `Existing Group: ${existingGroup.name} (${studentTimetable.startTime}-${studentTimetable.endTime}) ` +
                  `and New Group: ${newGroup.name} (${newTimetable.startTime}-${newTimetable.endTime})`
              );
            }
          });
        });
      });
    });

    if (conflictingTimetables.length > 0) {
      const error = new Error("Timetable conflicts detected");
      (error as any).details = conflictingTimetables;
      throw error;
    }

    await prisma.$transaction(async (tx) => {
      await tx.student.update({
        where: { id },
        data: {
          firstName,
          lastName,
          email,
          phone,
          enrollmentDate,
          avatar,
          bio,
          branchId,
          gender,
          password,
          telegramUsername,
        },
      });

      for (const grID of newGroupIds) {
        if (!prevGroupIds.includes(grID)) {
          await addStudentToGroup(id, grID);
        }
      }

      for (const grID of prevGroupIds) {
        if (!newGroupIds.includes(grID)) {
          await removeStudentFromGroup(id, grID);
        }
      }
    });
  } else {
    await prisma.student.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        phone,
        enrollmentDate,
        avatar,
        bio,
        branchId,
        gender,
        password,
        telegramUsername,
      },
    });
  }

  return prisma.student.findUnique({
    where: { id },
  }) as Promise<Student>;
};

interface UpdateStudentData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  gender?: Gender;
  telegramUsername?: string;
}
/**
 * Updates a student's information by ID and handles timetable conflicts.
 * @param id - The ID of the student to update.
 * @param data - The updated student data.
 * @returns A promise that resolves to the updated Student object.
 */
export const updateStudentPersonalData = async (
  id: number,
  data: UpdateStudentData
) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    avatar,
    bio,
    gender,
    telegramUsername,
  } = data;

  // Fetch the current student data, including related groups
  const existingStudent = await prisma.student.findUnique({
    where: { id },
    include: { groups: true, attendances: true, Submission: true },
  });

  if (!existingStudent) {
    throw new Error("Student not found");
  }

  // Prepare the data for updating, excluding groups
  const updateData: Partial<UpdateStudentData> = {
    firstName,
    lastName,
    email,
    phone,
    avatar,
    bio,
    gender,
    telegramUsername,
  };

  // Update the student, while preserving the groups
  const updatedStudent = await prisma.student.update({
    where: { id },
    data: {
      ...updateData,
      groups: {
        set: existingStudent.groups.map((group) => ({ id: group.id })), // Preserve existing groups
      },
      Submission: {
        set: existingStudent.Submission.map((submission) => ({
          id: submission.id,
        })),
      },
      attendances: {
        set: existingStudent.attendances.map((attendance) => ({
          id: attendance.id,
        })),
      },
    },
  });

  return updatedStudent;
};

/**
 * Creates a new student in the database.
 * @param data - The data for creating a new student.
 * @param file - The uploaded file object for the student's avatar.
 * @returns A promise that resolves to the newly created Student object.
 */
export const createStudentService = async (
  data: any,
  file: Express.Multer.File | undefined
): Promise<Student> => {
  const { firstName, lastName, email, phone, enrollmentDate, groupIds } = data;

  const avatarUrl = await uploadImageToSupabase(file, "avatars");
  const groups = toNumberArray(groupIds);

  return await prisma.student.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      enrollmentDate,
      avatar: avatarUrl,
      groups: groups
        ? {
            connect: groups.map((groupId) => ({ id: groupId })),
          }
        : undefined,
      branchId: Number(data.branchId),
      telegramUsername: data.telegramUsername,
      password: data.password,
      bio: data.bio,
    },
  });
};

/**
 * Deletes a student by ID.
 * @param id - The ID of the student to delete.
 * @returns A promise that resolves when the student is deleted.
 */
export const deleteStudentService = async (id: number): Promise<void> => {
  const studentPrevData = await prisma.student.findUnique({
    where: { id },
    select: { avatar: true },
  });

  await deleteImageFromSupabase(studentPrevData?.avatar);

  await prisma.student.delete({
    where: { id },
  });
};

/**
 * Adds a student to a group, checking for timetable conflicts.
 * @param studentId - The student's ID.
 * @param groupId - The group's ID.
 */
export const addStudentToGroup = async (studentId: number, groupId: number) => {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: { timetables: true },
  });

  if (!group) {
    throw new Error("Group not found");
  }

  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: { groups: { include: { timetables: true } } },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  const hasConflict = student.groups.some((existingGroup) =>
    existingGroup.timetables.some((studentTimetable) =>
      group.timetables.some(
        (groupTimetable) =>
          studentTimetable.day === groupTimetable.day &&
          ((studentTimetable.startTime >= groupTimetable.startTime &&
            studentTimetable.startTime < groupTimetable.endTime) ||
            (groupTimetable.startTime >= studentTimetable.startTime &&
              groupTimetable.startTime < studentTimetable.endTime))
      )
    )
  );

  if (hasConflict) {
    throw new Error("Student has a timetable conflict with this group");
  }

  await prisma.student.update({
    where: { id: studentId },
    data: {
      groups: {
        connect: { id: groupId },
      },
    },
  });

  return { message: "Student added to group successfully" };
};

/**
 * Removes a student from a group.
 * @param studentId - The student's ID.
 * @param groupId - The group's ID.
 */
export const removeStudentFromGroup = async (
  studentId: number,
  groupId: number
) => {
  await prisma.student.update({
    where: { id: studentId },
    data: {
      groups: {
        disconnect: { id: groupId },
      },
    },
  });

  return { message: "Student removed from group successfully" };
};

/**
 * Retrieves all groups that a student is part of.
 * @param studentId - The student's ID.
 * @returns A promise that resolves to the groups the student belongs to.
 */
export const getStudentGroups = async (studentId: number) => {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    include: {
      groups: {
        include: {
          students: true,
          tasks: { include: { group: true } },
          timetables: true,
          GroupMaterial: { include: { group: true } },
          GroupNotification: true,
          teacher: true,
          Attendance: {
            where: { studentId: Number(studentId) },
            include: {
              student: true,
              group: true,
            },
          },
        },
      },
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  return student.groups;
};

/**
 * Updates a student's avatar.
 * @param studentId - The student's ID.
 * @param data - The new avatar data.
 * @returns A promise that resolves to the updated Student object.
 */
export const updateStudentImageService = async (
  studentId: number,
  data: any | undefined
): Promise<Student | null> => {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: { avatar: true },
  });

  if (student?.avatar) {
    await deleteImageFromSupabase(student.avatar);
  }

  const newAvatar = await uploadImageToSupabase(data, "avatars");

  return await prisma.student.update({
    where: { id: studentId },
    data: {
      avatar: newAvatar,
    },
  });
};
