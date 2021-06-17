import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { ReactElement, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { ClotheInfo } from '../../../types/ClotheInfo';
import { ClothePreview } from '../../components/clothePreview/ClothePreview';
import { Header } from '../../components/header/Header';
import { ClothePreviewContext } from '../../contexts/ClothePreviewContext';
import { WebsitesContext } from '../../contexts/WebsitesContext';
import { useSelectedWebsites } from '../../hooks/useSelectedWebsites';
import { useWindow } from '../../hooks/useWindow';
import { darkTheme } from '../../themes';
import { GlobalStyle } from './BaseApp.styles';
import { Favicon } from './Favicon';
import { GoogleFonts } from './GoogleFonts';

export const BaseApp = ({ Component, pageProps }: AppProps): ReactElement => {
  const window = useWindow();
  const [pathName, setPathName] = useState<string | undefined>(undefined);
  const [optionalClotheInfo, setOptionalClotheInfo] =
    useState<Partial<ClotheInfo> | undefined>(undefined);
  const [clothePreviewUrl, setClothePreviewUrl] =
    useState<string | undefined>(undefined);
  const { websites, setWebsites } = useSelectedWebsites();
  const [showingWebsitesConfig, setShowingWebsitesConfig] =
    useState<boolean>(false);

  useEffect(() => {
    setPathName(window?.location.pathname);
  }, [window?.location.pathname]);

  return (
    <main id='appElement'>
      <Head>
        <title>Stylelist</title>
        <GoogleFonts query='family=Martel+Sans:wght@300;400;700&display=swap' />
        <Favicon favicon='📜' />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <ClothePreviewContext.Provider
          value={{
            setClothePreviewUrl,
            clothePreviewUrl,
            optionalClotheInfo,
            setOptionalClotheInfo,
          }}
        >
          <WebsitesContext.Provider
            value={{
              websites,
              setWebsites,
              showingWebsitesConfig,
              setShowingWebsitesConfig,
            }}
          >
            <GlobalStyle />
            <Header pathName={pathName}></Header>
            <Component {...pageProps} />
            <ClothePreview />
          </WebsitesContext.Provider>
        </ClothePreviewContext.Provider>
      </ThemeProvider>
    </main>
  );
};
