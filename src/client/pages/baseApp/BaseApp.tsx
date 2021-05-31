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
import { ClothePreview } from '../../components/ClotheCardList/clotheCard/clothePreview/ClothePreview';
import { Header } from '../../components/header/Header';
import { useWindow } from '../../hooks/useWindow';
import { darkTheme } from '../../themes';
import { GlobalStyle } from './BaseApp.styles';
import { Favicon } from './Favicon';
import { GoogleFonts } from './GoogleFonts';

export const ClothePreviewContext = createContext<{
  clothePreviewUrl: string | undefined;
  setClothePreviewUrl: Dispatch<SetStateAction<string | undefined>>;
}>({ setClothePreviewUrl: () => undefined, clothePreviewUrl: undefined });

export const BaseApp = ({ Component, pageProps }: AppProps): ReactElement => {
  const window = useWindow();
  const [pathName, setPathName] = useState<string | undefined>(undefined);
  const [clothePreviewUrl, setClothePreviewUrl] =
    useState<string | undefined>(undefined);

  useEffect(() => {
    setPathName(window?.location.pathname);
  }, [window?.location.pathname]);

  return (
    <>
      <Head>
        <title>Stylelist</title>
        <GoogleFonts query='family=Martel+Sans:wght@300;400;700&display=swap' />
        <Favicon favicon='📜' />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <ClothePreviewContext.Provider
          value={{ setClothePreviewUrl, clothePreviewUrl }}
        >
          <GlobalStyle />
          <Header pathName={pathName}></Header>
          <Component {...pageProps} />
          <ClothePreview />
        </ClothePreviewContext.Provider>
      </ThemeProvider>
    </>
  );
};
