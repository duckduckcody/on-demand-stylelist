/** convert non numbers to undefined instead of NaN */
export const safeParseStringToInt = (
  string: string | string[]
): number | undefined => {
  const parsed = Number(string);
  if (isNaN(parsed)) return undefined;
  return parsed;
};
