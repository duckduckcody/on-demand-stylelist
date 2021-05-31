import { flatten, startCase } from 'lodash';
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
  clotheSortOptionValues,
  parseClotheSortOption,
} from '../../../types/ClotheSort';
import { LocalStorageKey } from '../../constants';
import { useUpdateUrl } from '../../hooks/useUpdateUrl';
import { useWindow } from '../../hooks/useWindow';
import { capitaliseString } from '../../util/capitaliseString';
import { FetcherError, swrFetcher } from '../../util/swrFetcher';
import {
  ButtonContainer,
  CategoryNameHeader,
  LoadMoreButton,
  StyledClotheCardList,
} from './categoryName.styles';
import { makeUrl } from './makeUrl';

const LIMIT_OPTIONS = [1, 3, 5, 10, 20, 30];
const DEFAULT_LIMIT = 3;

export interface QueryParams {
  gender?: string;
  categoryName?: string;
  page?: string;
  limit?: string;
}

export const CategoryName = (): ReactElement => {
  const { query, replace: routerReplace, isReady: routerIsReady } = useRouter();
  const [limit, setLimit] = useState<number | undefined>(undefined);
  const [clotheSortOption, setClotheSortOption] =
    useState<ClotheSortOption | undefined>(undefined);
  const window = useWindow();
  const url = useMemo(() => window && new URL(window.location.href), [window]);
  const [favourites, setFavourites] = useState<ClotheItem[] | undefined>();
  const hydratedFromQueryParams = useRef(false);

  const selectedWebsites = useMemo((): string => {
    if (!window) return '[]';
    return window.localStorage.getItem('websites') ?? '[]';
  }, [window]);

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
  useUpdateUrl(limit, 'limit', url, routerReplace, true);
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
        const cookieLimit = window?.localStorage.getItem('limit');
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

  const changeLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setLimit(+event.target.value);
  };

  const changeClotheSortOption = (
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
          {routerIsReady &&
            capitaliseString(`${query.gender}'s ${query.categoryName} | `)}
          Stylelist
        </title>
      </Head>
      <CategoryNameHeader>
        <span>
          {routerIsReady &&
            capitaliseString(`${query.gender}'s ${query.categoryName}`)}
        </span>
        <span>
          <label htmlFor='limit'>Product limit per website&nbsp;</label>
          <select value={limit} onChange={changeLimit}>
            {LIMIT_OPTIONS.map((limitOption) => (
              <option key={limitOption} value={limitOption}>
                {limitOption}
              </option>
            ))}
          </select>
          &nbsp; &nbsp;
          <label htmlFor='sort'>Sort&nbsp;</label>
          <select value={clotheSortOption} onChange={changeClotheSortOption}>
            {clotheSortOptionValues.map((sortOption) => (
              <option key={sortOption} value={sortOption}>
                {startCase(sortOption)}
              </option>
            ))}
          </select>
        </span>
      </CategoryNameHeader>

      <StyledClotheCardList
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
