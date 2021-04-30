export const cultureKingsDescriptionFormatter = (
  description: string
): string => {
  console.log('got here');
  return description.split('-').join('<br />-');
};
