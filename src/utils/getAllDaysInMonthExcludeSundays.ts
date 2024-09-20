export function getAllDaysInMonthExcludeSundays(
  year: number,
  month: number
): { evenDays: number[]; oddDays: number[]; daysInMonth: number } {
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get total days in the month
  const evenDays: number[] = [];
  const oddDays: number[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);

    if (date.getDay() === 0) {
      continue; // Skip Sundays
    }

    const dayNumber = date.getDate();

    if (dayNumber % 2 === 0) {
      evenDays.push(dayNumber);
    } else {
      oddDays.push(dayNumber);
    }
  }

  return { evenDays, oddDays, daysInMonth };
}
