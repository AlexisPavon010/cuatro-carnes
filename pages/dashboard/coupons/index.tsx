import Head from "next/head";

import { CouponsTable } from "@/components/Dashboard/CouponsTable";
import { Layout } from "@/components/Dashboard/Layout"

const CouponsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Dashboard - Cupones | Cuatro Carnes</title>
      </Head>
      <CouponsTable />
    </Layout>
  )
}

export default CouponsPage;