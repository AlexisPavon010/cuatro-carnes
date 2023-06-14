import { Breadcrumb, Button, Col, Row, Space } from "antd"
import { AiOutlineMenu } from 'react-icons/ai';
import { signOut, useSession } from 'next-auth/react'

import styles from './styles.module.scss'
import Link from "next/link";

interface NavbarProps {
  openMenu: () => void;
  items: any;
}

export const Navbar = ({ openMenu, items }: NavbarProps) => {
  const { data: session } = useSession()

  return (
    <header className={styles.header}>
      <Row align="middle" gutter={16}>
        <Col className={styles.header__menu} xs={1} md={0}>
          <Button type="link" onClick={openMenu} icon={<AiOutlineMenu size={24} color="#525F7F" />} />
        </Col>
        <Col flex={1}>
          <Breadcrumb
            items={items}
          />
        </Col>
        <Col>
          <Space size='large'>
            <h3>{session?.user?.name}</h3>
            <Button onClick={() => signOut()}>Cerrar Sesión</Button>
          </Space>
        </Col>
      </Row>
    </header>
  )
}