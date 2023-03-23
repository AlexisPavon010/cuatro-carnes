import { Divider, Menu } from "antd"
import Image from "next/image"
import { useRouter } from "next/router"
import { BsBoxSeam, BsFillBoxFill, BsTicketPerforated } from "react-icons/bs"
import { MdOutlineComputer } from "react-icons/md"
import { FiUsers } from "react-icons/fi"
import { BiCategory } from "react-icons/bi"


import styles from './styles.module.scss'

export const SideMenu = () => {
  const router = useRouter()

  return (
    <div className={styles.side}>
      <div className={styles.side__image_wrapper}>
        <Image src='/assets/logo-cuatro-carnes.svg' alt='logo cuatro carnes' width={180} height={70} />
      </div>
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
            label: 'Categorias',
            onClick: () => router.push('/dashboard')
          },
          {
            key: '/dashboard/cupons',
            icon: <BsTicketPerforated size={20} />,
            label: 'Cupones',
            onClick: () => router.push('/dashboard')
          },
          {
            key: '/dashboard/clients',
            icon: <FiUsers size={20} />,
            label: 'Clientes',
            onClick: () => router.push('/dashboard')
          },
        ]}
      />
    </div>
  )
}
