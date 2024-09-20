import { PaymentMethod } from "@prisma/client";
import prisma from "../prisma/client";

export const getTeacherPaymentSuggestions = async (
  teacherId: number,
  month: number = new Date().getMonth() === 0 ? 12 : new Date().getMonth(), // Default to last month
  year: number = new Date().getMonth() === 0
    ? new Date().getFullYear() - 1
    : new Date().getFullYear() // Adjust year if last month is December
) => {
  try {
    const groups = await prisma.group.findMany({
      where: { teacherId },
      include: {
        students: {
          include: {
            StudentPayment: true,
          },
        },
        teacher: true,
      },
    });

    // Initialize the total suggested amount to 0
    let totalSuggestedAmount = 0;

    // Map over each group to calculate the payment suggestion
    const groupPaymentSuggestions = groups.map((group) => {
      // Filter payments specifically for this group, month, and year
      const paidStudents = group.students
        .filter((student) =>
          student.StudentPayment.some(
            (payment) =>
              payment.status === "PAID" &&
              payment.groupId === group.id && // Ensure the payment is for the current group
              new Date(payment.paymentDate).getMonth() + 1 === month &&
              new Date(payment.paymentDate).getFullYear() === year
          )
        )
        .map((student) => {
          // Get the paid amount for this group and month
          const payment = student.StudentPayment.find(
            (payment) =>
              payment.status === "PAID" &&
              payment.groupId === group.id && // Ensure it's for the current group
              new Date(payment.paymentDate).getMonth() + 1 === month &&
              new Date(payment.paymentDate).getFullYear() === year
          );
          return {
            id: student.id,
            name: `${student.firstName} ${student.lastName}`,
            email: student.email,
            phone: student.phone,
            paidAmount: payment?.amount || 0, // Add the paid amount here
          };
        });

      // Filter unpaid students: if there are no "PAID" payments for this group in the given month/year
      const unpaidStudents = group.students
        .filter((student) =>
          student.StudentPayment.some(
            (payment) =>
              payment.status !== "PAID" &&
              payment.groupId === group.id && // Ensure the payment is for the current group
              new Date(payment.paymentDate).getMonth() + 1 === month &&
              new Date(payment.paymentDate).getFullYear() === year
          )
        )
        .map((student) => {
          // Get the unpaid amount (optional if needed for unpaid students)
          const unpaidPayment = student.StudentPayment.find(
            (payment) =>
              payment.status !== "PAID" &&
              payment.groupId === group.id && // Ensure it's for the current group
              new Date(payment.paymentDate).getMonth() + 1 === month &&
              new Date(payment.paymentDate).getFullYear() === year
          );
          return {
            id: student.id,
            name: `${student.firstName} ${student.lastName}`,
            email: student.email,
            phone: student.phone,
            paidAmount: 0, // Since they are unpaid, set paidAmount to 0 or leave it out
          };
        });

      const totalAmount = (group?.price || 0) * paidStudents.length;
      const suggestedPayment = totalAmount * (group.teacher?.share || 0.35);

      totalSuggestedAmount += suggestedPayment;

      return {
        group: group.name,
        teacher: group.teacher,
        groupId: group.id,
        paidStudents,
        unpaidStudents,
        totalAmount, // Total amount collected from students in this group
        suggestedPayment, // Teacher's suggested payment for this group
        status: "PENDING", // Could dynamically change depending on payment status
        paymentDate: null, // This can be set when the accountant processes it
        dueDate: new Date(), // Current date, could be customized
        method: null, // Payment method can be added here in the future
        currency: "UZS", // Default currency, make it configurable
      };
    });

    // Return the suggestions for each group, the total suggested amount, and the month/year
    return {
      month, // The month for which the payment suggestion is calculated
      year, // The year for which the payment suggestion is calculated
      totalSuggestedAmount,
      groupPaymentSuggestions,
    };
  } catch (error) {
    console.error("Error fetching teacher payment suggestions:", error);
    throw new Error("Unable to fetch teacher payment suggestions");
  }
};

// Fetch teacher's payment history
export const getTeacherPaymentHistory = async (teacherId: number) => {
  return prisma.teacherPayment.findMany({
    where: { teacherId },
    include: {
      group: true,
      teacher: true,
    },
    orderBy: {
      paymentDate: "desc",
    },
  });
};

// Confirm teacher payment after review
export const confirmTeacherPayment = async (paymentId: number) => {
  return prisma.teacherPayment.update({
    where: { id: paymentId },
    data: {
      status: "PAID",
      paymentDate: new Date(),
    },
  });
};

// Notify accountants about pending payments
export const notifyAccountantsOfPendingPayments = async (teacherId: number) => {
  console.log(`Accountants notified for teacher ID ${teacherId}`);
  return { message: `Accountants notified for teacher ID ${teacherId}` };
};

// Fetch detailed information of a specific payment
export const getTeacherPaymentDetail = async (paymentId: number) => {
  return prisma.teacherPayment.findUnique({
    where: { id: paymentId },
    include: {
      group: true,
      teacher: true,
    },
  });
};

// This function will be used to confirm and pay the teacher
export const confirmAndPayTeacher = async (
  teacherId: number,
  paymentData: {
    groupId: number;
    confirmedAmount: number;
    method: "BANK_TRANSFER" | "ONLINE_TRANSFER" | "CASH" | "OTHER";
  } // The confirmed payment data for one group
) => {
  try {
    // Retrieve the group and teacher data from the database
    const group = await prisma.group.findUnique({
      where: { id: paymentData.groupId },
      include: {
        teacher: true,
      },
    });

    if (!group || group.teacherId !== teacherId) {
      throw new Error(
        `Group with ID ${paymentData.groupId} not found or does not belong to the teacher.`
      );
    }

    // Calculate the teacher's share based on the confirmed amount
    const teacherShare = paymentData.confirmedAmount;

    // Create the payment record for the group and teacher
    const paymentRecord = await prisma.teacherPayment.create({
      data: {
        teacherId: teacherId,
        groupId: paymentData.groupId,
        amount: teacherShare,
        method: paymentData.method, // Store the payment method (e.g., cash, bank transfer)
        paymentDate: new Date(), // Set the payment date as the current date
        status: "PAID", // Mark the payment as paid
      },
    });

    // Return the processed payment record
    return {
      success: true,
      message: "Payment confirmed and processed successfully.",
      payment: paymentRecord,
    };
  } catch (error) {
    console.error("Error confirming and paying teacher:", error);
    throw new Error("Unable to confirm and pay teacher.");
  }
};
