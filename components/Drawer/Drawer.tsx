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
