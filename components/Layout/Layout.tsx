import { ConfigProvider } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { Drawer } from "../Drawer";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { CartDrawer } from '../CartDrawer';

const WhatsAppButton = dynamic(() =>
  import('../WhatsAppButton').then((mod) => mod.WhatsAppButton), {
  ssr: false
})

interface LayoutProps {
  children: JSX.Element | JSX.Element[]
  title: string
  description?: string
}

export const Layout = ({ children, title, description }: LayoutProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#a92b3c',
          colorBgElevated: '#f4e8e4'
        },
        components: {
          Table: {
            colorBgContainer: '#f4e8e4',
            colorBorderSecondary: '#5023140f',
          },
          Input: {
            colorBgContainer: 'transparent',
          },
          Button: {
            colorBgContainer: '#a92b3c',
            colorText: 'white',
          },
        }
      }}
    >
      <main>
        <Header openDrawer={openDrawer} />
        {children}
        <Drawer
          isDrawerOpen={isDrawerOpen}
          closeDrawer={closeDrawer}
        />
        <Footer />
        <WhatsAppButton />
        <CartDrawer />
      </main>
    </ConfigProvider >
  )
}
