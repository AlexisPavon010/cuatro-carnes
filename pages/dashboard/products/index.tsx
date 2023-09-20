import Head from 'next/head';
import Link from 'next/link';

import { Layout } from '@/components/Dashboard/Layout/Layout'
import { ProductTable } from '@/components/Dashboard/ProductTable';

const DashboardPage = () => {

  return (
    <Layout
      items={
        [
          {
            title: 'Dashboard',
          },
          {
            title: <Link href="/dashboard/products">Productos</Link>,
          }
        ]}
    >
      <Head>
        <title>Dashboard - Productos | Cuatro Carnes</title>
      </Head>
      <ProductTable />
    </Layout>
  )
}

export default DashboardPage