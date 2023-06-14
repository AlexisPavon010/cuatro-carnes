import Head from "next/head";
import Link from "next/link";

import { Layout } from "@/components/Dashboard/Layout"
import { UsersTable } from "@/components/Dashboard/UsersTable";

const UsersPage = () => {
  return (
    <Layout
      items={[
        {
          title: 'Dashboard',
        },
        {
          title: <Link href="/dashboard/users">Usuarios</Link>,
        }
      ]}
    >
      <Head>
        <title>Dashboard - Usuarios | Cuatro Carnes</title>
      </Head>
      <UsersTable />
    </Layout>
  )
}

export default UsersPage;