import { LoadingOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import { Form, message } from "antd";
import { useState } from "react";
import Link from 'next/link';
import Head from 'next/head';

import styles from './styles.module.scss';
import { resetPassword } from "@/client";

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false)
  const { query } = useRouter();
  const router = useRouter()

  const handleChangePassword = ({ password }: { password: string }) => {
    setLoading(true)
    resetPassword(password, query.token!.toString())
      .then(({ data }: any) => {
        console.log(data)
        message.success('Contraseña recuperada.')
        router.push('/auth/signin')
      })
      .catch((error) => {
        message.error('La solicitud de recuperación expiro.')
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className={styles.login__container_rigth}>
      <Head>
        <title>Cambio de contraseña - Cuatro Carnes</title>
      </Head>
      <h1 className={styles.login__container_rigth_title}>Recuperación de contraseña</h1>
      <h3 className={styles.login__container_rigth_subtitle}>Escriba su nueva contraseña</h3>
      <div className={styles.login__container_rigth_form}>
        <Form
          onFinish={handleChangePassword}
          autoComplete="off"
        >
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor inserte una contraseña.' }]}
          >
            <input className={styles.login__container_rigth_form_input} type="password" placeholder='Contraseña' />
          </Form.Item>
          <button type='submit' className={styles.login__container_rigth_button}>
            {
              loading
                ? <LoadingOutlined className={styles.login__button_loading} />
                : 'RECUPERAR'
            }
          </button>
        </Form>
        <div className={styles.login__container_rigth_footer}>
          <Link href="/auth/signin">¿Ya tienes cuenta?</Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage;