import { useSelector, useDispatch } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';

import styles from './styles.module.scss'
import { getCartTotal, removeFromCart } from '@/store/cart/shoppingSlice'
import { IOption } from '@/interfaces/options';

export const CartItem = () => {
  const { cart, discount } = useSelector((state: any) => state.shopping)
  const dispatch = useDispatch()
  const router = useRouter()

  function calculateDiscountedPrice() {
    const discountValue = getCartTotal(cart) * discount;
    const priceWithDiscount = getCartTotal(cart) - discountValue;
    return priceWithDiscount;
  }

  const removeItemToCart = (index: number) => {
    dispatch(removeFromCart(index))
  }

  return (
    <>
      {cart.map((item: any, i: number) => (
        <div key={i} className={styles.cart}>
          <div className={styles.cart__start}>
            <span className={styles.cart__start_span}>{item.quantity}</span>
          </div>
          <div className={styles.cart__center}>
            <h3 className={styles.cart__center_title}>{item.title}</h3>
            {item.options.map((option: IOption) => (
              <div className={styles.cart__center_description}>{option.title}: {option.name}</div>
            ))}
          </div>
          <div className={styles.cart__end}>
            <span className={styles.cart__end_price}>${item.price.toFixed(2)}</span>
            <button onClick={() => removeItemToCart(i)} className={styles.cart__end_button}>
              <AiOutlineClose color='#a92b3c' />
            </button>
          </div>
        </div>
      ))}
      <div className={styles.cart__total}>
        <div className={styles.cart__total_text}>
          Descuento (%7)
        </div>
        <div className={styles.cart__total_price}>
          ${Math.round(getCartTotal(cart) * discount)}
        </div>
      </div>
      <div className={styles.cart__total}>
        <div className={styles.cart__total_text}>
          Subtotal
        </div>
        <div className={styles.cart__total_price}>
          <NumericFormat value={getCartTotal(cart)} prefix={'$'} displayType="text" />
        </div>
      </div>
      <div className={styles.cart__subtotal}>
        <div className={styles.cart__subtotal_text}>
          Total
        </div>
        <div className={styles.cart__subtotal_price}>
          <NumericFormat value={calculateDiscountedPrice()} prefix={'$'} displayType="text" />
        </div>
      </div>
      <button onClick={() => router.push('/checkout')} className={styles.cart__button}>
        <span className={styles.cart__button_content}>
          <NumericFormat value={calculateDiscountedPrice()} prefix={'$'} displayType="text" />
          <div>Pedir</div>
        </span>
      </button>
    </>
  )
}
