import { addToCart } from "@/store/cart/shoppingSlice"
import { Button, Modal } from "antd"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useDispatch } from 'react-redux'

import styles from './styles.module.scss'

interface OrderModalProps {
  open: boolean;
  close: (value: boolean) => void
}

export const OrderModal = ({ open, close }: OrderModalProps) => {

  const dispatch = useDispatch()

  const addItemToCart = () => {
    dispatch(addToCart({
      _id: 3,
      price: 2000,
      quantity: 1,
      name: 'Combo Whopper 2x1',
      description: 'asdasdasdasdasd'
    }))
    close(false)
  }

  return (
    <Modal
      className={styles.modal}
      width={1000}
      open={open}
      onCancel={() => close(false)}
      footer={<div></div>}
    >
      <div className={styles.modal__container}>
        <div className={styles.modal__image_content}>
          <div className={styles.modal__image}></div>
        </div>
        <div className={styles.modal__content}>
          <div className={styles.modal__card}>
            <h2 className={styles.modal__title}>80% OFF en el segundo Combo Italiano Pategrás XL BK3</h2>
            <div className={styles.modal__subtitle}>2,400.00</div>
            <p>2 Combos con carne a la parrilla, pan, queso pategrás, tomate y mayonesa, acompañado con papas regulares y gaseosas regulares.</p>
            <hr className={styles.divider} />
            <div className={styles.modal__quantity}>
              <div className={styles.modal__quantity_actions}>
                <h3>Cantidad: 1</h3>
                <div className={styles.modal__quantity_buttons}>
                  <Button size="large" shape="circle">
                    <AiOutlineMinus size={24} color='grey' />
                  </Button>
                  <Button size="large" shape="circle" >
                    <AiOutlinePlus size={24} color='grey' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button__wrapper}>
            <button onClick={addItemToCart} className={styles.button}>
              <span className={styles.button__content}>
                <div>$ 2,400.00</div>
                <div>Añadir</div>
              </span>
            </button>
          </div>
        </div>
      </div >
    </Modal >
  )
}
