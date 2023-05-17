import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { BsCartPlus } from 'react-icons/bs';

import styles from './styles.module.scss';
import { IProduct } from '@/interfaces/products';
import { addToCart } from '@/store/cart/shoppingSlice'

interface OfferItemProps {
  product: IProduct
}

export const OfferItem = ({ product }: OfferItemProps) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleAddToCart = () => {
    dispatch(addToCart({
      quantity: 1,
      ...product,
      options: [],
      price: product.offert_price,
    }))
    router.push('/checkout')
  }

  return (
    <div className={styles.slider__list_item} >
      <div className={styles.slider__list_item_plus} onClick={handleAddToCart} >
        <BsCartPlus color='white' size={20} />
      </div>
      <div className={styles.slider__list_item_image}>
        <Image src={product.image} width={150} height={120} alt='' />
        <div className={styles.slider__list_item_price}>
          ${product.offert_price ? product.offert_price.toFixed(2) : '00.00'}
        </div>
      </div>
      <h3 className={styles.slider__list_item_text}>{product.title}</h3>
    </div>
  )
}