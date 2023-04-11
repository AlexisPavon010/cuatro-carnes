import { Button, Modal } from "antd"
import CurrencyFormat from 'react-currency-format';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'

import styles from './styles.module.scss'
import { IProduct } from "@/interfaces/products"
import { addToCart } from "@/store/cart/shoppingSlice"
import { useState } from "react";

interface OrderModalProps {
  open: { visible: boolean, product: undefined | IProduct };
  close: (value: { visible: boolean, product: undefined | IProduct }) => void
}

export const OrderModal = ({ open, close }: OrderModalProps) => {
  const [count, setCount] = useState(1)
  const dispatch = useDispatch()

  const { image, title, price, description } = open.product || {}

  const addItemToCart = () => {
    dispatch(addToCart({
      quantity: count,
      ...open.product
    }))
    close({ visible: false, product: undefined })
  }

  return (
    <Modal
      className={styles.modal}
      width={1000}
      open={open.visible}
      onCancel={() => close({ visible: false, product: undefined })}
      footer={<div></div>}
    >
      <div className={styles.modal__container}>
        <div className={styles.modal__image_content}>
          <div
            className={styles.modal__image}
            style={{
              backgroundImage: `url(${image})`
            }}
          ></div>
        </div>
        <div className={styles.modal__content}>
          <div className={styles.modal__card}>
            <h2 className={styles.modal__title}>{title}</h2>
            <div className={styles.modal__subtitle}>
              <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <p>{description}</p>
            <hr className={styles.divider} />
            <div className={styles.modal__quantity}>
              <div className={styles.modal__quantity_actions}>
                <h3>Cantidad: {count}</h3>
                <div className={styles.modal__quantity_buttons}>
                  <Button onClick={() => setCount((value) => value < 1 ? 0 : value - 1)} size="large" shape="circle">
                    <AiOutlineMinus size={24} color='grey' />
                  </Button>
                  <Button onClick={() => setCount(count + 1)} size="large" shape="circle" >
                    <AiOutlinePlus size={24} color='grey' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button__wrapper}>
            <button onClick={addItemToCart} className={styles.button}>
              <span className={styles.button__content}>
                <div>
                  <CurrencyFormat value={price! * count} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                </div>
                <div>Añadir</div>
              </span>
            </button>
          </div>
        </div>
      </div >
    </Modal >
  )
}
