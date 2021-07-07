import { flatten } from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { useSWRInfinite } from 'swr';
import { ListClotheCards } from '../src/client/components/List/ListClotheCards/ListClotheCards';
import { ListLoadMoreButton } from '../src/client/components/List/ListLoadMoreButton/ListLoadMoreButton';
import { ListOptionsHeader } from '../src/client/components/List/ListOptionsHeader/ListOptionsHeader';
import { DEFAULT_LIMIT } from '../src/client/constants';
import { useFavourites } from '../src/client/hooks/useFavourites';
import { useSelectedWebsites } from '../src/client/hooks/useSelectedWebsites';
import { FetcherError } from '../src/client/util/swrFetcher';
import { swrSelectedWebsitesFetcher } from '../src/client/util/swrSelectedWebsitesFetcher';
import { ClotheItem } from '../src/types/ClotheItem';

const makeUrl = (
  searchQuery: string | string[] | undefined,
  index: number,
  selectedWebsites: string[] | undefined,
  limit: number | undefined
): string[] | null => {
  if (!searchQuery || !limit || !selectedWebsites) return null;

  const url = `/api/search?query=${searchQuery}&page=${
    index + 1
  }&limit=${limit}`;
  console.log('webbys', selectedWebsites);

  return [url, JSON.stringify(selectedWebsites)];
};

export default function Search(): ReactElement {
  const router = useRouter();
  const { selectedWebsites } = useSelectedWebsites();
  const { favourites, setFavourite } = useFavourites();

  const { q } = router.query;
  const [limit, setLimit] = useState<number | undefined>(undefined);

  const onChangeLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setLimit(+event.target.value);
  };

  const { data, error, size, setSize } = useSWRInfinite<
    ClotheItem[],
    FetcherError
  >(
    (index) => makeUrl(q, index, selectedWebsites, limit),
    swrSelectedWebsitesFetcher,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    setLimit(DEFAULT_LIMIT);
  }, []);

  const clothes = flatten(data);

  return (
    <>
      <Head>
        <title>Stylelist | Search</title>
      </Head>

      <ListOptionsHeader
        context={`Search for: ${q}`}
        limit={limit}
        onChangeLimit={onChangeLimit}
      />

      <ListClotheCards
        clothes={clothes}
        favourites={favourites}
        onFavouriteClick={setFavourite}
      />

      <ListLoadMoreButton
        clothes={clothes}
        data={data}
        limit={limit}
        size={size}
        setSize={setSize}
        error={error}
        isEmptyMessage={`No styles found for: ${q} :(`}
      />
    </>
  );
}
