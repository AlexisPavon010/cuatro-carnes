import Head from 'next/head';
import Link from 'next/link';

import { CategoriesTable } from '@/components/Dashboard/CategoriesTable';
import { Layout } from '@/components/Dashboard/Layout';

const CategoriesPage = () => {
  return (
    <Layout
      items={[
        {
          title: 'Dashboard',
        },
        {
          title: <Link href="/dashboard/categories">Categorías</Link>,
        }
      ]}
    >
      <Head>
        <title>Dashboard - Categorías | Cuatro Carnes</title>
      </Head>
      <CategoriesTable />
    </Layout>
  )
}

export default CategoriesPage;