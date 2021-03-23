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
  Header,
  HeaderLink,
  HeaderText,
  HeaderTextContainer,
  StyledFontAwesomeIcon,
} from './BaseApp.styles';
import { Favicon } from './Favicon';
import { GoogleFonts } from './GoogleFonts';

export const BaseApp = ({ Component, pageProps }: AppProps): ReactElement => {
  const [darkMode, setDarkMode] = useState(false);
  const onThemeClick = () => {
    setDarkMode(!darkMode);
    window.localStorage.setItem('darkMode', `${!darkMode}`);
  };

  useEffect(
    () => setDarkMode(window.localStorage.getItem('darkMode') === 'true'),
    []
  );

  return (
    <>
      <Head>
        <title>Stylelist</title>
        <GoogleFonts query='family=Martel+Sans:wght@300;400;700&display=swap' />
        <Favicon favicon='📜' />
      </Head>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Header>
          <HeaderTextContainer>
            <Link href='/'>
              <HeaderText>STYLELIST</HeaderText>
            </Link>
            <Link href='/websites'>
              <HeaderLink>websites</HeaderLink>
            </Link>
          </HeaderTextContainer>
          <DarkModeIconContainer>
            {darkMode && (
              <StyledFontAwesomeIcon icon={faSun} onClick={onThemeClick} />
            )}
            {!darkMode && (
              <StyledFontAwesomeIcon icon={faMoon} onClick={onThemeClick} />
            )}
          </DarkModeIconContainer>
        </Header>
        <ContentContainer>
          <Component {...pageProps} />
        </ContentContainer>
      </ThemeProvider>
    </>
  );
};
