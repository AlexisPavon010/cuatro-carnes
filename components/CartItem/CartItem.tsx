import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'

import styles from './styles.module.scss'
import { getCartTotal, removeFromCart } from '@/store/cart/shoppingSlice'
import { useRouter } from 'next/router'

export const CartItem = () => {
  const { cart } = useSelector((state: any) => state.shopping)
  const dispatch = useDispatch()
  const router = useRouter()

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
            <h3 className={styles.cart__center_title}>{item.name}</h3>
            <div className={styles.cart__center_description}>{item.description}</div>
            <div className={styles.cart__center_description}>Papas Fritas</div>
            <div className={styles.cart__center_description}>Papas Fritas</div>

          </div>
          <div className={styles.cart__end}>
            <span className={styles.cart__end_price}>${item.price.toFixed(2)}</span>
            <button onClick={() => removeItemToCart(item.id)} className={styles.cart__end_button}>
              <AiOutlineClose color='#502314' />
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
          <div>${getCartTotal(cart)}</div>
          <div>Pagar ahora</div>
        </span>
      </button>
    </>
  )
}
