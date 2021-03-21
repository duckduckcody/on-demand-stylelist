import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSWRInfinite } from 'swr';
import { fetcher } from '../../../src/util/swrFetcher';
import { ClothesResponseItem } from '../../api/getClothes';
import { capitaliseString } from '../../util/capitaliseString';
import { useWindow } from '../../util/useWindow';
import {
  ButtonContainer,
  CategoryNameHeader,
  Item,
  ItemImageContainer,
  ItemImageLink,
  ItemInfo,
  ListContainer,
  LoadMoreButton,
} from './categoryName.styles';
import { makeUrl } from './makeUrl';

const LIMIT_OPTIONS = [1, 3, 5, 10];
const DEFAULT_LIMIT = 3;

export interface QueryParams {
  gender?: string;
  categoryName?: string;
  page?: string;
  limit?: string;
}

export const CategoryName = () => {
  const { query, push: routerPush, isReady: routerIsReady } = useRouter();
  const [limit, setLimit] = useState<number | undefined>(undefined);
  const window = useWindow();
  const url = window && new URL(window.location.href);
  const hydratedFromQueryParams = useRef(false);
  const selectedWebsites = useMemo((): string => {
    if (!window) return '[]';
    return window.localStorage.getItem('websites') ?? '[]';
  }, [window]);

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => makeUrl(query, index, limit, selectedWebsites),
    fetcher,
    {
      revalidateOnFocus: false,
      persistSize: true,
      onErrorRetry: () => {},
    }
  );

  useEffect(() => {
    if (size && url && url.searchParams.get('page') !== `${size}`) {
      url.searchParams.set('page', `${size}`);
      routerPush(url.href, url.href, { scroll: false, shallow: true });
    }
  }, [size, routerPush, url?.href, url?.searchParams]);

  useEffect(() => {
    if (limit && url && url.searchParams.get('limit') !== `${limit}`) {
      url.searchParams.set('limit', `${limit}`);
      routerPush(url.href, url.href, { scroll: false, shallow: true });
      window?.localStorage.setItem('limit', `${limit}`);
    }
  }, [limit, routerPush, url?.href, url?.searchParams]);

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
    }
  }, [query?.limit, query?.page, routerIsReady, setSize, size, limit]);

  const changeLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setLimit(+event.target.value);
  };

  const clothes: ClothesResponseItem[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data && data[data.length - 1]?.length < (limit ?? DEFAULT_LIMIT));

  if (error) {
    console.log('request error', error);
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
            capitaliseString(`${query.gender}s ${query.categoryName} | `)}
          Stylelist
        </title>
      </Head>
      <CategoryNameHeader>
        <label htmlFor='limit'>Product limit per website: </label>
        <select value={limit} onChange={changeLimit}>
          {LIMIT_OPTIONS.map((limitOption) => (
            <option key={limitOption} value={limitOption}>
              {limitOption}
            </option>
          ))}
        </select>
      </CategoryNameHeader>
      {isEmpty ? <p>No clothes found</p> : null}
      {error && <div>Failed to load clothes</div>}
      <ListContainer>
        {clothes &&
          clothes.map((clothe) => (
            <Item key={clothe.link}>
              <ItemImageContainer>
                <ItemImageLink
                  href={clothe.link}
                  target='_blank'
                  rel='noreferrer'
                >
                  <img src={clothe.image} width={250} />
                </ItemImageLink>
              </ItemImageContainer>
              <ItemInfo>
                <b>{clothe.website}</b>
                <span>${clothe.price}</span>
                <span>{clothe.name}</span>
              </ItemInfo>
            </Item>
          ))}
      </ListContainer>
      <ButtonContainer>
        <LoadMoreButton
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
        >
          {isLoadingMore
            ? 'Fetching styles...'
            : isReachingEnd
            ? 'no more clothes'
            : 'load more'}
        </LoadMoreButton>
      </ButtonContainer>
    </>
  );
};
