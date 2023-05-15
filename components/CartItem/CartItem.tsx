import { useSelector, useDispatch } from 'react-redux';
import CurrencyFormat from 'react-currency-format';
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

  const removeItemToCart = (id: string) => {
    dispatch(removeFromCart(id))
  }

  return (
    <>
      {cart.map((item: any) => (
        <div className={styles.cart}>
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
            <button onClick={() => removeItemToCart(item._id)} className={styles.cart__end_button}>
              <AiOutlineClose color='#a92b3c' />
            </button>
          </div>
        </div>
      ))}
      <div className={styles.cart__subtotal}>
        <div className={styles.cart__subtotal_text}>
          Total
        </div>
        <div className={styles.cart__subtotal_price}>
          ${getCartTotal(cart)}
        </div>
      </div>
      <button onClick={() => router.push('/checkout')} className={styles.cart__button}>
        <span className={styles.cart__button_content}>
          <CurrencyFormat value={calculateDiscountedPrice()} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          <div>Pedir</div>
        </span>
      </button>
    </>
  )
}
