import { useState } from 'react'

import { Drawer } from "../Drawer"
import { Footer } from "../Footer"
import { Header } from "../Header"
import Head from 'next/head'

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
    <>
      <Head>
        <title>{title}</title>
        {description && (
          <meta name="description" content={description} />
        )}
      </Head>
      <Header openDrawer={openDrawer} />
      {children}
      <Drawer
        isDrawerOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
      />
      <Footer />
    </>
  )
}
