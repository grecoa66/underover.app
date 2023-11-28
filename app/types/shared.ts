/**
 * A generic function to check if a string is a value
 * of an enum.
 * @param value - check if this string is in the enum
 * @param e - the enum to check
 * @returns - boolean
 */
export const isEnumValue = <T extends { [k: string]: string }>(
  value: any,
  e: T,
): value is T[keyof T] =>
  typeof value === "string" && Object.values(e).includes(value);
