export const parsePrice = (
  priceString: string | null | undefined
): number | null => {
  if (!priceString) return null;
  return parseFloat(priceString.replace('$', '').trim());
};
