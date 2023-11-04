import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { NumericFormat } from 'react-number-format';
import { Button, Modal, Radio, Tooltip } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import Image from "next/image";

import { addToCart } from "@/store/cart/shoppingSlice";
import { IItem } from "@/interfaces/options";
import styles from './styles.module.scss';
import { setOpenCartDrawer, setOpenOrderModal } from "@/store/ui/uiSlice";
import { IProduct } from "@/interfaces/products";

export const OrderModal = () => {
  const { is_open_modal } = useSelector((state: any) => state.ui)
  const [count, setCount] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<any>([])
  const dispatch = useDispatch()
  const { product, visible } = is_open_modal
  const { image, title, price, offert_price, description, is_new, is_offer, is_offer_quantity, offer_quantity_price, offer_quantity } = product as IProduct || {}

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

  const calculatePrice = () => {
    if (is_offer_quantity) {
      const finalPrice = count >= offer_quantity ? count * offer_quantity_price : count * price
      return finalPrice;
    } else if (is_offer) {
      return offert_price * count;
    } else {
      return price * count;
    }
  };

  useEffect(() => {
    setCount(1)
    setSelectedOptions(
      product?.options?.map((option: any) => ({
        name: option.name,
        item: null
      })) || []
    )
  }, [product])

  const addItemToCart = () => {
    dispatch(setOpenCartDrawer(true))
    dispatch(addToCart({
      quantity: count,
      ...product,
      options: options
    }))
    handleCloseModal()
  }

  const handleCloseModal = () => {
    dispatch(setOpenOrderModal({ visible: false, product: undefined }))
  }

  return (
    <Modal
      className={styles.modal}
      style={{ top: 25 }}
      open={visible}
      onCancel={() => handleCloseModal()}
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
              {is_offer && (
                <p className={styles.modal__subtitle_offer}>${price}</p>
              )}
              <NumericFormat value={is_offer ? offert_price : price} prefix={'$'} displayType="text" />
            </div>
            <p>{description}</p>
            <hr className={styles.divider} />
            <div className={styles.modal__quantity}>
              <div className={styles.modal__quantity_actions}>
                <h3>Cantidad: {count}</h3>
                <div className={styles.modal__quantity_buttons}>
                  <Button onClick={() => setCount((value) => value === 1 ? 1 : value - 1)} size="middle" shape="circle">
                    <AiOutlineMinus size={24} color='white' />
                  </Button>
                  <Button onClick={() => setCount(count + 1)} size="middle" shape="circle" >
                    <AiOutlinePlus size={24} color='white' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={styles.combo_item_divider}></div> */}
          <div className={styles.modal_options}>
            {product?.options?.map((option: any) => (
              <>
                <div className={styles.modal_options_header}>
                  <h2 className={styles.modal_options_text}>{option.name}</h2>
                  <h2 className={styles.modal_options_text}>Seleccione una opción</h2>
                </div>
                <div className={styles.modal_options_list}>
                  <div className={styles.modal_options_button}>
                    <p>Opciones:</p>
                    <Tooltip title='Quitar Opciones'>
                      <Button
                        shape="circle"
                        size="middle"
                        type="text"
                        onClick={() => handleOptionChange(option.name, null)}
                        disabled={!selectedOptions.some(
                          (opt: any) =>
                            opt.name === option.name
                        )}
                      >
                        <AiOutlineClose size={24} color='grey' />
                      </Button>
                    </Tooltip>
                  </div>
                  {option.items.map((item: any) => (
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
                <NumericFormat
                  value={calculatePrice()}
                  displayType="text"
                  decimalScale={2}
                  fixedDecimalScale
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
