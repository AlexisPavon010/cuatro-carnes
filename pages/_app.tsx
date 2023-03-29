import '../public/antd.min.css';
import '../styles/globals.scss';

import { StyleProvider } from '@ant-design/cssinjs';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';

import { store } from '@/store';

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
            <Component {...pageProps} />
          </StyleProvider>
        </Provider>
      </SWRConfig>
    </SessionProvider>
  );
}
