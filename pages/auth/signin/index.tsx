import Image from 'next/image';
import { getProviders, getSession, signIn as LoginWhitProviders, } from 'next-auth/react'
import { GetServerSideProps } from 'next';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import styles from './styles.module.scss'
import { BsArrowLeft } from 'react-icons/bs';
import Link from 'next/link';

interface SigninPageProps {
  providers: Awaited<ReturnType<typeof getProviders>>
}

const SigninPage = ({ providers }: SigninPageProps) => {

  console.log(providers)

  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <Link href='/' className={styles.login__container_goback}>
          <BsArrowLeft color='white' size={26} />
        </Link>
        <div className={styles.login__container_left}>
          <Image
            src='https://cdn.sanity.io/images/czqk28jt/prod_bk_us/de2821c5cf1912ad10fa47a3b6752847581f5fc1-1440x1800.jpg'
            alt='image login'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className={styles.login__container_rigth}>
          <h1 className={styles.login__container_rigth_title}>Bienvenido</h1>
          <h3 className={styles.login__container_rigth_subtitle}>Accede a tu cuenta</h3>
          <div className={styles.login__container_rigth_buttons}>
            {providers ? Object.values(providers).map((provider: any) => {
              if (provider.id === 'credentials') return null
              console.log(providers)
              let icon;
              let color;
              let variant;
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
          <div className={styles.login__container_rigth_form}>
            <input className={styles.login__container_rigth_form_input} type="text" placeholder='Correo electronico' />
            <input className={styles.login__container_rigth_form_input} type="password" placeholder='Contraseña' />
            <button className={styles.login__container_rigth_button}>ACCEDER</button>
            <div className={styles.login__container_rigth_footer}>
              <a href="">He olvidado mi contraseña</a>
            </div>
          </div>
        </div>
      </div>
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