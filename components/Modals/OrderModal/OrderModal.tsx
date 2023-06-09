import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import CurrencyFormat from 'react-currency-format';
import { Button, Modal, Radio } from "antd";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import Image from "next/image";

import styles from './styles.module.scss'
import { IProduct } from "@/interfaces/products"
import { addToCart } from "@/store/cart/shoppingSlice"
import { IItem } from "@/interfaces/options";

interface OrderModalProps {
  open: { visible: boolean, product: undefined | IProduct };
  close: (value: { visible: boolean, product: undefined | IProduct }) => void
}

export const OrderModal = ({ open, close }: OrderModalProps) => {
  const [count, setCount] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<any>([])
  const dispatch = useDispatch()
  const { image, title, price, offert_price, description } = open.product || {}

  const productsWithItem = selectedOptions.filter((item: IItem) => item.item);
  const options = productsWithItem.map((item: IItem) => ({ title: item.name, name: item.item.name, price: item.item.price }));

  const handleOptionChange = (optionName: string, item: any) => {
    setSelectedOptions((prevSelectedOptions: any) => {
      // Busca si ya existe el item en las opciones seleccionadas
      const optionIndex = prevSelectedOptions.findIndex((option: any) => option.name === optionName);
      if (optionIndex >= 0) {
        // Si ya existe, actualiza el item seleccionado
        const updatedOptions = [...prevSelectedOptions];
        updatedOptions[optionIndex].item = item;
        return updatedOptions;
      } else {
        // Si no existe, agrega la nueva opción al array
        return [...prevSelectedOptions, { name: optionName, item }];
      }
    });
  };

  useEffect(() => {
    setCount(1)
    setSelectedOptions(
      open.product?.options?.map(option => ({
        name: option.name,
        item: null
      })) || []
    )
  }, [open.product])

  const addItemToCart = () => {
    dispatch(addToCart({
      quantity: count,
      ...open.product,
      options: options
    }))
    close({ visible: false, product: undefined })
  }

  return (
    <Modal
      className={styles.modal}
      style={{ top: 25 }}
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
            style={{
              objectFit: 'contain'
            }}
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
                  <Button onClick={() => setCount((value) => value === 1 ? 1 : value - 1)} size="middle" shape="circle">
                    <AiOutlineMinus size={24} color='grey' />
                  </Button>
                  <Button onClick={() => setCount(count + 1)} size="middle" shape="circle" >
                    <AiOutlinePlus size={24} color='grey' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={styles.combo_item_divider}></div> */}
          <div className={styles.modal_options}>
            {open.product?.options?.map((option) => (
              <>
                <div className={styles.modal_options_header}>
                  <h2 className={styles.modal_options_text}>{option.name}</h2>
                  <h2 className={styles.modal_options_text}>Seleccione una opción</h2>
                </div>
                <div className={styles.modal_options_list}>
                  <Button
                    type="text"
                    onClick={() => handleOptionChange(option.name, null)}
                    disabled={!selectedOptions.some(
                      (opt: any) =>
                        opt.name === option.name
                    )}
                  >
                    Quitar opciones
                  </Button>
                  {option.items.map((item) => (
                    <div className={styles.modal_options_list_item}>
                      <Radio
                        value={item}
                        onChange={() => handleOptionChange(option.name, item)}
                        checked={
                          selectedOptions.some(
                            (opt: any) =>
                              opt.name === option.name &&
                              opt.item &&
                              opt.item.name === item.name
                          )
                        }
                      />
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                    </div>
                  ))}
                </div>
                {/* <div className={styles.combo_item_divider}></div> */}
              </>
            ))}
          </div>
          {/* <div className={styles.combo_item_divider}></div> */}
        </div>
        <div className={styles.button__wrapper}>
          <button onClick={addItemToCart} className={styles.button}>
            <span className={styles.button__content}>
              <div>
                <CurrencyFormat
                  value={
                    count > 2
                      ? offert_price ? offert_price : price! * count
                      : price! * count
                  }
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              </div>
              <div>Añadir</div>
            </span>
          </button>
        </div>
      </div >
    </Modal >
  )
}
