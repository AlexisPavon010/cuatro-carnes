import Head from 'next/head';
import React from 'react';

import { CategoriesTable } from '@/components/Dashboard/CategoriesTable';
import { Layout } from '@/components/Dashboard/Layout';

const CategoriesPage = () => {
  return (
    <Layout>
      <Head>
        <title>Dashboard - Categorías | Cuatro Carnes</title>
      </Head>
      <CategoriesTable />
    </Layout>
  )
}

export default CategoriesPage;