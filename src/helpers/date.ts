export enum Days {
  ODD_DAY = "ODD_DAY",
  EVEN_DAY = "EVEN_DAY",
  EVERY_DAY = "EVERY_DAY",
}

export const isSunday = (date: Date): boolean => date.getDay() === 0;
export const isOddDay = (date: Date): boolean => date.getDate() % 2 !== 0;
export const isEvenDay = (date: Date): boolean => date.getDate() % 2 === 0;
