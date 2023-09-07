import { SkeletonTheme } from 'react-loading-skeleton';
import { StyleProvider } from '@ant-design/cssinjs';
import { SessionProvider } from 'next-auth/react';
import 'react-loading-skeleton/dist/skeleton.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';

import { store } from '@/store';
import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <Provider store={store}>
          <StyleProvider hashPriority='high'>
            <SkeletonTheme baseColor='#0000000f' highlightColor='#e9dddd'>
              <Component {...pageProps} />
            </SkeletonTheme>
          </StyleProvider>
        </Provider>
      </SWRConfig>
    </SessionProvider>
  );
}
