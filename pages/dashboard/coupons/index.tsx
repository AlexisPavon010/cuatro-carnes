import Head from "next/head";
import Link from "next/link";

import { CouponsTable } from "@/components/Dashboard/CouponsTable";
import { Layout } from "@/components/Dashboard/Layout"

const CouponsPage = () => {
  return (
    <Layout
      items={[
        {
          title: 'Dashboard',
        },
        {
          title: <Link href="/dashboard/coupons">Cupones</Link>,
        }
      ]}
    >
      <Head>
        <title>Dashboard - Cupones | Cuatro Carnes</title>
      </Head>
      <CouponsTable />
    </Layout>
  )
}

export default CouponsPage;