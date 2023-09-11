import { useDispatch, useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import { BiTrash } from 'react-icons/bi';
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
              <BiTrash size={16} color='#a92b3c' />
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
