import { Button, Col, Row, Space } from "antd"
import { AiOutlineMenu } from 'react-icons/ai';

import styles from './styles.module.scss'

interface NavbarProps {
  openMenu: () => void;
}

export const Navbar = ({ openMenu }: NavbarProps) => {
  return (
    <header className={styles.header}>
      <Row align="middle" gutter={16}>
        <Col className={styles.header__menu} xs={1} md={0}>
          <Button type="link" onClick={openMenu} icon={<AiOutlineMenu size={24} color="#525F7F" />} />
        </Col>
        <Col flex={1}>
          Tablero Operativo
        </Col>
        <Col>
          <Space size='large'>
            <h3>Cuenta: Tomas C.</h3>
            <p>Cerrar Session</p>
          </Space>
        </Col>
      </Row>
    </header>
  )
}