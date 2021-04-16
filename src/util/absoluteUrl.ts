export const absoluteUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  if (url[0] === '/' && url[1] === '/') {
    return url.replace('//', 'https://');
  }
  return url;
};
