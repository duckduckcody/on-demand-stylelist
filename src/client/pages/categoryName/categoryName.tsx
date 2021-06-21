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
import { CategoryNameHeader } from '../../components/CategoryName/CategoryNameHeader/CategoryNameHeader';
import { ClotheCardList } from '../../components/ClotheCardList/ClotheCardList';
import { DEFAULT_LIMIT, LIMIT_OPTIONS, LocalStorageKey } from '../../constants';
import { useSelectedWebsites } from '../../hooks/useSelectedWebsites';
import { useUpdateUrl } from '../../hooks/useUpdateUrl';
import { useWindow } from '../../hooks/useWindow';
import { capitaliseString } from '../../util/capitaliseString';
import { FetcherError, swrFetcher } from '../../util/swrFetcher';
import { ButtonContainer, LoadMoreButton } from './categoryName.styles';
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
  const { selectedWebsites } = useSelectedWebsites();
  const hydratedFromQueryParams = useRef(false);

  const [limit, setLimit] = useState<number | undefined>(undefined);
  const [clotheSortOption, setClotheSortOption] =
    useState<ClotheSortOption | undefined>(undefined);
  const [favourites, setFavourites] = useState<ClotheItem[] | undefined>();
  const url = useMemo(() => window && new URL(window.location.href), [window]);

  const categoryName = routerIsReady
    ? capitaliseString(`${query.gender}'s ${query.categoryName}`)
    : '';

  useEffect(() => {
    if (window && query && routerPush && selectedWebsites === []) {
      routerPush(`/websites`);
    }
  }, [query, query.gender, routerPush, selectedWebsites, window]);

  const { data, error, size, setSize } = useSWRInfinite<
    ClotheItem[],
    FetcherError
  >(
    (index) => makeUrl(query, index, limit, selectedWebsites, clotheSortOption),
    swrFetcher,
    {
      revalidateOnFocus: false,
    }
  );

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

      const favourites: ClotheItem[] = JSON.parse(
        window?.localStorage.getItem(LocalStorageKey.Favourites) ?? '[]'
      );
      setFavourites(favourites);

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

  const onFavouriteClick = (clothe: ClotheItem) => {
    if (favourites) {
      let favs;
      if (favourites?.find((fav) => fav.link === clothe.link)) {
        favs = favourites.filter((fav) => fav.link !== clothe.link);
      } else {
        favs = favourites.concat(clothe);
      }
      setFavourites(favs);
      window?.localStorage.setItem(
        LocalStorageKey.Favourites,
        JSON.stringify(favs)
      );
    }
  };

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

  if (error) {
    console.log('request error', error);
    return (
      <p>
        Error fetching styles ({error.status} {error.message})
      </p>
    );
  }

  return (
    <>
      <Head>
        <title>
          Stylelist
          {routerIsReady &&
            capitaliseString(` | ${query.gender}'s ${query.categoryName}`)}
        </title>
      </Head>

      <CategoryNameHeader
        categoryName={categoryName}
        limit={limit}
        onChangeLimit={onChangeLimit}
        clotheSortOption={clotheSortOption}
        onChangeClotheSortOption={onChangeClotheSortOption}
      />

      <ClotheCardList
        clothes={clothes}
        favourites={favourites}
        onFavouriteClick={onFavouriteClick}
      />

      <ButtonContainer>
        {!isLoadingMore &&
          isEndOfData &&
          (isEmpty ? 'no clothes found :(' : 'no more clothes :(')}

        {!isEndOfData && (
          <LoadMoreButton
            onClick={() => setSize(size + 1)}
            disabled={isLoadingMore}
          >
            {isLoadingMore &&
              (clothes.length === 0
                ? 'Loading styles...'
                : 'Loading more styles...')}
            {!isLoadingMore && !isEndOfData && 'Load more'}
          </LoadMoreButton>
        )}
      </ButtonContainer>
    </>
  );
};
