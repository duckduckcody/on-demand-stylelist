import { flatten } from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useSWRInfinite } from 'swr';
import { ClotheCardList } from '../src/client/components/ClotheCardList/ClotheCardList';
import {
  DEFAULT_LIMIT,
  LIMIT_OPTIONS,
  LocalStorageKey,
} from '../src/client/constants';
import { useSelectedWebsites } from '../src/client/hooks/useSelectedWebsites';
import { useUpdateUrl } from '../src/client/hooks/useUpdateUrl';
import { useWindow } from '../src/client/hooks/useWindow';
import { capitaliseString } from '../src/client/util/capitaliseString';
import { FetcherError, swrFetcher } from '../src/client/util/swrFetcher';
import { ClotheItem } from '../src/types/ClotheItem';

const makeUrl = (
  searchQuery: string | undefined,
  index: number,
  selectedWebsites: string,
  limit: number | undefined
) => {
  if (!searchQuery || !limit) {
    console.log('return null', searchQuery, limit);
    return null;
  }
  return `/api/search?query=${searchQuery}&page=${
    index + 1
  }&selectedWebsites=${selectedWebsites}&limit=${limit}`;
};

export default function Search(): ReactElement {
  const router = useRouter();
  const window = useWindow();
  const selectedWebsites = useSelectedWebsites();
  const [limit, setLimit] = useState<number | undefined>(undefined);
  const url = useMemo(() => window && new URL(window.location.href), [window]);
  const { q } = router.query;

  useUpdateUrl(limit, LocalStorageKey.Limit, url, router.replace, true);

  useEffect(() => {
    setLimit(DEFAULT_LIMIT);
  }, []);

  const changeLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setLimit(+event.target.value);
  };

  const { data, error, size, setSize } = useSWRInfinite<
    ClotheItem[],
    FetcherError
  >((index) => makeUrl(`${q}`, index, selectedWebsites, limit), swrFetcher, {
    revalidateOnFocus: false,
  });

  const clothes = flatten(data);
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = !isLoadingInitialData && clothes.length === 0;
  const isEndOfData =
    data &&
    typeof limit !== 'undefined' &&
    data[data.length - 1]?.length < limit;

  return (
    <>
      <Head>
        <title>{capitaliseString(`Stylelist${q ? `| ${q}` : ''}`)}</title>
      </Head>

      <p>Search for: {q}</p>

      <span>
        <label htmlFor='limit'>Product limit per website&nbsp;</label>
        <select value={limit} onChange={changeLimit}>
          {LIMIT_OPTIONS.map((limitOption) => (
            <option key={limitOption} value={limitOption}>
              {limitOption}
            </option>
          ))}
        </select>
      </span>

      <ClotheCardList
        clothes={clothes}
        favourites={[]}
        onFavouriteClick={() => undefined}
      />

      <p>{isLoadingMore && `Fetching styles...`}</p>
      <button onClick={() => setSize(size + 1)} disabled={isLoadingMore}>
        Load more
      </button>
    </>
  );
}
