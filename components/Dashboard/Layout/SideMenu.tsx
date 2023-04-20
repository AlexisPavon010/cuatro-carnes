import { Divider, Menu } from "antd"
import Image from "next/image"
import { useRouter } from "next/router"
import { BsBoxSeam, BsTicketPerforated } from "react-icons/bs"
import { MdOutlineComputer } from "react-icons/md"
import { FiUsers } from "react-icons/fi"
import { BiCategory } from "react-icons/bi"
import { TfiMenuAlt } from "react-icons/tfi"
import { RiUserSettingsLine } from "react-icons/ri"

import styles from './styles.module.scss'

interface SideMenuProps {
  collapsed: boolean;
}

export const SideMenu = ({ collapsed }: SideMenuProps) => {
  const router = useRouter()

  return (
    <div className={styles.side}>
      {collapsed ? (
        <div className={styles.side__image_wrapper_logo}>
          <Image src='/assets/logo-side.svg' alt='logo cuatro carnes' width={80} height={50} />
        </div>
      ) : (
        <div className={styles.side__image_wrapper}>
          <Image src='/assets/logo-cuatro-carnes.svg' alt='logo cuatro carnes' width={180} height={70} />
        </div>
      )}
      <Divider />
      <Menu
        className={styles.side__menu}
        mode="inline"
        defaultSelectedKeys={[router.pathname]}
        items={[
          {
            key: '/dashboard',
            icon: <MdOutlineComputer size={20} />,
            label: 'Tablero Operativo',
            onClick: () => router.push('/dashboard/')
          },
          {
            key: '/dashboard/products',
            icon: <BsBoxSeam size={20} />,
            label: 'Productos',
            onClick: () => router.push('/dashboard/products')
          },
          {
            key: '/dashboard/categories',
            icon: <BiCategory size={20} />,
            label: 'Categorías',
            onClick: () => router.push('/dashboard/categories')
          },
          {
            key: '/dashboard/opciones',
            icon: <TfiMenuAlt size={20} />,
            label: 'Opciones',
            onClick: () => router.push('/dashboard/options')
          },
          {
            key: '/dashboard/cupons',
            icon: <BsTicketPerforated size={20} />,
            label: 'Cupones',
            onClick: () => router.push('/dashboard/coupons')
          },
          {
            key: '/dashboard/clients',
            icon: <FiUsers size={20} />,
            label: 'Clientes',
            onClick: () => router.push('/dashboard/customers')
          },
          {
            key: '/dashboard/users',
            icon: <RiUserSettingsLine size={20} />,
            label: 'Usuarios',
            onClick: () => router.push('/dashboard/users')
          },
        ]}
      />
    </div>
  )
}
