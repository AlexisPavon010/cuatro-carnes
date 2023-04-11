import Head from "next/head";

import { Layout } from "@/components/Dashboard/Layout"
import { UsersTable } from "@/components/Dashboard/UsersTable";

const UsersPage = () => {
  return (
    <Layout>
      <Head>
        <title>Dashboard - Usuarios | Cuatro Carnes</title>
      </Head>
      <UsersTable />
    </Layout>
  )
}

export default UsersPage;