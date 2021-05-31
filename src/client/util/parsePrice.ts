export const parsePrice = (
  priceString: string | null | undefined
): number | undefined => {
  if (!priceString) return undefined;
  return parseFloat(priceString.replace('$', '').replace(',', '').trim());
};
