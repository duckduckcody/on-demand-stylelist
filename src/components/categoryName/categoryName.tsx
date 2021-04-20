import { faSpinner } from '@fortawesome/free-solid-svg-icons';
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
import { FetcherError, swrFetcher } from '../../../src/util/swrFetcher';
import { ClotheItem } from '../../api/getClothes';
import {
  ClotheSortOption,
  clotheSortOptionValues,
  LocalStorageKey,
  NO_WEBSITES_FOUND_API_ERROR_RESPONSE_MESSAGE,
  parseClotheSortOption,
  Paths,
} from '../../constants';
import { capitaliseString } from '../../util/capitaliseString';
import { useUpdateUrl } from '../../util/useUpdateUrl';
import { useWindow } from '../../util/useWindow';
import {
  ButtonContainer,
  CategoryNameHeader,
  ClotheCardListContainer,
  LoadMoreButton,
  SpinningFontAwesomeIcon,
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
  const [clotheSortOption, setClotheSortOption] = useState<
    ClotheSortOption | undefined
  >(undefined);
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
      <ClotheCardListContainer>
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
      </ClotheCardListContainer>

      <ButtonContainer>
        {isLoadingMore && (
          <>
            {'Fetching styles'}&nbsp;&nbsp;
            <SpinningFontAwesomeIcon icon={faSpinner} />
          </>
        )}
        {!isLoadingMore &&
          isEndOfData &&
          (isEmpty ? 'no clothes found :(' : 'no more clothes :(')}
        {!isLoadingMore && !isEndOfData && (
          <LoadMoreButton onClick={() => setSize(size + 1)}>
            Load more
          </LoadMoreButton>
        )}
      </ButtonContainer>
    </>
  );
};
