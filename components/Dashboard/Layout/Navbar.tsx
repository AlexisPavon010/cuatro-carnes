import { Avatar, Breadcrumb, Button, Col, Dropdown, MenuProps, Row, Space } from "antd";
import { signOut, useSession } from 'next-auth/react';
import { AiOutlineMenu } from 'react-icons/ai';

import styles from './styles.module.scss';

interface NavbarProps {
  openMenu: () => void;
  items: any;
}

export const Navbar = ({ openMenu, items: BreadItem }: NavbarProps) => {
  const { data: session } = useSession()

  const items: MenuProps['items'] = [
    {
      label: 'Cerrar Sesion',
      key: '3',
      onClick: () => signOut()
    },
  ];

  return (
    <header className={styles.header}>
      <Row align="middle" gutter={16}>
        <Col className={styles.header__menu} xs={2} md={0}>
          <Button type="link" onClick={openMenu} icon={<AiOutlineMenu size={24} color="#525F7F" />} />
        </Col>
        <Col xs={0} sm={12} lg={24} flex={1}>
          <Breadcrumb
            items={BreadItem}
          />
        </Col>
        <Col flex={1}>
        </Col>
        <Col>
          <Dropdown placement="bottomRight" menu={{ items }} trigger={['click']}>
            <Space>
              {session?.user?.name}
              <Avatar alt={session?.user?.name!} src={session?.user?.image}>
                {session?.user?.name?.substring(0, 1)}
              </Avatar>
            </Space>
          </Dropdown>
        </Col>
      </Row>
    </header >
  )
}