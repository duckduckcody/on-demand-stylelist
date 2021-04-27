import { useEffect, useState } from 'react';

export interface ClotheInfo {
  images: string[];
  description: string;
  websitesLogo: string;
}

export const useClotheInfo = (
  clotheLink: string,
  isShowing: boolean
): ClotheInfo | undefined => {
  const [clotheInfo, setClotheInfo] = useState<ClotheInfo>();

  useEffect(() => {
    if (isShowing && !clotheInfo) {
      const fetchData = async () => {
        const result = await fetch(
          `/api/getClotheInfo?clotheLink=${clotheLink}`
        );
        const json = await result.json();
        setClotheInfo(json);
      };

      fetchData();
    }
  }, [clotheInfo, clotheLink, isShowing]);

  return clotheInfo;
};
