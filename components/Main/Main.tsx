import { MdDeliveryDining } from 'react-icons/md';
import { FaStoreAlt } from 'react-icons/fa';

import styles from './styles.module.scss'
import Link from 'next/link';

export const Main = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <div className={styles.hero__home}>
          <div className={styles.hero__card}>
            <div className={styles.hero__card_text}>
              <h1 className={styles.hero__card_text_h1}>
                ¿Qué le gustaría?
              </h1>
            </div>
            <div className={styles.hero__card_item}>
              <Link href='/products'>
                <div className={styles.hero__card_item_content}>
                  <div className={styles.hero__card_item_image}>
                    <FaStoreAlt color='white' size={24} />
                  </div>
                  <div className={styles.hero__card_item_text_wrap}>
                    <h2 className={styles.hero__card_item_text}>
                      Para retirar
                    </h2>
                    <p className={styles.hero__card_item_subtitle}>
                      El pedido se retira en nuestros locales
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className={styles.hero__card_item}>
              <Link href='/products'>
                <div className={styles.hero__card_item_content}>
                  <div className={styles.hero__card_item_image}>
                    <MdDeliveryDining color='white' size={24} />
                  </div>
                  <div className={styles.hero__card_item_text_wrap}>
                    <h2 className={styles.hero__card_item_text}>
                      Para delivery
                    </h2>
                    <p className={styles.hero__card_item_subtitle}>
                      El pedido se envia a su domicilio
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div >
    </section >
  )
}
