import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { BsCartPlus } from 'react-icons/bs';

import styles from './styles.module.scss';
import { IProduct } from '@/interfaces/products';
import { addToCart } from '@/store/cart/shoppingSlice';
import { setOpenCartDrawer } from '@/store/ui/uiSlice';

interface OfferItemProps {
  product: IProduct;
}

export const OfferItem = ({ product }: OfferItemProps) => {
  const { image, offert_price, is_offer, price, title, stock } = product || {};
  const dispatch = useDispatch()

  const url = is_offer ? '/assets/ofertas_cuatro_carnes.jpg' : '/assets/generico_productos.png'

  const handleAddToCart = () => {
    dispatch(addToCart({
      quantity: 1,
      ...product,
      price: is_offer ? offert_price : price,
      options: []
    }))
    dispatch(setOpenCartDrawer(true))
  }

  return (
    <div className={styles.slider__list_item} >
      <div className={styles.slider__list_item_plus} onClick={handleAddToCart} >
        <BsCartPlus color='#f4e8e4' size={20} />
      </div>
      <div className={styles.slider__list_item_image}
        style={{
          backgroundImage: `url(${url})`
        }}
      >
        <Image src={image} width={150} height={120} alt='' />
        <div className={styles.slider__list_item_price}>
          ${is_offer ? offert_price?.toFixed(2) : price || '00.00'}{` x ${stock === 'KILOGRAM' ? 'Kg' : 'Ud'}`}.
        </div>
      </div>
      <h3 className={styles.slider__list_item_text}>{title}</h3>
    </div>
  )
}