import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, ConfigProvider, Result } from 'antd';

export default function Custom404() {

  const router = useRouter()

  return (
    <main style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Head>
        <title>Cuatro Carnes</title>
        <meta name="description" content='Somos una empresa de origen y tradición familiar creada tras la asociación de dos hermanos con gran trayectoria en el rubro de la carne. En los comienzos nos dedicábamos al abastecimiento de restaurantes y gastronómicos cumpliendo con los más altos estándares de calidad, pero con la llegada de la cuarentena en 2020 tuvimos que reinventarnos para superar la crisis. Fue así como desarrollamos la flota con la que proveemos carne de primera calidad, fresca y envasada al vacío a las familias y hogares de CABA y Zona Norte. Gracias a eso empezamos a crecer en el mercado del consumidor final y hoy en día contamos con tres camionetas para la distribución a nuestros clientes tanto mayoristas como particulares que nos siguen eligiendo.' />
        <meta property="og:site_name" content="Bienvenidos a Cuatro Carnes" />
        <meta property="og:image" content="https://cuatro-carnes.vercel.app/assets/logo-side.svg" />
        <meta property="og:image:height" content="813" />
        <meta property="og:image:width" content="813" />
      </Head>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#a92b3c',
          },
        }}
      >
        <Result
          icon={
            <img
              src="/assets/logo-mail.png"
              alt="Logo Cuatro Carnes"
              style={{
                height: '120px'
              }}
            />
          }
          title="🎉¡Felices Fiestas!🎉"
          subTitle="Por reformas en nuestros locales, cerramos desde el lunes 1 hasta el domingo 7 de enero. Podrás realizar tus pedidos nuevamente a partir del lunes 8."
        // extra={<Button onClick={() => window.open('https://pedimosfacil.com/cuatrocarnes')} type="primary">Hace tu Pedido</Button>}
        />
      </ConfigProvider>
    </main>
  )
}