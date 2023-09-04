import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/assets/favicon.png" />
        <Script
          id="googlemaps"
          type="text/javascript"
          strategy="afterInteractive"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places`}
        />
        {/* Fragmento de código de Google Analytics */}
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`} />
        <Script
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
              `,
          }}
        />
        {/* Fin del fragmento de código de Google Analytics */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
