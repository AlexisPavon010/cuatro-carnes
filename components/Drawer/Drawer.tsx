import { Divider, Drawer as AntdDrawer } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

import styles from './styles.module.scss'

interface DrawerProps {
  isDrawerOpen: boolean
  closeDrawer: () => void
}

export const Drawer = ({ isDrawerOpen, closeDrawer }: DrawerProps) => {
  const { data: session }: any = useSession()

  return (
    <AntdDrawer
      headerStyle={{
        display: 'none'
      }}
      rootClassName={styles.drawer__content}
      title="Basic Drawer"
      placement='bottom'
      onClose={closeDrawer}
      open={isDrawerOpen}
    >

      {session && (
        <>
          <div className={styles.drawer__session}>
            <div className={styles.drawer__session_user}>
              <svg className={styles.drawer__button_icon} xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 24" fill='#A92B3C'>
                <g>
                  <path d="M2,9.6c-0.2-1,0.8-1.8,1.6-1.3L7.3,10c0.5,0.3,1.2,0.1,1.5-0.5l2.1-3.7c0.5-0.8,1.6-0.8,2,0L15,9.6   c0.3,0.5,0.9,0.8,1.5,0.5l3.9-1.7C21.3,8,22.2,8.8,22,9.8l-1.7,8.1c-0.1,0.6-0.6,0.9-1.1,0.9H4.9c-0.5,0-1-0.4-1.1-0.9L2,9.6z" />
                </g>
              </svg>
              {session.user.name}
            </div>
          </div>
          <Link className={styles.drawer__item} href="/account-settings">
            Configuración de la cuenta
          </Link>
          <Link className={styles.drawer__item} href="/my-orders">
            Mis pedidos
          </Link>
          <Link className={styles.drawer__item} href="/">
            Métodos de pago
          </Link>
          {session?.user.role === 'admin' && (
            <Link className={styles.drawer__item} href="/dashboard">
              Dashboard
            </Link>
          )}
          <Link onClick={() => signOut()} className={styles.drawer__item} href="/#">
            Cerrar Sesión
          </Link>
          <Divider />
        </>
      )}
      <Link className={styles.drawer__item} href='/products'>
        Menu
      </Link>
      <Link className={styles.drawer__item} href="/">
        Locales
      </Link>
      <Link className={styles.drawer__item} href="/">
        Ofertas
      </Link>
      <Link className={styles.drawer__item} href="/nosotros">
        Nosotros
      </Link>
      <Link className={styles.drawer__item} href="/">
        Cupones
      </Link>
    </AntdDrawer >
  )
}
