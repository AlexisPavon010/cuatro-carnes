import Image from 'next/image';
import { BsCartPlus } from 'react-icons/bs';

import styles from './styles.module.scss';
import { IProduct } from '@/interfaces/products';

interface OfferItemProps {
  product: IProduct;
  setOpenModal?: (state: {
    visible: boolean;
    product: undefined | IProduct;
  }) => void
}

export const OfferItem = ({ product, setOpenModal }: OfferItemProps) => {
  return (
    <div className={styles.slider__list_item} >
      {setOpenModal && (
        <div className={styles.slider__list_item_plus} onClick={() => setOpenModal({ visible: true, product: { ...product, price: product.offert_price } })} >
          <BsCartPlus color='white' size={20} />
        </div>
      )}
      <div className={styles.slider__list_item_image}>
        <Image src={product.image} width={150} height={120} alt='' />
        <div className={styles.slider__list_item_price}>
          ${product.offert_price ? product.offert_price.toFixed(2) : '00.00'} x Kg.
        </div>
      </div>
      <h3 className={styles.slider__list_item_text}>{product.title}</h3>
    </div>
  )
}