import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../../themes';
import {
  ContentContainer,
  DarkModeIconContainer,
  GlobalStyle,
  HeaderContainer,
  HeaderLink,
  HeaderLinkContainer,
  HeaderLinkTitle,
  StyledFontAwesomeIcon,
} from './BaseApp.styles';
import { Favicon } from './Favicon';
import { GoogleFonts } from './GoogleFonts';

export const BaseApp = ({ Component, pageProps }: AppProps): ReactElement => {
  const [lightMode, setLightMode] = useState(false);
  const onThemeClick = () => {
    setLightMode(!lightMode);
    window.localStorage.setItem('lightMode', `${!lightMode}`);
  };

  useEffect(
    () => setLightMode(window.localStorage.getItem('lightMode') === 'true'),
    []
  );

  return (
    <>
      <Head>
        <title>Stylelist</title>
        <GoogleFonts query='family=Martel+Sans:wght@300;400;700&display=swap' />
        <Favicon favicon='📜' />
      </Head>
      <ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
        <GlobalStyle />
        <HeaderContainer>
          <HeaderLinkContainer>
            <Link href='/'>
              <HeaderLinkTitle>STYLELIST</HeaderLinkTitle>
            </Link>
            <Link href='/websites'>
              <HeaderLink>websites</HeaderLink>
            </Link>
            <Link href='/favourites'>
              <HeaderLink>favourites</HeaderLink>
            </Link>
          </HeaderLinkContainer>
          <DarkModeIconContainer>
            {!lightMode && (
              <StyledFontAwesomeIcon icon={faSun} onClick={onThemeClick} />
            )}
            {lightMode && (
              <StyledFontAwesomeIcon icon={faMoon} onClick={onThemeClick} />
            )}
          </DarkModeIconContainer>
        </HeaderContainer>
        <ContentContainer>
          <Component {...pageProps} />
        </ContentContainer>
      </ThemeProvider>
    </>
  );
};
