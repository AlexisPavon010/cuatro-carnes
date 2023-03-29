import { Divider, Drawer as AntdDrawer } from 'antd'
import Link from 'next/link'

import styles from './styles.module.scss'

interface DrawerProps {
  isDrawerOpen: boolean
  closeDrawer: () => void
}

export const Drawer = ({ isDrawerOpen, closeDrawer }: DrawerProps) => {
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
      <div className={styles.drawer__item}>
        <Link className={styles.drawer__item_link} href="/">
          Configuración de la cuenta
        </Link>
      </div>
      <div className={styles.drawer__item}>
        <Link className={styles.drawer__item_link} href="/">
          Mis pedidos
        </Link>
      </div>
      <div className={styles.drawer__item}>
        <Link className={styles.drawer__item_link} href="/">
          Métodos de pago
        </Link>
      </div>
      <div className={styles.drawer__item}>
        <Link className={styles.drawer__item_link} href="/">
          Cerrar Sesión
        </Link>
      </div>
      <Divider />
      <div className={styles.drawer__item}>
        <Link className={styles.drawer__item_link} href="/">
          Menu
        </Link>
      </div>
      <div className={styles.drawer__item}>
        <Link className={styles.drawer__item_link} href="/">
          Locales
        </Link>
      </div>
      <div className={styles.drawer__item}>
        <Link className={styles.drawer__item_link} href="/">
          Ofertas
        </Link>
      </div>
      <div className={styles.drawer__item}>
        <Link className={styles.drawer__item_link} href="/">
          Nosotros
        </Link>
      </div>
      <div className={styles.drawer__item}>
        <Link className={styles.drawer__item_link} href="/">
          Cupones
        </Link>
      </div>
      <div className={styles.drawer__item}>
        <Link className={styles.drawer__item_link} href="/dashboard">
          Dashboard
        </Link>
      </div>
    </AntdDrawer >
  )
}
