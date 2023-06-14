import Head from 'next/head';
import Link from 'next/link';

import { Layout } from '@/components/Dashboard/Layout';
import { OptionsTable } from '@/components/Dashboard/OptionsTable';

const OptionsPages = () => {
  return (
    <Layout
      items={[
        {
          title: 'Dashboard',
        },
        {
          title: <Link href="/dashboard/options">Opciones</Link>,
        }
      ]}
    >
      <Head>
        <title>Dashboard - Opciones | Cuatro Carnes</title>
      </Head>
      <OptionsTable />
    </Layout>
  )
}

export default OptionsPages;