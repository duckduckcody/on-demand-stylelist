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
import { FetcherError, swrFetcher } from '../../../src/util/swrFetcher';
import { ClothesResponseItem } from '../../api/getClothes';
import {
  LocalStorageKey,
  NO_WEBSITES_FOUND_API_ERROR_RESPONSE_MESSAGE,
  Paths,
} from '../../constants';
import { capitaliseString } from '../../util/capitaliseString';
import { useWindow } from '../../util/useWindow';
import {
  ButtonContainer,
  CategoryNameHeader,
  ListContainer,
  LoadMoreButton,
} from './categoryName.styles';
import { ClotheCard } from './clotheCard/ClotheCard';
import { makeUrl } from './makeUrl';

const LIMIT_OPTIONS = [1, 3, 5, 10];
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
  const window = useWindow();
  const url = useMemo(() => window && new URL(window.location.href), [window]);
  const [favourites, setFavourites] = useState<
    ClothesResponseItem[] | undefined
  >();

  const hydratedFromQueryParams = useRef(false);
  const selectedWebsites = useMemo((): string => {
    if (!window) return '[]';
    return window.localStorage.getItem('websites') ?? '[]';
  }, [window]);

  const { data, error, size, setSize } = useSWRInfinite<
    ClothesResponseItem[],
    FetcherError
  >((index) => makeUrl(query, index, limit, selectedWebsites), swrFetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (size && url && url.searchParams.get('page') !== `${size}`) {
      url.searchParams.set('page', `${size}`);
      routerReplace(url.href, url.href, { scroll: false, shallow: true });
    }
  }, [size, routerReplace, url?.href, url?.searchParams, url]);

  useEffect(() => {
    if (limit && url && url.searchParams.get('limit') !== `${limit}`) {
      url.searchParams.set('limit', `${limit}`);
      routerReplace(url.href, url.href, { scroll: false, shallow: true });
      window?.localStorage.setItem('limit', `${limit}`);
    }
  }, [
    limit,
    routerReplace,
    url,
    url?.href,
    url?.searchParams,
    window?.localStorage,
  ]);

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

      const favourites: ClothesResponseItem[] = JSON.parse(
        window?.localStorage.getItem(LocalStorageKey.Favourites) ?? '[]'
      );
      setFavourites(favourites);
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

  const onFavouriteClick = (clothe: ClothesResponseItem) => {
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
    if (error.message === NO_WEBSITES_FOUND_API_ERROR_RESPONSE_MESSAGE)
      routerReplace(Paths.websites);
    return (
      <p>
        Error fetching styles ({error.status}; {error.message})
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
        </span>
      </CategoryNameHeader>
      {isEmpty && <p>No clothes found</p>}
      {error && <div>Failed to load clothes</div>}
      <ListContainer>
        {clothes &&
          clothes.map((clothe) => (
            <ClotheCard
              key={clothe.link}
              clothe={clothe}
              isFavourited={
                favourites && favourites.some((fav) => fav.link === clothe.link)
              }
              onFavouriteClick={onFavouriteClick}
            />
          ))}
      </ListContainer>
      <ButtonContainer>
        <LoadMoreButton
          disabled={isLoadingMore || isEndOfData}
          onClick={() => setSize(size + 1)}
        >
          {isLoadingMore
            ? 'Fetching styles...'
            : isEndOfData
            ? 'no more clothes'
            : 'load more'}
        </LoadMoreButton>
      </ButtonContainer>
    </>
  );
};
