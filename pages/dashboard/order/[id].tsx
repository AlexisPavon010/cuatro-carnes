import { Button, Card, Col, Descriptions, List, Row, Tag, Typography } from 'antd';
import { useRouter } from 'next/router';

import { Layout } from '@/components/Dashboard/Layout';
import { useSwrFetcher } from '@/hooks/useSwrFetcher';
import moment from 'moment';

const OrderDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: order } = useSwrFetcher(`/api/order/${id}`)

  return (
    <Layout>
      <Card style={{ marginBottom: '20px' }} id="section-not-print">
        <Row>
          <Col flex={1} ></Col>
          <Col>
            <Button onClick={() => window.print()}>
              Imprimir
            </Button>
          </Col>
        </Row>
      </Card>
      <Card style={{ marginBottom: '20px' }}>
        <Descriptions column={{ xs: 1, sm: 1, lg: 2 }} title={`Pedido Nro. #${order.uniqueID}`} size='small' extra={<Tag>{order.status}</Tag>}>
          <Descriptions.Item label="Nombre">{order.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{order.email}</Descriptions.Item>
          <Descriptions.Item label="Domicilio">18:00:00</Descriptions.Item>
          <Descriptions.Item label="Celular">{order.phone ? order.phone : '0000000'}</Descriptions.Item>
          <Descriptions.Item label="Fecha alta">{moment(order.createdAt).format('DD/MM/YYYY, h:mm:ss a')}</Descriptions.Item>
          <Descriptions.Item label="Fecha entrega"> {order.status === 'COMPLETED' ? moment(order.updateAt).format('DD/MM/YYYY, h:mm:ss a') : '--------'}</Descriptions.Item>
        </Descriptions>
      </Card>
      <List
        header={<Descriptions title="Items del pedido" size='small' extra={`(${order.items ? order.items.length : 0}) items`} />}
        footer={
          <Descriptions column={{ xs: 1, sm: 2, lg: 4 }}>
            <Descriptions.Item label="Subtotal">${order.total && order.total.toFixed(2)}</Descriptions.Item>
            <Descriptions.Item label="Descuentos ">$80.00</Descriptions.Item>
            <Descriptions.Item label="Envío">$60.00</Descriptions.Item>
            <Descriptions.Item label="Total">${order.total && order.total.toFixed(2)}</Descriptions.Item>
          </Descriptions>
        }
        bordered
        dataSource={order.items}
        renderItem={(item: any) => (
          <List.Item>
            <Typography.Text>{item.title}</Typography.Text>
          </List.Item>
        )}
      />
    </Layout >
  )
}

export default OrderDetails;