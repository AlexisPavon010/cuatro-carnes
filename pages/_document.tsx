import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/assets/favicon.png" />
        <title>Cuatro Carnes</title>
        <meta name="title" content="Cuatro Carnes" />
        <meta name="description" content="Somos una empresa de origen y tradición familiar creada tras la asociación de dos hermanos con gran trayectoria en el rubro de la carne. En los comienzos nos dedicábamos al abastecimiento de restaurantes y gastronómicos cumpliendo con los más altos estándares de calidad, pero con la llegada de la cuarentena en 2020 tuvimos que reinventarnos para superar la crisis. Fue así como desarrollamos la flota con la que proveemos carne de primera calidad, fresca y envasada al vacío a las familias y hogares de CABA y Zona Norte. Gracias a eso empezamos a crecer en el mercado del consumidor final y hoy en día contamos con tres camionetas para la distribución a nuestros clientes tanto mayoristas como particulares que nos siguen eligiendo." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cuatrocarnes.com/" />
        <meta property="og:title" content="Cuatro Carnes" />
        <meta property="og:description" content="Somos una empresa de origen y tradición familiar creada tras la asociación de dos hermanos con gran trayectoria en el rubro de la carne. En los comienzos nos dedicábamos al abastecimiento de restaurantes y gastronómicos cumpliendo con los más altos estándares de calidad, pero con la llegada de la cuarentena en 2020 tuvimos que reinventarnos para superar la crisis. Fue así como desarrollamos la flota con la que proveemos carne de primera calidad, fresca y envasada al vacío a las familias y hogares de CABA y Zona Norte. Gracias a eso empezamos a crecer en el mercado del consumidor final y hoy en día contamos con tres camionetas para la distribución a nuestros clientes tanto mayoristas como particulares que nos siguen eligiendo." />
        <meta property="og:image" content="https://cuatro-carnes.vercel.app/assets/logo-side.svg" />
        <meta property="og:image:height" content="813" />
        <meta property="og:image:width" content="813" />
        <meta property="og:site_name" content="Bienvenidos a Cuatro Carnes" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://cuatrocarnes.com/" />
        <meta property="twitter:title" content="Cuatro Carnes" />
        <meta property="twitter:description" content="Somos una empresa de origen y tradición familiar creada tras la asociación de dos hermanos con gran trayectoria en el rubro de la carne. En los comienzos nos dedicábamos al abastecimiento de restaurantes y gastronómicos cumpliendo con los más altos estándares de calidad, pero con la llegada de la cuarentena en 2020 tuvimos que reinventarnos para superar la crisis. Fue así como desarrollamos la flota con la que proveemos carne de primera calidad, fresca y envasada al vacío a las familias y hogares de CABA y Zona Norte. Gracias a eso empezamos a crecer en el mercado del consumidor final y hoy en día contamos con tres camionetas para la distribución a nuestros clientes tanto mayoristas como particulares que nos siguen eligiendo." />
        <meta property="twitter:image" content="https://cuatro-carnes.vercel.app/assets/logo-side.svg" />
        <Script
          id="googlemaps"
          type="text/javascript"
          strategy="beforeInteractive"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places`}
        />
        {/* Fragmento de código de Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}></script>
        <script
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
