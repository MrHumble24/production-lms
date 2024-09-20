import { Days, isEvenDay, isOddDay, isSunday } from "./date";

export function calculateProratedFee(
  fullMonthlyFee: number,
  enrollmentDate: Date,
  groupDays: Days
): number {
  const totalDaysInMonth = new Date(
    enrollmentDate.getFullYear(),
    enrollmentDate.getMonth() + 1,
    0
  ).getDate();
  let remainingLessonDays = 0;

  for (let day = enrollmentDate.getDate(); day <= totalDaysInMonth; day++) {
    const currentDate = new Date(
      enrollmentDate.getFullYear(),
      enrollmentDate.getMonth(),
      day
    );

    // Skip Sundays
    if (isSunday(currentDate)) continue;

    // Count only valid lesson days based on groupDays (ODD_DAY, EVEN_DAY, EVERY_DAY)
    if (
      (groupDays === Days.ODD_DAY && isOddDay(currentDate)) ||
      (groupDays === Days.EVEN_DAY && isEvenDay(currentDate)) ||
      groupDays === Days.EVERY_DAY
    ) {
      remainingLessonDays++;
    }
  }

  // Prorated fee based on remaining lesson days
  const proratedFee = (fullMonthlyFee * remainingLessonDays) / totalDaysInMonth;
  return proratedFee;
}
