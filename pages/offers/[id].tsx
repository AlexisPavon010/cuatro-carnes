import Image from "next/image";

import { Layout } from "@/components/Layout";
import styles from './styles.module.scss'

const OffersPageDetails = () => {
  return (
    <Layout title='Ofertas - Cuatro carnes'>
      <div className={styles.offers}>
        <div className={styles.offers__container}>
          <div className={styles.offers__container_news}>
            <h1 className={styles.offers__title_news}>
              Llegó la provo que todos querían.
            </h1>
            <div className={styles.offers__news}>
              <Image src='/assets/test.jpeg' width={900} height={600} alt="asdasd" style={{
                width: '100%'
              }} />
            </div>
            <div className={styles.offers__article_news}>
              <p>
                La nueva <strong> #ProvoKing </strong>
                es ideal para los  que les gusta  combinar el queso provolone con pancito de masa madre, o tomates secos, o los que creen fundamental combinarla con carne a la parrilla!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default OffersPageDetails;