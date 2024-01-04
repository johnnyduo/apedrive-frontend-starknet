import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types';
// import { Fira_Code } from '@next/font/google';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
import SettingsButton from '@/components/settings/settings-button';
import SettingsDrawer from '@/components/settings/settings-drawer';
import { WalletProvider } from '@/lib/hooks/use-connect';
import 'overlayscrollbars/css/OverlayScrollbars.css';
// base css file
import 'swiper/css';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';
import { ContractDataProvider } from '@/lib/contract';
import { SensorProvider } from '@/lib/hooks/use-sensor';
import { HotWalletProvider } from '@/lib/hooks/use-hot-wallet';
import { CarProvider } from '@/lib/hooks/use-car';
import { goerli } from '@starknet-react/chains'
import { StarknetConfig, argent, braavos, useInjectedConnectors, alchemyProvider } from '@starknet-react/core';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// const firaCode = Fira_Code({
//   weight: ['400', '500', '700'],
//   style: ['normal'],
//   subsets: ['latin'],
//   variable: '--font-body',
// });

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  //could remove this if you don't need to page level layout
  const getLayout = Component.getLayout ?? ((page) => page);

  const { connectors } = useInjectedConnectors({
    recommended: [argent()],
  })

  return (
    <>
      <Head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <title>ApeDrive - The World First Real Drive & Earn Platform</title>
      </Head>
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="light" //dark
      >
        <StarknetConfig
          chains={[goerli]}
          provider={alchemyProvider({ apiKey: "" })}
          connectors={connectors}
        >
          <HotWalletProvider>
            <WalletProvider>
              <ContractDataProvider>
                <CarProvider>
                  <SensorProvider>
                    {/* <div className={`${firaCode.variable} font-body`}> */}
                    {getLayout(<Component {...pageProps} />)}
                    {/* <SettingsButton /> */}
                    <SettingsDrawer />
                    <ModalsContainer />
                    <DrawersContainer />
                    {/* </div> */}
                  </SensorProvider>
                </CarProvider>
              </ContractDataProvider>
            </WalletProvider>
          </HotWalletProvider>
        </StarknetConfig>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
