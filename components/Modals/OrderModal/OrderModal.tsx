import { Button, Checkbox, Modal, Radio } from "antd"
import CurrencyFormat from 'react-currency-format';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useDispatch } from 'react-redux'
import Image from "next/image";

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
      open={open.visible}
      onCancel={() => close({ visible: false, product: undefined })}
      footer={<div></div>}
    >
      <div className={styles.modal__container}>
        <div className={styles.modal__image_content}>
          <Image
            src={image!}
            alt={title!}
            width={300}
            height={270}
          />
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
          <div className={styles.combo_item_divider}></div>
          <div className={styles.modal_options}>
            <div className={styles.modal_options_header}>
              <h2 className={styles.modal_options_text}>Tipo de corte</h2>
            </div>
            <div className={styles.modal_options_list}>
              <div className={styles.modal_options_list_item}>
                <Radio value='opcion 1' onChange={({ target }) => console.log(target.value)} />
                <span>Bifes de 1 dedo</span>
              </div>
              <div className={styles.modal_options_list_item}>
                <Radio value='opcion 1' onChange={({ target }) => console.log(target.value)} />
                <span>Bifes de 1 dedo</span>
              </div>
              <div className={styles.modal_options_list_item}>
                <Radio value='opcion 1' onChange={({ target }) => console.log(target.value)} />
                <span>Bifes de 1 dedo</span>
              </div>
              <div className={styles.modal_options_list_item}>
                <Radio value='opcion 1' onChange={({ target }) => console.log(target.value)} />
                <span>Bifes de 1 dedo</span>
              </div>
            </div>
          </div>
          <div className={styles.combo_item_divider}></div>
          <div className={styles.modal_options}>
            <div className={styles.modal_options_header}>
              <h2 className={styles.modal_options_text}>Tipo de corte</h2>
            </div>
            <div className={styles.modal_options_list}>
              <div className={styles.modal_options_list_item}>
                <Radio value='opcion 1' onChange={({ target }) => console.log(target.value)} />
                <span>Bifes de 1 dedo</span>
              </div>
              <div className={styles.modal_options_list_item}>
                <Radio value='opcion 1' onChange={({ target }) => console.log(target.value)} />
                <span>Bifes de 1 dedo</span>
              </div>
              <div className={styles.modal_options_list_item}>
                <Radio value='opcion 1' onChange={({ target }) => console.log(target.value)} />
                <span>Bifes de 1 dedo</span>
              </div>
              <div className={styles.modal_options_list_item}>
                <Radio value='opcion 1' onChange={({ target }) => console.log(target.value)} />
                <span>Bifes de 1 dedo</span>
              </div>
            </div>
          </div>
          <div className={styles.combo_item_divider}></div>
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
      </div >
    </Modal >
  )
}
