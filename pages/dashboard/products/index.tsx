import Head from 'next/head';

import { Layout } from '@/components/Dashboard/Layout/Layout'
import { ProductTable } from '@/components/Dashboard/ProductTable';

const DashboardPage = () => {

  return (
    <Layout>
      <Head>
        <title>Dashboard - Productos | Cuatro Carnes</title>
      </Head>
      <ProductTable />
    </Layout>
  )
}

export default DashboardPage