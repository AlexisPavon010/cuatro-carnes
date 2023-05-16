import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { Drawer } from 'antd';

import { getCartTotal, removeFromCart } from '@/store/cart/shoppingSlice';
import { IOption } from '@/interfaces/options';
import styles from './styles.module.scss';

interface CartItemMobilePros {
  open: boolean;
  close: (value: boolean) => void
}

export const CartItemMobile = ({ open, close }: CartItemMobilePros) => {
  const { cart, discount } = useSelector((state: any) => state.shopping)
  const dispatch = useDispatch();
  const router = useRouter();

  function calculateDiscountedPrice() {
    const discountValue = getCartTotal(cart) * discount;
    const priceWithDiscount = getCartTotal(cart) - discountValue;
    return priceWithDiscount;
  }

  const removeItemToCart = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const onClose = () => {
    close(false);
  };

  return (
    <Drawer
      title="Resumen de la Orden"
      placement="right"
      onClose={onClose}
      open={open}
    >
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
      <div className={styles.list__mobile_content}>
        <button onClick={() => router.push('/checkout')} className={styles.list__mobile_button}>
          <span className={styles.list__mobile_button_content}>
            <div>${calculateDiscountedPrice()}</div>
            <div>Pedir</div>
          </span>
        </button>
      </div>
    </Drawer>
  )
}
