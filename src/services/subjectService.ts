import prisma from "../prisma/client";

// Create a new subject
export const createSubject = async (data: {
  name: string;
  description?: string;
  branchId?: string;
}) => {
  console.log(data);
  return await prisma.subject.create({
    data: {
      name: data.name,
      description: data.description,
      branch: {
        connect: {
          id: Number(data.branchId),
        },
      },
    },
  });
};

// Get all subjects
export const getAllSubjects = async (branchId: number) => {
  return await prisma.subject.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

// Get a single subject by ID
export const getSubjectById = async (subjectId: number) => {
  return await prisma.subject.findUnique({
    where: { id: subjectId },
    include: { teachers: true }, // Include related teachers
  });
};

// Update a subject
export const updateSubject = async (
  subjectId: number,
  data: { name?: string; description?: string }
) => {
  return await prisma.subject.update({
    where: { id: subjectId },
    data,
  });
};

// Delete a subject by ID
export const deleteSubject = async (subjectId: number) => {
  return await prisma.subject.delete({
    where: { id: subjectId },
  });
};

// Add a teacher to a subject
export const addTeacherToSubject = async (
  subjectId: number,
  teacherId: number
) => {
  return await prisma.subject.update({
    where: { id: subjectId },
    data: {
      teachers: {
        connect: { id: teacherId },
      },
    },
  });
};

// Remove a teacher from a subject
export const removeTeacherFromSubject = async (
  subjectId: number,
  teacherId: number
) => {
  return await prisma.subject.update({
    where: { id: subjectId },
    data: {
      teachers: {
        disconnect: { id: teacherId },
      },
    },
  });
};
