export const cultureKingsDescriptionFormatter = (description: string): string =>
  description.split(' - ').join('<br />- ');
