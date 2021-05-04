export const parseToEnumValue = <T>(
  value: unknown,
  enumValues: string[]
): T | undefined => {
  if (enumValues.includes(`${value}`)) return value as T;
  return undefined;
};
