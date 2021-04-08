import { UrlObject } from 'node:url';
import { useEffect } from 'react';

type RouterReplace = (
  url: UrlObject,
  as?: UrlObject,
  options?: {
    shallow?: boolean;
    locale?: string | false;
    scroll?: boolean;
  }
) => Promise<boolean>;

export const useUpdateUrl = (
  value: unknown | undefined,
  valueKey: string,
  url: URL | undefined,
  routerReplace: RouterReplace,
  saveToLocalStorage = false
): void =>
  useEffect(() => {
    if (value && url && url.searchParams.get(valueKey) !== `${value}`) {
      url.searchParams.set(valueKey, `${value}`);
      routerReplace(url, url, { scroll: false, shallow: true });
      saveToLocalStorage && window?.localStorage.setItem(valueKey, `${value}`);
    }
  }, [
    value,
    valueKey,
    routerReplace,
    url,
    url?.href,
    url?.searchParams,
    saveToLocalStorage,
  ]);
