import { getProviders, getSession, signIn as LoginWhitProviders, } from 'next-auth/react';
import { LoadingOutlined } from '@ant-design/icons';
import { BsArrowLeft } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { GetServerSideProps } from 'next';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { Form } from 'antd';

import { RecoveryPassword } from '@/components/Modals/RecoveryPassword';
import styles from './styles.module.scss';
import { registerUser } from '@/client';

interface SigninPageProps {
  providers: Awaited<ReturnType<typeof getProviders>>;
  error: any;
}

const SigninPage = ({ providers, error }: SigninPageProps) => {
  const [loading, setLoading] = useState(false)
  const [showRecovery, setShowRecovery] = useState(false)
  const [showRegister, setSehowRegister] = useState(false)

  const handleLoginWhitEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {
    setLoading(true)
    await LoginWhitProviders('credentials', { email, password })
  }

  const handleRegisterWhitEmailAndPassword = async ({ username, email, phone, password }: { username: string, email: string, phone: string, password: string }) => {
    setLoading(true)
    try {
      const { data } = await registerUser({ username, email, phone, password })
      await LoginWhitProviders('credentials', { email, password })
    } catch (error: any) {
      console.log(error)
      // setShowError(true)
      // setErrorMessage(error.response.data.message)
      // setTimeout(() => {
      //   setShowError(false)
      // }, 3000);
    }
  }

  return (
    <div className={styles.login}>
      <Head>
        <title>Ingresar - Cuatro Carnes</title>
      </Head>
      <div className={styles.login__container}>
        <Link href='/' className={styles.login__container_goback}>
          <BsArrowLeft color='white' size={26} />
        </Link>
        <div className={styles.login__container_left}>
          <div className={styles.login__container_left_content}>
            <Image
              src='/assets/logo-frigorifico.svg'
              alt='image login'
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className={styles.login__container_rigth}>
          <h1 className={styles.login__container_rigth_title}>Bienvenido</h1>
          <h3 className={styles.login__container_rigth_subtitle}>Accede a tu cuenta</h3>
          <div className={styles.login__container_rigth_buttons}>
            {providers ? Object.values(providers).map((provider: any) => {
              if (provider.id === 'credentials') return null
              let icon;
              let color;
              switch (provider.id) {
                case 'facebook':
                  icon = <FaFacebook />
                  color = 'facebook'
                  break;
                case 'google':
                  icon = <FcGoogle />
                  break;
                default:
                  break;
              }
              return (
                <button key={provider.name} onClick={() => LoginWhitProviders(provider.id)} className={styles.button}>
                  <div className={styles.button__content}>
                    <FcGoogle size={28} />
                    <span>Iniciar sesión con </span>
                    <span>{provider.name}</span>
                  </div>
                </button>
              )
            }) : null}
            <div className={styles.divider__separators}>
              <hr className={styles.divider__hr1} />
              &nbsp;ó&nbsp;
              <hr className={styles.divider__hr1} />
            </div>
          </div>
          {error && (
            <div className={styles.login__error_message}>
              Datos de acceso incorrectos
            </div>
          )}
          <div className={styles.login__container_rigth_form}>
            {
              showRegister ? (
                <Form
                  onFinish={handleRegisterWhitEmailAndPassword}
                  autoComplete="off"
                >
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Por favor inserte su nombre de usuario.' }]}
                  >
                    <input className={styles.login__container_rigth_form_input} type="text" placeholder='Nombre de Usuario' />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Por favor inserte su correo.' }]}
                  >
                    <input className={styles.login__container_rigth_form_input} type="text" placeholder='Correo electronico' />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Por favor inserte su numero de telefono.' }]}
                  >
                    <input className={styles.login__container_rigth_form_input} type="text" placeholder='Numero de telefono' />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Por favor inserte una contraseña.' }]}
                  >
                    <input className={styles.login__container_rigth_form_input} type="password" placeholder='Contraseña' />
                  </Form.Item>
                  <button type='submit' className={styles.login__container_rigth_button}>REGISTRARSE</button>
                </Form>
              ) : (
                <Form
                  onFinish={handleLoginWhitEmailAndPassword}
                  autoComplete="off"
                >
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <input className={styles.login__container_rigth_form_input} type="text" placeholder='Correo electronico' />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <input className={styles.login__container_rigth_form_input} type="password" placeholder='Contraseña' />
                  </Form.Item>
                  <button type='submit' className={styles.login__container_rigth_button}>
                    {
                      loading
                        ? <LoadingOutlined className={styles.login__button_loading} />
                        : 'ACCEDER'
                    }
                  </button>
                </Form>
              )
            }

            <div className={styles.login__container_rigth_footer}>
              <a onClick={() => setShowRecovery(true)} href="#">He olvidado mi contraseña</a>
            </div>
            <div className={styles.login__container_rigth_footer}>
              <a onClick={() => setSehowRegister((state: boolean) => !state)} href="#">{showRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'} </a>
            </div>
          </div>
        </div>
      </div>
      <RecoveryPassword showRecovery={showRecovery} setShowRecovery={setShowRecovery} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req })
  const providers = await getProviders()

  const { p = '/', error = null } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }

  return {
    props: {
      providers,
      error
    }
  }

}

export default SigninPage;