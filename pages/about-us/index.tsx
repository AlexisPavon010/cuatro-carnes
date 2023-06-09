import { Layout } from "@/components/Layout";
import styles from './styles.module.scss'

const AboutUsPage = () => {
  return (
    <Layout title="Sobre nosotros - Cuatro Carnes">
      <section className={styles.hero}>
        <div className={styles.hero__overlay}></div>
        <div className={styles.hero__container}>
          <div className={styles.hero__home}>
            <h1 className={styles.hero__home_title}>
              Nuestra historia.
            </h1>
            <p className={styles.hero__home_description}>
              Somos una empresa de origen y tradición familiar creada tras la asociación de dos hermanos con gran
              trayectoria en el rubro de la carne. En los comienzos nos dedicábamos al abastecimiento de restaurantes
              y gastronómicos cumpliendo con los más altos estándares de calidad, pero con la llegada de la cuarentena
              en 2020 tuvimos que reinventarnos para superar la crisis. Fue así como desarrollamos la flota con la que
              proveemos carne de primera calidad, fresca y envasada al vacío a las familias y hogares de CABA y Zona Norte.
              <br />
              <br />
              Gracias a eso empezamos a crecer en el mercado del consumidor final y hoy en día contamos con tres camionetas
              para la distribución a nuestros clientes tanto mayoristas como particulares que nos siguen eligiendo.
            </p>
          </div>
        </div >
      </section >
    </Layout>
  )
}

export default AboutUsPage;