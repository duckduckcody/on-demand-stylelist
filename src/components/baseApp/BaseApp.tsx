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
import { Gender, LocalStorageKey, parseGender } from '../../constants';
import { darkTheme } from '../../themes';
import { useWindow } from '../../util/useWindow';
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
  const window = useWindow();
  const pathName = window?.location.pathname;
  const isHome = window?.location.pathname === '/';
  const [preferredGender, setPreferredGender] = useState<Gender | undefined>();

  useEffect(
    () =>
      setPreferredGender(
        parseGender(window?.localStorage.getItem(LocalStorageKey.Gender))
      ),
    [window?.localStorage]
  );

  useEffect(
    () =>
      preferredGender &&
      window?.localStorage.setItem(LocalStorageKey.Gender, preferredGender),
    [preferredGender, window?.localStorage]
  );

  return (
    <>
      <Head>
        <title>Stylelist</title>
        <GoogleFonts query='family=Martel+Sans:wght@300;400;700&display=swap' />
        <Favicon favicon='📜' />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <PreferredGenderContext.Provider
          value={{ preferredGender, setPreferredGender }}
        >
          <GlobalStyle />
          <Header
            isHome={isHome}
            preferredGender={preferredGender}
            pathName={pathName}
          ></Header>
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
