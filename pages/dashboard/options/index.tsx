import Head from 'next/head';

import { Layout } from '@/components/Dashboard/Layout';
import { OptionsTable } from '@/components/Dashboard/OptionsTable';

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