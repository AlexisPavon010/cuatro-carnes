import Head from 'next/head'

import { Slider } from '@/components/Slider'
import { Main } from '@/components/Main'
import { Layout } from '@/components/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Cuatro Carnes</title>
        <meta name="description" content="Somos una empresa de origen y tradición familiar creada tras la asociación de dos hermanos con gran trayectoria en el rubro de la carne. En los comienzos nos dedicábamos al abastecimiento de restaurantes y gastronómicos cumpliendo con los más altos estándares de calidad, pero con la llegada de la cuarentena en 2020 tuvimos que reinventarnos para superar la crisis. Fue así como desarrollamos la flota con la que proveemos carne de primera calidad, fresca y envasada al vacío a las familias y hogares de CABA y Zona Norte. Gracias a eso empezamos a crecer en el mercado del consumidor final y hoy en día contamos con tres camionetas para la distribución a nuestros clientes tanto mayoristas como particulares que nos siguen eligiendo." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <Main />
          <Slider />
        </main>
      </Layout>
    </>
  )
}
