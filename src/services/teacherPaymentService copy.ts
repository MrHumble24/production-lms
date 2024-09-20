import prisma from "../prisma/client";

// Fetch all teacher payments
export const getAllTeacherPayments = async () => {
  return await prisma.teacherPayment.findMany({
    include: {
      teacher: true,
      paidBy: true,
      branch: true,
    },
  });
};

// Fetch a single teacher payment by ID
export const getTeacherPaymentById = async (id: number) => {
  return await prisma.teacherPayment.findUnique({
    where: { id },
    include: {
      teacher: true,
      paidBy: true,
      branch: true,
    },
  });
};

// Create a new teacher payment
export const createTeacherPayment = async (data: any) => {
  const {
    dueDate,
    amount,
    branchId,
    paidById,
    teacherId,
    currency,
    description,
    method,
    status,
    paymentDate,
    groupId,
  } = data;
  return await prisma.teacherPayment.create({
    data: {
      dueDate: new Date(dueDate),
      amount,
      currency,
      description,
      method,
      status,
      branch: { connect: { id: Number(branchId) } },
      paidBy: { connect: { id: Number(paidById) } },
      teacher: { connect: { id: Number(teacherId) } },
      paymentDate: new Date(paymentDate),
      group: {
        connect: {
          id: groupId,
        },
      },
    },
  });
};

// Update an existing teacher payment
export const updateTeacherPayment = async (id: number, data: any) => {
  return await prisma.teacherPayment.update({
    where: { id },
    data,
  });
};

// Delete a teacher payment
export const deleteTeacherPayment = async (id: number) => {
  return await prisma.teacherPayment.delete({
    where: { id },
  });
};
