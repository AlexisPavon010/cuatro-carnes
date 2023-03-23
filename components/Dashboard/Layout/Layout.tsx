import { Drawer, Layout as AntLAyout, } from 'antd';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { SideMenu } from './SideMenu';

const { Sider, Header, Content } = AntLAyout;

interface LayoutProps {
  children: JSX.Element | JSX.Element[]
}

export const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const openMenu = () => setIsMenuOpen(true)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <AntLAyout style={{ minHeight: '100vh', flexDirection: 'row' }}>
      <Sider width={250} theme="light">
        <SideMenu />
      </Sider>
      <Drawer
        placement="left"
        closable={false}
        onClose={closeMenu}
        open={isMenuOpen}
        width={300}
        bodyStyle={{
          padding: 0
        }}
      >
        <SideMenu />
      </Drawer>
      <AntLAyout>
        <Navbar openMenu={openMenu} />
        <Content
          style={{
            padding: 24,
          }}
        >
          {children}
        </Content>
      </AntLAyout>
    </AntLAyout>
  )
}
