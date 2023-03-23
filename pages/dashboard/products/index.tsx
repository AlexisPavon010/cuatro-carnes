import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { Layout } from '@/components/Dashboard/Layout/Layout'
import { ProductTable } from '@/components/Dashboard/ProductTable';
import { getProducts } from '@/database';
import { getCategories } from '@/database/getCategories';

const DashboardPage = ({ products, categories }: any) => {

  return (
    <Layout>
      <Head>
        <title>Dashboard - Productos | Cuatro Carnes</title>
      </Head>
      <ProductTable data={products} categories={categories} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

  const products = await getProducts()
  const categories = await getCategories()


  return {
    props: {
      products,
      categories
    }
  }
}

export default DashboardPage