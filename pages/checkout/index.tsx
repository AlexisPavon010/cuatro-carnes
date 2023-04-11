import { Button, Form, Input, Select } from "antd";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react'

import { Layout } from "@/components/Layout";
import styles from './styles.module.scss'
import { getCartTotal } from "@/store/cart/shoppingSlice";
import { createOrder } from "@/client";

const { Option } = Select;

const CheckoutPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const { data: session }: any = useSession()
  const { cart } = useSelector((state: any) => state.shopping)

  useEffect(() => {
    if (!session) return
    form.setFieldsValue(session.user)
  }, [session])

  const onFinish = (values: any) => {
    setLoading(true)
    console.log({
      ...values,
      total: getCartTotal(cart),
      phoneNumber: values.code + values.phone
    })
    createOrder({
      ...values,
      total: getCartTotal(cart),
      phoneNumber: values.code + values.phone
    })
      .then(({ data }) => console.log(data))
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
    <Form.Item initialValue='549' name="code" noStyle>
      <Select className={styles.checkout__input_select} style={{ width: 70 }}>
        <Option value="569">+56</Option>
        <Option value="549">+54</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Layout>
      <div className={styles.checkout}>
        <div className={styles.checkout__container}>
          <div>
            <h1 className={styles.checkout_title}>Pagar ahora</h1>
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
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input name="username" className={styles.checkout__input} />
                  </Form.Item>

                  <Form.Item
                    label="Correo electronico"
                    name="email"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input type="email" className={styles.checkout__input} />
                  </Form.Item>

                  <Form.Item
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
                    label="Direccion"
                    name="address"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input className={styles.checkout__input} />
                  </Form.Item>

                  {/* <Form.Item
                    label="Username"
                    name="username3"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input className={styles.checkout__input} />
                  </Form.Item> */}

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
                  <h2 className={styles.checkout__content_summary_card_title}>OBELISCO- CARLOS PELLEGRINI 451</h2>
                  <p>En el local para aproximadamente 13:46</p>
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
                        {item.name}
                      </h3>
                      <p>{item.description}</p>
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
                    $ {getCartTotal(cart)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default CheckoutPage;