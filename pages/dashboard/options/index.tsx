import { Layout } from '@/components/Dashboard/Layout';
import { OptionsTable } from '@/components/Dashboard/OptionsTable';
import Head from 'next/head';

const OptionsPages = () => {
  return (
    <Layout>
      <Head>
        <title>Dashboard - Opciones | Cuatro Carnes</title>
      </Head>
      <OptionsTable />
    </Layout>
  )
}

export default OptionsPages;