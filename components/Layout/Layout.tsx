import { ConfigProvider } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Head from 'next/head';

import { Drawer } from "../Drawer";
import { Footer } from "../Footer";
import { Header } from "../Header";

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
        },
      }}
    >
      <Head>
        <title>{title}</title>
        {description && (
          <meta name="description" content={description} />
        )}
        <meta property="og:site_name" content="Bienvenidos a Cuatro Carnes" />
        <meta property="og:image" content="https://cuatro-carnes.vercel.app/assets/logo-side.svg" />
        <meta property="og:image:height" content="813" />
        <meta property="og:image:width" content="813" />
      </Head>
      <Header openDrawer={openDrawer} />
      {children}
      <Drawer
        isDrawerOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
      />
      <Footer />
      <WhatsAppButton />
    </ConfigProvider>
  )
}
