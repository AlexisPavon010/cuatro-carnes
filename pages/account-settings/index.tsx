import { Button, Card, DatePicker, Form, Input, message } from 'antd';
import es_ES from "antd/lib/date-picker/locale/es_ES";
import { signOut, useSession } from 'next-auth/react';
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import moment from 'moment';

import { Layout } from '@/components/Layout';
import styles from './styles.module.scss';
import { updateUser } from '@/client';

const AccountSettings = () => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { data: session }: any = useSession()

  useEffect(() => {
    if (!session) return
    form.setFieldValue('name', session.user.name)
    form.setFieldValue('email', session.user.email)
    form.setFieldValue('birthday_date', moment(session.user.birthday_date))
    form.setFieldValue('phone', session.user.phone)
  }, [session])

  const handleUpdateUser = ({ name, phone, email, birthday_date }: any) => {
    setLoading(true)
    updateUser({
      birthday_date: moment(birthday_date.toISOString()),
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
                    locale={es_ES}
                    format="YYYY-MM-DD"
                    style={{ width: '100%' }}
                    rootClassName={styles.settings__card_input}
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