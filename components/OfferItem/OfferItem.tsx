import Image from 'next/image';
import { BsCartPlus } from 'react-icons/bs';

import styles from './styles.module.scss';
import { IProduct } from '@/interfaces/products';
import { addToCart } from '@/store/cart/shoppingSlice';
import { useDispatch } from 'react-redux';
import { setOpenCartDrawer } from '@/store/ui/uiSlice';

interface OfferItemProps {
  product: IProduct;
}

export const OfferItem = ({ product }: OfferItemProps) => {
  const { image, offert_price, title, stock } = product || {};
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({
      quantity: 1,
      ...product,
      price: offert_price,
      options: []
    }))
    dispatch(setOpenCartDrawer(true))
  }

  return (
    <div className={styles.slider__list_item} >
      <div className={styles.slider__list_item_plus} onClick={handleAddToCart} >
        <BsCartPlus color='white' size={20} />
      </div>
      <div className={styles.slider__list_item_image}>
        <Image src={image} width={150} height={120} alt='' />
        <div className={styles.slider__list_item_price}>
          ${offert_price ? offert_price.toFixed(2) : '00.00'}{` x ${stock === 'KILOGRAM' ? 'Kg' : 'Ud'}`}.
        </div>
      </div>
      <h3 className={styles.slider__list_item_text}>{title}</h3>
    </div>
  )
}