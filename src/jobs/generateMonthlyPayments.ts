import cron from "node-cron";
import prisma from "../prisma/client";
import { createMonthlyPayment } from "../services/studentPaymentService";

// Run this on the 1st day of every month
// Extracted function to process payments
export const processMonthlyPayments = async (
  branchId: number | null = null
) => {
  const students = branchId
    ? await prisma.student.findMany({
        where: { isDeleted: false, branchId: branchId },
        include: { groups: true },
      })
    : await prisma.student.findMany({
        where: { isDeleted: false },
        include: { groups: true },
      });

  for (const student of students) {
    for (const group of student.groups) {
      const monthlyFee = group.price || 0;
      const dueDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ); // End of the month

      await createMonthlyPayment(
        student.id,
        group.id,
        monthlyFee,
        dueDate,
        branchId
      );
    }
  }

  console.log("Monthly payments have been processed.");
};

// Schedule the cron job to run on the 1st of every month
cron.schedule(
  "0 0 1 * *",
  async () => {
    await processMonthlyPayments();
  },
  {
    timezone: "Asia/Tashkent",
  }
);
