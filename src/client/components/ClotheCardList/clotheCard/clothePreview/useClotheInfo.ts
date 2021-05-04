import { useEffect, useState } from 'react';
import { ClotheInfo } from '../../../../../types/ClotheInfo';

interface FetchedClotheInfo extends ClotheInfo {
  message?: string;
}

export const useClotheInfo = (
  clotheLink: string,
  isShowing: boolean
): { error: boolean; clotheInfo: FetchedClotheInfo | undefined } => {
  const [clotheInfo, setClotheInfo] = useState<ClotheInfo>();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isShowing && !clotheInfo) {
      const fetchData = async () => {
        const result = await fetch(
          `/api/getClotheInfo?clotheLink=${encodeURIComponent(clotheLink)}`
        );
        console.log('result', result);
        if (!result.ok) setError(true);
        const json = await result.json();
        setClotheInfo(json);
      };

      fetchData();
    }
  }, [clotheInfo, clotheLink, isShowing]);

  return { error, clotheInfo };
};
