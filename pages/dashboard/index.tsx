import { Col, Card, Radio, Row, Dropdown, Button, MenuProps } from 'antd'
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';

import { Card as DashboardCard } from '@/components/Dashboard/Card/Card';
import { OrderTable } from '@/components/Dashboard/OrderTable';
import { Layout } from '@/components/Dashboard/Layout/Layout';
import { useSwrFetcher } from '@/hooks/useSwrFetcher';
import { orderToXLS } from '@/utils/reports';
import { IOrder } from '@/interfaces/order';

const DashboardPage = () => {
  const [dateFilter, setDateFilter] = useState('')
  const [currentPage, setCurrentPage] = useState<any>(1)
  const [pageSize, setPageSize] = useState<any>(10)

  const buildQuery = () => {
    const queryParams: string[] = [];

    if (dateFilter) {
      queryParams.push(`dateFilter=${dateFilter}`);
    }
    if (currentPage) {
      queryParams.push(`skip=${currentPage}`);
    }
    if (pageSize) {
      queryParams.push(`limit=${pageSize}`);
    }

    return queryParams.join('&');
  };

  const { data: { results = [], metadata }, isLoading } = useSwrFetcher(
    `/api/order?${buildQuery()}`, // Usa la función buildQuery para construir la URL
    {
      refreshInterval: 5 * 1000
    }
  );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onPageSizeChange = (current: any, size: any) => {
    setPageSize(size);
  };

  const handleDataFilter = (filter: string) => {
    if (dateFilter === filter) {
      setDateFilter('');
    } else {
      setDateFilter(filter);
    }
  };

  const downloadReport = () => {
    const formatOrders = results.map((order: IOrder) =>
      [`${order.uniqueID}`, `${moment(order.createdAt).format('DD/MM/YYYY, h:mm:ss a')}`, `$${order.total.toFixed(2)}`, `${order.username}`, `${order.email}`, `${order.status}`]
    )
    orderToXLS(
      ['Nro', 'Fecha y Hora', 'Monto', 'Cliente', 'Correo', 'Estado'],
      formatOrders
    )
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Excel (XLS)',
      onClick: downloadReport
    },
    {
      key: '2',
      label: 'Imprimir',
      onClick: () => window.print()
    },
  ];

  return (
    <Layout
      items={[
        {
          title: 'Dashboard',
        },
        {
          title: <Link href="/dashboard">Tablero Operativo</Link>,
        }
      ]}
    >
      <Head>
        <title>Cuatro Carnes | Dashboard</title>
      </Head>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6} id="section-not-print">
          <DashboardCard
            setDateFilter={() => handleDataFilter('date=day')}
            active={dateFilter === 'date=day'}
            total={metadata?.today}
            loading={isLoading}
            title='Pedidos del Dia'
            description='Total de pedidos recibidos en el día'
          />
        </Col>
        <Col xs={24} sm={12} lg={6} id="section-not-print">
          <DashboardCard
            setDateFilter={() => handleDataFilter('status=DELIVERED&date=day')}
            active={dateFilter === 'status=DELIVERED&date=day'}
            total={metadata?.delivered}
            loading={isLoading}
            title='Pedidos Entregados'
            description='Pedidos entregados del día'
          />
        </Col>
        <Col xs={24} sm={12} lg={6} id="section-not-print">
          <DashboardCard
            setDateFilter={() => handleDataFilter('status=PENDING')}
            active={dateFilter === 'status=PENDING'}
            total={metadata?.pending}
            loading={isLoading}
            title='Pedidos Pendientes'
            description='Falta entregar'
          />
        </Col>
        <Col xs={24} sm={12} lg={6} id="section-not-print">
          <DashboardCard
            setDateFilter={() => handleDataFilter('status=CANCELLED')}
            active={dateFilter === 'status=CANCELLED'}
            total={metadata?.cancelled}
            loading={isLoading}
            title='Pedidos Cancelados'
            description='Cancelados'
          />
        </Col>
        <Col xs={24}>
          <Card id="section-not-print">
            <Row>
              <Col flex={1}>
                <Radio.Group onChange={({ target }) => setDateFilter(target.value ? `date=${target.value}` : '')} defaultValue='all'>
                  <Radio.Button value="all">Todos</Radio.Button>
                  <Radio.Button value="day">Dia</Radio.Button>
                  <Radio.Button value="week">Semana</Radio.Button>
                  <Radio.Button value="month">Mes</Radio.Button>
                </Radio.Group>
              </Col>
              <Col>
              </Col>
              <Col>
                <Dropdown menu={{ items }} trigger={['click']} >
                  <Button >Descargar Reporte</Button>
                </Dropdown>
              </Col>
            </Row>
          </Card>
          <OrderTable
            orders={results}
            isLoading={isLoading}
            currentPage={currentPage}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            pageSize={pageSize}
            pages={metadata?.total / pageSize}
          />
        </Col>
      </Row>
    </Layout >
  )
}

export default DashboardPage