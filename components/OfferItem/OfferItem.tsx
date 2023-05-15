import Image from 'next/image';

import styles from './styles.module.scss';
import { IProduct } from '@/interfaces/products';

interface OfferItemProps {
  product: IProduct
}

export const OfferItem = ({ product }: OfferItemProps) => {
  return (
    <div className={styles.slider__list_item} >
      <div className={styles.slider__list_item_image}>
        <Image src={product.image} width={150} height={120} alt='' />
        <div className={styles.slider__list_item_price}>
          ${product.offert_price.toFixed(2)}
        </div>
      </div>
      <h3 className={styles.slider__list_item_text}>{product.title}</h3>
    </div>
  )
}