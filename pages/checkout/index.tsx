import { Button, Card, Form, Input, Radio, Result, Select, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormat from 'react-currency-format';
import { parseCookies, setCookie } from "nookies";
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import { emptyCart, getCartTotal } from "@/store/cart/shoppingSlice";
import { Layout } from "@/components/Layout";
import styles from './styles.module.scss';
import { createOrder } from "@/client";
import { sendSucces } from "@/client/Email";

const { Option } = Select;

const CheckoutPage = () => {
  const { pickUpTime, userDirection, userLocation } = useSelector((state: any) => state.places)
  const { cart, pickup_or_delivery, discount } = useSelector((state: any) => state.shopping)
  const [orderID, setOrderID] = useState('000000')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { data: session }: any = useSession()
  const [form] = Form.useForm();
  const router = useRouter()
  const dispatch = useDispatch()

  function calculateDiscountedPrice() {
    const discountValue = getCartTotal(cart) * discount;
    const priceWithDiscount = getCartTotal(cart) - discountValue;
    return priceWithDiscount;
  }

  useEffect(() => {
    if (!session) return
    form.setFieldsValue({
      ...session.user,
      username: session.user.name
    })
  }, [session])

  const {
    reference,
    address,
    phone,
    code
  } = parseCookies()

  const onFinish = (values: any) => {
    if (cart.length === 0) return router.push('/')
    setLoading(true)
    setCookie(null, 'address', values.address, { path: '/', })
    setCookie(null, 'reference', values.reference ? values.reference : '', { path: '/', })
    setCookie(null, 'code', values.code, { path: '/', })
    setCookie(null, 'phone', values.phone, { path: '/', })
    console.log({
      ...values,
      items: cart,
      total: getCartTotal(cart),
      phone: values.code + values.phone
    })
    sendSucces({
      ...values,
      items: cart,
      total: getCartTotal(cart),
      phone: values.code + values.phone
    })
      .then(({ data }) => { console.log(data) })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
    createOrder({
      ...values,
      items: cart,
      total: getCartTotal(cart),
      sub_total: calculateDiscountedPrice(),
      phone: values.code + values.phone,
      cords: userLocation,
      shipping: pickup_or_delivery,
    })
      .then(({ data }) => {
        console.log(data)
        setSuccess(true)
        setOrderID(data.uniqueID)
        dispatch(emptyCart())
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }
  const onFinishFailed = () => { }

  const validatePhone = (rule: any, value: any, callback: any) => {
    const pattern = /^\d{10}$/; // regex que verifica si el número tiene 10 dígitos
    if (value && !pattern.test(value)) {
      callback('Por favor, ingrese un número de teléfono válido');
    } else {
      callback();
    }
  };

  const selectCodeArea = (
    <Form.Item
      initialValue={code ? code : '549'}
      name="code"
      noStyle
    >
      <Select className={styles.checkout__input_select} style={{ width: 70 }}>
        <Option value="569">+56</Option>
        <Option value="549">+54</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Layout title="Checkout - Cuatro Carnes">
      {success ? (
        <div className={styles.checkout}>
          <div className={styles.checkout__container}>
            <Card
              style={{ border: 'none', padding: 0 }}
              bodyStyle={{
                minHeight: '400px',
                height: 'calc(100vh - 500px)',
                backgroundColor: '#f4e8e4',
                padding: 0
              }}
            >
              <Result
                status="success"
                title="Su orden fue tomada con exito"
                subTitle={`Numero de Orden: #${orderID}. Nos comunicaremos con usted en breve.`}
                extra={[
                  <Button onClick={() => router.push('/my-orders')} type="primary" key="console">
                    Ver pedido
                  </Button>,
                  <Button onClick={() => router.push('/products')} key="buy">Volver a ordenar</Button>,
                ]}
              />
            </Card>
          </div>
        </div>
      ) : (

        <div className={styles.checkout}>
          <div className={styles.checkout__container}>
            <div>
              <h1 className={styles.checkout_title}>Ordenar ahora</h1>
            </div>
            <div className={styles.checkout__content}>
              <div className={styles.checkout__content_form}>
                <h2 className={styles.checkout_subtitle}>Información de contacto</h2>
                <div className={styles.checkout__content_card}>
                  <Form
                    form={form}
                    name="checkout"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    requiredMark={false}
                  >
                    <Form.Item
                      label="Tu nombre"
                      name="username"
                      rules={[{ required: true, message: 'Escriba su nombre' }]}
                    >
                      <Input name="username" className={styles.checkout__input} />
                    </Form.Item>

                    <Form.Item
                      label="Correo electronico"
                      name="email"
                      rules={[{ required: true, message: 'Escriba su correo' }]}
                    >
                      <Input type="email" className={styles.checkout__input} />
                    </Form.Item>

                    <Form.Item
                      initialValue={phone}
                      label="Numero de telefono"
                      name='phone'
                      rules={[
                        {
                          required: true,
                          message: 'Por favor ingrese su teléfono',
                        },
                        {
                          validator: validatePhone,
                        },
                      ]}
                    >
                      <Input type="number" className={styles.checkout__input} addonBefore={selectCodeArea} />
                    </Form.Item>

                    <Form.Item
                      label="Dirección"
                      name="address"
                      initialValue={userDirection || address}
                      rules={[{ required: true, message: 'Escriba una dirección' }]}
                    >
                      <Input className={styles.checkout__input} />
                    </Form.Item>

                    <Form.Item
                      label="Depto / Piso / Timbre / Lote"
                      initialValue={'' || reference}
                      name="reference"
                    >
                      <Input className={styles.checkout__input} />
                    </Form.Item>

                    <Space>
                      <Form.Item
                        label="Medios de Pago"
                        name="payment_option"
                        rules={[{ required: true, message: 'Seleccione un metodo de pago' }]}
                      >
                        <Radio.Group>
                          <Radio value='credit_card'>Tarjeta de Credito</Radio>
                          <Radio value='cash'>Efectivo</Radio>
                          <Radio value='debit_card'>Tarjeta de Debito</Radio>
                          <Radio value='bank_transfer'>Transferencia</Radio>
                          {/* <Radio value='payment_market'>Mercado Pago</Radio> */}
                        </Radio.Group>
                      </Form.Item>
                    </Space>

                    <Form.Item>
                      <Button loading={loading} block type="primary" htmlType="submit">
                        Ordenar
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
              <div className={styles.checkout__content_summary}>
                <h2 className={styles.checkout_subtitle}>Resumen de la orden</h2>
                <div className={styles.checkout__content_summary_card}>
                  <div>
                    <h2 className={styles.checkout__content_summary_card_title}>{userDirection}</h2>
                    <p>
                      {
                        pickup_or_delivery === 'DELIVERY'
                          ? `Delivery para aproximadamente ${pickUpTime}`
                          : `En el local para aproximadamente ${pickUpTime}`
                      }
                    </p>
                  </div>
                </div>
                <div className={styles.checkout__content_summary_card}>
                  {cart.map((item: any) => (
                    <div className={styles.checkout__content_summary_card_order}>
                      <div>
                        <span className={styles.checkout__content_summary_card_order_span}>
                          {item.quantity}
                        </span>
                      </div>
                      <div className={styles.checkout__content_summary_card_span}>
                        <h3 className={styles.checkout__content_summary_card_order_title}>
                          {item.title}
                        </h3>
                        {/* <p>{item.description}</p> */}
                      </div>
                      <div>
                        <span>
                          ${item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                  <hr className={styles.divider} />
                  <div className={styles.checkout__total}>
                    <span className={styles.checkout__title}>
                      Total
                    </span>
                    <span className={styles.checkout__title}>
                      <CurrencyFormat value={calculateDiscountedPrice()} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </Layout >
  )
}

export default CheckoutPage;