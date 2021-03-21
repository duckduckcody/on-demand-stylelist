export const absoluteUrl = (url: string): string => {
  if (url[0] === "/" && url[1] === "/") {
    return url.replace("//", "https://");
  }
  return url;
};
