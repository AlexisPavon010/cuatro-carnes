import { Drawer, Layout as AntLAyout, } from 'antd';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { SideMenu } from './SideMenu';

const { Sider, Content } = AntLAyout;

interface LayoutProps {
  children: JSX.Element | JSX.Element[]
}

export const Layout = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const openMenu = () => setIsMenuOpen(true)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <AntLAyout style={{ minHeight: '100vh', flexDirection: 'row' }}>
      <Sider onCollapse={(value) => setCollapsed(value)} collapsible collapsed={collapsed} width={250} theme="light">
        <SideMenu collapsed={collapsed} />
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
        <SideMenu collapsed={collapsed} />
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
