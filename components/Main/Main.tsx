import { MdDeliveryDining } from 'react-icons/md';
import { FaStoreAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import styles from './styles.module.scss'
import { setShippingMethod } from '@/store/cart/shoppingSlice';
import { MapboxMaps } from '../MapboxMaps';
import { setShowMap } from '@/store/places/placesSlice';

export const Main = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleNavigate = (method: string) => {
    dispatch(setShippingMethod(method))
    if (method === 'delivery') {
      dispatch(setShowMap(true))
      dispatch(setShippingMethod(method))
    } else {
      router.push('/products')
    }
  }

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
            <div className={styles.hero__card_item} onClick={() => handleNavigate('pickup')}>
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
            </div>
            <div className={styles.hero__card_item} onClick={() => handleNavigate('delivery')}>
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
            </div>
          </div>
        </div>
      </div >
      <MapboxMaps />
    </section >
  )
}
