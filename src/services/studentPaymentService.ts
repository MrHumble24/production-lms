import moment from "moment";
import prisma from "../prisma/client";
import { connect } from "http2";

export const createStudentPayment = async (data: any) => {
  const {
    amount,
    paymentDate,
    dueDate,
    method,
    status,
    description,
    currency,
    paidById,
    studentId,
    branchId,
    groupId,
  } = data;

  return await prisma.studentPayment.create({
    data: {
      amount,
      paymentDate: new Date(paymentDate),
      dueDate: new Date(dueDate),
      method,
      status,
      description,
      currency,
      paidBy: {
        connect: {
          id: Number(paidById),
        },
      },
      student: {
        connect: {
          id: Number(studentId),
        },
      },
      branch: {
        connect: {
          id: Number(branchId),
        },
      },
      group: {
        connect: {
          id: Number(groupId),
        },
      },
    },
  });
};
export const updateStudentPayment = async (id: number, data: any) => {
  const {
    amount,
    paymentDate,
    dueDate,
    method,
    status,
    description,
    currency,
  } = data;

  return await prisma.studentPayment.update({
    where: { id: Number(id) },
    data: {
      amount,
      paymentDate: new Date(paymentDate),
      dueDate: new Date(dueDate),
      method,
      status,
      description,
      currency,
    },
  });
};

export const deleteStudentPayment = async (id: number) => {
  return await prisma.studentPayment.delete({
    where: { id: Number(id) },
  });
};

export const getStudentPaymentById = async (id: number) => {
  return await prisma.studentPayment.findUnique({
    where: { id: Number(id) },
  });
};

export const getAllStudentPayments = async () => {
  return await prisma.studentPayment.findMany();
};
export const getStudentPayments = async (studentID: string) => {
  return await prisma.studentPayment.findMany({
    where: { studentId: Number(studentID) },
    include: {
      student: true,
      branch: true,
      group: true,
    },
  });
};

export const createMonthlyPayment = async (
  studentId: number,
  groupId: number,
  fullMonthlyFee: number,
  dueDate: Date,
  branchId: number | null
) => {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: { prepaidBalance: true },
  });

  console.log({ branchId });
  if (!student) {
    throw new Error("Student not found");
  }

  // Check if the student has enough prepaid balance to cover the fee
  if (student.prepaidBalance >= fullMonthlyFee) {
    // Deduct from prepaid balance and mark as PAID
    await prisma.student.update({
      where: { id: studentId },
      data: { prepaidBalance: { decrement: fullMonthlyFee } },
    });

    await prisma.studentPayment.create({
      data: {
        amount: fullMonthlyFee,
        status: "PAID",
        paymentDate: new Date(),
        dueDate: dueDate,
        studentId: studentId,
        groupId: groupId,
        branchId: branchId,
      },
    });
  } else {
    // If prepaid balance is insufficient, create a NOT_PAID payment
    await prisma.studentPayment.create({
      data: {
        amount: fullMonthlyFee,
        status: "NOT_PAID",
        dueDate: dueDate,
        studentId: studentId,
        groupId: groupId,
        branchId: branchId,
      },
    });
  }
};

export const handlePrepayment = async (studentId: number, amount: number) => {
  await prisma.student.update({
    where: { id: studentId },
    data: { prepaidBalance: { increment: amount } },
  });

  return { message: `Prepayment of ${amount} added to student's balance.` };
};

export const getDebtors = async () => {
  const overduePayments = await prisma.studentPayment.findMany({
    where: {
      status: "NOT_PAID",
      dueDate: { lt: new Date() },
    },
    include: {
      student: true,
      group: true,
    },
  });

  return overduePayments.map((payment) => ({
    student: `${payment.student.firstName} ${payment.student.lastName}`,
    group: payment.group.name,
    amount: payment.amount,
    dueDate: payment.dueDate,
  }));
};

export const notifyDebtors = async () => {
  const debtors = await getDebtors();

  debtors.forEach((debtor) => {
    console.log(
      `Notification: Student ${debtor.student} owes ${debtor.amount} for ${debtor.group}. Due date: ${debtor.dueDate}`
    );
    // Here, you could integrate an email or SMS notification service.
  });
};

export const getStudentPaymentHistory = async (studentId: number) => {
  const payments = await prisma.studentPayment.findMany({
    where: { studentId },
    include: { group: true, student: true, branch: true, paidBy: true },
    orderBy: { dueDate: "desc" },
  });

  return payments.map((payment) => ({
    student: payment.student,
    prepaidBalance: payment.student.prepaidBalance,
    branchId: payment.branch?.id,
    group: payment.group.name,
    groupPrice: payment.group.price,
    amount: payment.amount,
    status: payment.status,
    paymentDate: moment(payment.paymentDate).format("ll"),
    dueDate: moment(payment.dueDate).format("ll"),
    method: payment.method,
    description: payment.description,
    currency: payment.currency,
    paidBy: payment.paidBy,
    paidById: payment.paidById,
    id: payment.id,
    createdAt: moment(payment.createdAt).format("ll"),
    updatedAt: payment.updatedAt,
  }));
};

/**
 * Handles a student's prepayment by updating their prepaidBalance.
 * @param studentId - The ID of the student making the prepayment.
 * @param amount - The amount of the prepayment.
 * @returns A message indicating success.
 */
export const createPrepayment = async (
  studentId: number,
  amount: number
): Promise<{ message: string }> => {
  // Fetch the student by ID
  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  // Increment the student's prepaid balance
  await prisma.student.update({
    where: { id: studentId },
    data: {
      prepaidBalance: {
        increment: amount, // Add the prepayment amount to the student's balance
      },
    },
  });

  return {
    message: `Prepayment of ${amount} added to student's prepaid balance.`,
  };
};
