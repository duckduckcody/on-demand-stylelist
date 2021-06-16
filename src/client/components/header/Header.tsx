import { faCog, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { Gender } from '../../../types/Gender';
import { Paths } from '../../constants';
import {
  CloseSearchContainer,
  FloatingSearchContainer,
  HeaderContainer,
  HeaderLinkTitle,
  HeaderOffset,
  HeaderPageLink,
  Icon,
  IconContainer,
  LinkContainer,
  PrimaryHeaderContainer,
  SearchContainer,
  SearchInput,
  WebsitesContainer,
} from './Header.styles';

interface Props {
  pathName: string | undefined;
}

export const Header = ({ pathName }: Props): ReactElement => {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const firstSlug = pathName?.split('/', 2)[1];
  const isShowingSecondaryHeader =
    firstSlug === Gender.MEN || firstSlug === Gender.WOMEN;
  const categoryPath = firstSlug === Gender.MEN ? Paths.mens : Paths.womens;
  const websitesPath =
    firstSlug === Gender.MEN ? Paths.mensWebsites : Paths.womensWebsites;

  const search = () => {
    if (searchQuery) {
      setIsSearching(false);
      router.push(`/search?q=${searchQuery}`);
    }
  };

  const cancelSearch = () => {
    setSearchQuery(undefined);
    setIsSearching(false);
  };

  return (
    <>
      <HeaderContainer>
        <PrimaryHeaderContainer
          isShowingSecondaryHeader={isShowingSecondaryHeader}
          isSearching={isSearching}
        >
          {isSearching && (
            <>
              <SearchInput
                autoFocus
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && search()}
                placeholder='Search styles...'
              />
              <CloseSearchContainer onClick={cancelSearch}>
                <Icon icon={faTimes} />
              </CloseSearchContainer>
              <FloatingSearchContainer onClick={search}>
                <Icon icon={faSearch} />
              </FloatingSearchContainer>
            </>
          )}
          {!isSearching && (
            <>
              <LinkContainer>
                <Link href='/' passHref>
                  <HeaderLinkTitle>STYLELIST</HeaderLinkTitle>
                </Link>
                <Link href='/mens' passHref>
                  <HeaderPageLink selected={firstSlug === Gender.MEN}>
                    Mens
                  </HeaderPageLink>
                </Link>
                <Link href='/womens' passHref>
                  <HeaderPageLink selected={firstSlug === Gender.WOMEN}>
                    Womens
                  </HeaderPageLink>
                </Link>
                <Link href='/favourites' passHref>
                  <HeaderPageLink selected={pathName === '/favourites'}>
                    Favourites
                  </HeaderPageLink>
                </Link>
              </LinkContainer>
              <IconContainer>
                <WebsitesContainer onClick={() => router.push(websitesPath)}>
                  <Icon icon={faCog} />
                </WebsitesContainer>
                <SearchContainer onClick={() => setIsSearching(true)}>
                  <Icon icon={faSearch} />
                </SearchContainer>
              </IconContainer>
            </>
          )}
        </PrimaryHeaderContainer>
      </HeaderContainer>
      <HeaderOffset />
    </>
  );
};
