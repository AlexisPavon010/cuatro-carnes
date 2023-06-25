import DatePicker, { registerLocale } from "react-datepicker";
import { Button, Card, Form, Input, message } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale('es', es)

import { Layout } from '@/components/Layout';
import styles from './styles.module.scss';
import { updateUser } from '@/client';
import { useSwrFetcher } from "@/hooks/useSwrFetcher";

const AccountSettings = () => {
  const [loading, setLoading] = useState(false)
  const { data: session }: any = useSession()
  const { data: { birthday_date } } = useSwrFetcher(`/api/users/${session?.user?.id}`)
  const [startDate, setStartDate] = useState(moment(birthday_date).toDate());
  const [form] = Form.useForm()

  useEffect(() => {
    if (!session) return
    setStartDate(moment(birthday_date).toDate())
    form.setFieldValue('name', session.user.name)
    form.setFieldValue('email', session.user.email)
    form.setFieldValue('phone', session.user.phone)
  }, [session, birthday_date])

  const handleUpdateUser = ({ name, phone, email }: any) => {
    setLoading(true)
    updateUser({
      birthday_date: startDate.toISOString(),
      id: session?.user.id,
      username: name,
      phone,
      email,
    })
      .then(({ data }) => {
        console.log(data)
        message.success('Usuario actualizado con exito')
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

  return (
    <Layout title='Configuración de la cuenta - Cuatro Carnes'>
      <div className={styles.settings}>
        <div className={styles.settings__container}>
          <div className={styles.settings__content}>
            <h1 className={styles.settings__account_title}>
              Configuración de la cuenta
            </h1>
            <Form
              form={form}
              layout='vertical'
              requiredMark={false}
              onFinish={handleUpdateUser}
            >
              <Card rootClassName={styles.settings__card}>
                <Form.Item
                  label='Nombre de Usuario'
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input rootClassName={styles.settings__card_input} placeholder="Inserte un nombre de usuario" />
                </Form.Item>

                <Form.Item
                  label='Correo'
                  name="email"
                >
                  <Input rootClassName={styles.settings__card_input} placeholder="Inserte un correo valido" disabled />
                </Form.Item>

                <Form.Item
                  label='Fecha de cumpleaños'
                  name="birthday_date"
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    locale={es}
                    selected={startDate}
                    className={styles.settings__card_input}
                    onChange={(date: Date) => setStartDate(date)}
                  />
                </Form.Item>

                <Form.Item
                  label='Telefono'
                  name="phone"
                  rules={[{ required: true }]}
                >
                  <Input rootClassName={styles.settings__card_input} placeholder="Inserte un numero de telefono valido" />
                </Form.Item>
              </Card>

              <Card rootClassName={styles.settings__card}>
                <Button rootClassName={styles.settings__card_input} onClick={() => signOut()}>Cerrar Sesión</Button>
              </Card>

              <Form.Item style={{ marginTop: '20px' }}>
                <button type='submit' className={styles.settings__button}>
                  {
                    loading
                      ? <LoadingOutlined className={styles.settings__button_loading} />
                      : 'GUARDAR'
                  }
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default AccountSettings;