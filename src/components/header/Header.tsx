import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { ReactElement } from 'react';
import { Gender, Paths } from '../../constants';
import {
  DarkModeIconContainer,
  GenderHeaderLink,
  HeaderContainer,
  HeaderLink,
  HeaderLinkContainer,
  HeaderLinkTitle,
  PrimaryHeaderContainer,
  SecondaryHeaderContainer,
  StyledFontAwesomeIcon,
} from './Header.styles';

interface Props {
  onThemeClick: VoidFunction;
  lightMode: boolean;
  isHome: boolean;
  preferredGender: Gender | undefined;
}

export const Header = ({
  onThemeClick,
  lightMode,
  isHome,
  preferredGender,
}: Props): ReactElement => {
  const isShowingSecondaryHeading = Boolean(preferredGender) && !isHome;

  return (
    <HeaderContainer>
      <PrimaryHeaderContainer
        isShowingSecondaryHeading={isShowingSecondaryHeading}
      >
        <HeaderLinkContainer>
          <Link href='/'>
            <HeaderLinkTitle>STYLELIST</HeaderLinkTitle>
          </Link>
          <Link href='/mens'>
            <GenderHeaderLink
              selected={preferredGender === Gender.MEN && !isHome}
            >
              Mens
            </GenderHeaderLink>
          </Link>
          <Link href='/womens'>
            <GenderHeaderLink
              selected={preferredGender === Gender.WOMEN && !isHome}
            >
              Womens
            </GenderHeaderLink>
          </Link>
        </HeaderLinkContainer>
        <DarkModeIconContainer>
          <Link href='/favourites'>
            <HeaderLink>Favourites</HeaderLink>
          </Link>
          {!lightMode && (
            <StyledFontAwesomeIcon icon={faSun} onClick={onThemeClick} />
          )}
          {lightMode && (
            <StyledFontAwesomeIcon icon={faMoon} onClick={onThemeClick} />
          )}
        </DarkModeIconContainer>
      </PrimaryHeaderContainer>
      {isShowingSecondaryHeading && (
        <SecondaryHeaderContainer>
          <Link
            href={preferredGender === Gender.MEN ? Paths.mens : Paths.womens}
          >
            <HeaderLink>Categories</HeaderLink>
          </Link>
          <Link href='/websites'>
            <HeaderLink>Websites</HeaderLink>
          </Link>
        </SecondaryHeaderContainer>
      )}
    </HeaderContainer>
  );
};
