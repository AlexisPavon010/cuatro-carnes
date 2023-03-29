import { useState } from 'react'

import { Drawer } from "../Drawer"
import { Footer } from "../Footer"
import { Header } from "../Header"

interface LayoutProps {
  children: JSX.Element | JSX.Element[]
}

export const Layout = ({ children }: LayoutProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)
  return (
    <>
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
