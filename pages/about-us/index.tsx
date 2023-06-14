import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegCreditCard, FaShoppingCart, FaStoreAlt } from "react-icons/fa";

import { Layout } from "@/components/Layout";
import styles from './styles.module.scss';
import Image from "next/image";
import { Button, Form, Input } from "antd";

const { TextArea } = Input
const widgets = [
  {
    name: 'Atención personalizada por WhatsApp',
    icon: <BsWhatsapp color="#f4e8e4" size='44px' />
  },
  {
    name: 'Locales con precios mayoristas',
    icon: <FaStoreAlt color="#f4e8e4" size='44px' />
  },
  {
    name: 'Aboná con transferencia, en efectivo o con tarjeta de crédito.',
    icon: <FaRegCreditCard color="#f4e8e4" size='44px' />
  },
  {
    name: 'Envíos gratis en compras superiores a $6.000',
    icon: <AiOutlineShoppingCart color="#f4e8e4" size='44px' />
  },
]

const AboutUsPage = () => {
  return (
    <Layout title="Sobre nosotros - Cuatro Carnes">
      <section className={styles.hero}>
        <div className={styles.hero__overlay}></div>
        <div className={styles.hero__container}>
          <div className={styles.hero__home}>
            <h1 className={styles.hero__home_title}>
              Somos una empresa de origen y tradición familiar.
            </h1>
            <p className={styles.hero__home_description}>
              Además de distribuidores somos productores directos. En la estancia Don Pancho ubicada en Relmo, provincia de La Pampa, nos dedicamos al engorde de novillitos y vaquillonas  AnGus, conocida por su carne de primera calidad (veteada, tierna, jugosa y sabrosa). A través de técnicas sustentables de vanguardia y utilizando una alimentación a base de pastura y alimento balanceado logramos un producto final premium. Por eso podemos garantizar la calidad de la carne y conocer la trazabilidad del recorrido que hizo desde el campo a su mesa.
            </p>
            <br />
            <br />
            <h2 className={styles.hero__home_subtitle}>Nuestra historia.</h2>
            <br />
            <br />
            <p className={styles.hero__home_description}>
              Somos una empresa de origen y tradición familiar creada tras la asociación de dos hermanos con gran trayectoria en el rubro de la carne. En los comienzos nos dedicábamos al abastecimiento de restaurantes y gastronómicos cumpliendo con los más altos estándares de calidad, pero con la llegada de la cuarentena en 2020 tuvimos que reinventarnos para superar la crisis. Fue así como desarrollamos la flota con la que proveemos carne de primera calidad, fresca y envasada al vacío a las familias y hogares de CABA y Zona Norte. Gracias a eso empezamos a crecer en el mercado del consumidor final y hoy en día contamos con tres camionetas para la distribución a nuestros clientes tanto mayoristas como particulares que nos siguen eligiendo.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.hero__container}>
          <div className={styles.hero__home_list}>
            {widgets.map(({ name, icon }, i) => (
              <div className={styles.hero__home_list_item}>
                <div className={styles.hero__home_list_item_wrapper}>
                  <div className={styles.hero__home_list_item_wrapper_image}>
                    <Link className={styles.hero__home_list_item_wrapper_image_link} href='#'>
                      {icon}
                    </Link>
                  </div>
                  <div className={styles.hero__home_list_item_wrapper_text}>
                    <p className={styles.hero__home_list_item_text}>
                      {name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >
      <section className={styles.hero__dis}>
        <div className={styles.hero__container_dis}>
          <div className={styles.hero__container_rigth}>
            <div className={styles.hero__container_rigth_text}>
              Logística y distribución
            </div>
            <div className={styles.hero__container_rigth_text_description}>
              Estamos ubicados en Los Troncos donde tenemos dos locales con venta al público y nuestro centro de producción. Contamos con 3 camionetas refrigeradas con las que hacemos más de 300 entregas por semana en las zonas de CABA y Zona Norte (de Benavidez a Vicente López). Toda la carne que vendemos es fresca y la mayoría de los cortes se entregan envasados al vacío, lo que estabiliza el sabor y frescura y tierniza el corte.
            </div>
          </div>
          <div className={styles.hero__container_left}>
            <Image src='/assets/distribution.png' alt='Distribution Image' height={380} width={570} style={{ width: '100%', objectFit: 'contain' }} />
          </div>
        </div >
      </section>
      <section className={styles.hero__location}>
        <div className={styles.hero__maps_container}>
          <h3 className={styles.hero__container_location_text}>Nuestros locales</h3>
          <div className={styles.hero__container_maps}>
            <div className={styles.hero__container_maps_wrapper}>
              <p className={styles.hero__container_maps_text}>
                Av. Juan B. Justo 2085, Troncos del Talar.
              </p>
              <iframe src="https://maps.google.com/maps?q=Av.Juan%20B.%20Justo%202085%2C%20Troncos%20del%20Talar&amp;t=m&amp;z=15&amp;output=embed&amp;iwloc=near" height="600" style={{ border: 0 }} allowFullScreen></iframe>
              <p className={styles.hero__container_maps_description}>
                Lunes a viernes 8 a 12:30 y 13:30 a 17hs, sábados 8 a 14hs.
              </p>
            </div>
            <div className={styles.hero__container_maps_wrapper}>
              <p className={styles.hero__container_maps_text}>
                Av. Juan B. Justo 2085, Troncos del Talar.
              </p>
              <iframe src="https://maps.google.com/maps?q=Av%20Cris%C3%B3logo%20Larralde%202306%2C%20Troncos%20del%20Talar&t=m&z=14&output=embed&iwloc=near" height="600" style={{ border: 0 }} allowFullScreen></iframe>
              <p className={styles.hero__container_maps_description}>
                Lunes a viernes 8 a 12:30 y 13:30 a 17hs, sábados 8 a 14hs.
              </p>
            </div>
          </div>
        </div >
      </section>
      <section>
        <div className={styles.hero__container}>
          <div className={styles.hero__contact}>
            <div className={styles.hero__contact_wrapper}>
              <p className={styles.hero__contact_title}>
                ¿Tenés un restaurante?
              </p>
              <p className={styles.hero__contact_subtitle}>
                Ponete en contacto con nosotros y recibí nuestro listado de precios mayoristas.
              </p>
            </div>
            <div className={styles.hero__form_container}>
              <Form
                layout="vertical"
              >
                <Form.Item
                  label='Tu nombre'
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label='Asunto'
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label='Tu mensaje (opcional)'
                >
                  <TextArea
                    style={{
                      height: '200px'
                    }}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary">
                    Enviar
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </section >
    </Layout>
  )
}

export default AboutUsPage;