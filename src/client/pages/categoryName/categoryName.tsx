import { flatten } from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSWRInfinite } from 'swr';
import { ClotheItem } from '../../../types/ClotheItem';
import {
  ClotheSortOption,
  parseClotheSortOption,
} from '../../../types/ClotheSort';
import { ListClotheCards } from '../../components/List/ListClotheCards/ListClotheCards';
import { ListLoadMoreButton } from '../../components/List/ListLoadMoreButton/ListLoadMoreButton';
import { ListOptionsHeader } from '../../components/List/ListOptionsHeader/ListOptionsHeader';
import { DEFAULT_LIMIT, LIMIT_OPTIONS, LocalStorageKey } from '../../constants';
import { useFavourites } from '../../hooks/useFavourites';
import { usePromiseMapProgress } from '../../hooks/usePromiseMapProgress';
import { useSelectedWebsites } from '../../hooks/useSelectedWebsites';
import { useUpdateUrl } from '../../hooks/useUpdateUrl';
import { useWindow } from '../../hooks/useWindow';
import { capitaliseString } from '../../util/capitaliseString';
import { FetcherError } from '../../util/swrFetcher';
import { swrSelectedWebsitesFetcher } from '../../util/swrSelectedWebsitesFetcher';
import { makeUrl } from './makeUrl';

export interface QueryParams {
  gender?: string;
  categoryName?: string;
  page?: string;
  limit?: string;
}

export const CategoryName = (): ReactElement => {
  const {
    query,
    replace: routerReplace,
    push: routerPush,
    isReady: routerIsReady,
  } = useRouter();

  const window = useWindow();
  const hydratedFromQueryParams = useRef(false);
  const { selectedWebsites } = useSelectedWebsites();
  const { favourites, setFavourite } = useFavourites();

  const {
    requestHasBeenMade,
    requestHasCompleted,
    requestProgressComplete,
    percentageOfRequestsCompleted,
  } = usePromiseMapProgress();

  const [limit, setLimit] = useState<number | undefined>(undefined);
  const [clotheSortOption, setClotheSortOption] = useState<
    ClotheSortOption | undefined
  >(undefined);
  const url = useMemo(() => window && new URL(window.location.href), [window]);

  const categoryName = routerIsReady
    ? capitaliseString(`${query.gender}'s ${query.categoryName}`)
    : '';

  useEffect(() => {
    if (
      window &&
      query &&
      routerPush &&
      selectedWebsites &&
      selectedWebsites.length === 0
    ) {
      routerPush(`/websites`);
    }
  }, [query, query.gender, routerPush, selectedWebsites, window]);

  const { data, error, size, setSize } = useSWRInfinite<
    ClotheItem[],
    FetcherError
  >(
    (index) => makeUrl(query, index, limit, selectedWebsites, clotheSortOption),
    (url, selectedWebsites) =>
      swrSelectedWebsitesFetcher(
        url,
        selectedWebsites,
        requestHasBeenMade,
        requestHasCompleted
      ),
    {
      revalidateOnFocus: false,
      onSuccess: requestProgressComplete,
    }
  );

  const clothes = flatten(data);

  useUpdateUrl(size, 'page', url, routerReplace);
  useUpdateUrl(limit, LocalStorageKey.Limit, url, routerReplace, true);
  useUpdateUrl(
    clotheSortOption,
    LocalStorageKey.Sort,
    url,
    routerReplace,
    true
  );

  useEffect(() => {
    if (!hydratedFromQueryParams.current && routerIsReady) {
      hydratedFromQueryParams.current = true;

      const pageQuery = +`${query?.page}`;
      if (pageQuery && pageQuery !== size) {
        setSize(pageQuery);
      }

      const limitQuery = +`${query?.limit}`;
      if (limitQuery) {
        if (LIMIT_OPTIONS.includes(limitQuery)) {
          setLimit(limitQuery);
        } else {
          setLimit(DEFAULT_LIMIT);
        }
      } else {
        const cookieLimit = window?.localStorage.getItem(LocalStorageKey.Limit);
        if (cookieLimit) {
          setLimit(+cookieLimit);
        } else {
          setLimit(DEFAULT_LIMIT);
        }
      }

      const sort = parseClotheSortOption(
        window?.localStorage.getItem(LocalStorageKey.Sort)
      );
      sort
        ? setClotheSortOption(sort)
        : setClotheSortOption(ClotheSortOption.NEWEST);
    }
  }, [
    query?.limit,
    query?.page,
    routerIsReady,
    setSize,
    size,
    window?.localStorage,
    window?.location.pathname,
  ]);

  const onChangeLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setLimit(+event.target.value);
  };

  const onChangeClotheSortOption = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    setClotheSortOption(parseClotheSortOption(event.target.value));
  };

  return (
    <>
      <Head>
        <title>
          Stylelist
          {routerIsReady
            ? capitaliseString(` | ${query.gender}'s ${query.categoryName}`)
            : ''}
        </title>
      </Head>

      <ListOptionsHeader
        context={categoryName}
        limit={limit}
        onChangeLimit={onChangeLimit}
        clotheSortOption={clotheSortOption}
        onChangeClotheSortOption={onChangeClotheSortOption}
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
        percentageOfRequestsCompleted={percentageOfRequestsCompleted}
      />
    </>
  );
};
