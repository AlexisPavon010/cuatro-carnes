import { Col, Row } from 'antd'
import Head from 'next/head';

import { Layout } from '@/components/Dashboard/Layout/Layout'
import { Card } from '@/components/Dashboard/Card/Card';
import { OrderTable } from '@/components/Dashboard/OrderTable';
import { useSwrFetcher } from '@/hooks/useSwrFetcher';

const DashboardPage = () => {
  const { data, isLoading } = useSwrFetcher('/api/order')

  return (
    <Layout>
      <Head>
        <title>Cuatro Carnes | Dashboard</title>
      </Head>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6} id="section-not-print">
          <Card
            total={data?.metadata?.today}
            loading={isLoading}
            title='Pedidos del Dia'
            description='Total de pedidos recibidos en el día'
          />
        </Col>
        <Col xs={24} sm={12} lg={6} id="section-not-print">
          <Card
            total={data?.metadata?.delivered}
            loading={isLoading}
            title='Pedidos Entregados'
            description='Pedidos entregados del día'
          />
        </Col>
        <Col xs={24} sm={12} lg={6} id="section-not-print">
          <Card
            total={data?.metadata?.pending}
            loading={isLoading}
            title='Pedidos Pendientes'
            description='Falta entregar'
          />
        </Col>
        <Col xs={24} sm={12} lg={6} id="section-not-print">
          <Card
            total={data?.metadata?.canceled}
            loading={isLoading}
            title='Pedidos Cancelados'
            description='Cancelados'
          />
        </Col>
        <Col xs={24}>
          <OrderTable />
        </Col>
      </Row>
    </Layout>
  )
}

export default DashboardPage