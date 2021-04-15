import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { ThemeProvider } from 'styled-components';
import { Gender, LocalStorageKey } from '../../constants';
import { darkTheme, lightTheme } from '../../themes';
import { Header } from '../header/Header';
import { ContentContainer, GlobalStyle } from './BaseApp.styles';
import { Favicon } from './Favicon';
import { GoogleFonts } from './GoogleFonts';

export const PreferredGenderContext = createContext<{
  preferredGender: Gender | undefined;
  setPreferredGender: Dispatch<SetStateAction<Gender | undefined>>;
}>({
  preferredGender: undefined,
  setPreferredGender: () => {},
});

export const BaseApp = ({ Component, pageProps }: AppProps): ReactElement => {
  const pathName = process.browser ? window.location.pathname : undefined;
  const isHome = process.browser && window.location.pathname === '/';
  const [lightMode, setLightMode] = useState(false);
  const [preferredGender, setPreferredGender] = useState<Gender | undefined>(
    undefined
  );

  useEffect(
    () =>
      setLightMode(
        window.localStorage.getItem(LocalStorageKey.LightMode) === 'true'
      ),
    []
  );

  useEffect(
    () =>
      preferredGender &&
      window.localStorage.setItem(LocalStorageKey.Gender, preferredGender),
    [preferredGender]
  );

  const onThemeClick = () => {
    setLightMode(!lightMode);
    window.localStorage.setItem(LocalStorageKey.LightMode, `${!lightMode}`);
  };

  return (
    <>
      <Head>
        <title>Stylelist</title>
        <GoogleFonts query='family=Martel+Sans:wght@300;400;700&display=swap' />
        <Favicon favicon='📜' />
      </Head>
      <ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
        <PreferredGenderContext.Provider
          value={{ preferredGender, setPreferredGender }}
        >
          <GlobalStyle />
          <Header
            onThemeClick={onThemeClick}
            lightMode={lightMode}
            isHome={isHome}
            preferredGender={preferredGender}
            pathName={pathName}
          />
          <ContentContainer
            preferredGender={Boolean(preferredGender)}
            isHome={isHome}
          >
            <Component {...pageProps} />
          </ContentContainer>
        </PreferredGenderContext.Provider>
      </ThemeProvider>
    </>
  );
};
