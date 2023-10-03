import { Button, Descriptions, Dropdown, List, MenuProps, Space, Table, Tag, notification, } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { getSession } from 'next-auth/react';
import { ColumnsType } from 'antd/es/table';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { getOrdersByUser } from '@/database/dbOrders';
import { Layout } from '@/components/Layout'
import styles from './styles.module.scss'
import { IOrder } from '@/interfaces/order';
import { IProduct } from '@/interfaces/products';
import { IOption } from '@/interfaces/options';
import { STATUSES } from '@/constants/status';
import { updateOrder } from '@/client/Order';

interface OrderPageProps {
  orders: IOrder[]
}

const OrderPage = ({ orders }: OrderPageProps) => {
  const router = useRouter()
  const [limit, setLimit] = useState(10)
  const [loading, setLoading] = useState(false)

  const onPageSizeChange = (current: any, size: number) => {
    setLimit(size)
  }

  const columns: ColumnsType<IProduct> = [
    {
      dataIndex: 'title',
      title: 'Nombre',
      key: 'title',
      render: (_, { title }) => <p style={{ whiteSpace: 'nowrap' }}>{title}</p>
    },
    {
      dataIndex: 'stock',
      align: 'center',
      title: 'Unidad',
      key: 'stock',
      width: 50,
      render: (_, { stock }) => {
        let text = stock === 'KILOGRAM' ? 'Kg.' : 'Ud.'
        return text
      }
    },
    {
      dataIndex: 'options',
      title: 'Opciones',
      key: 'options',
      render: (_, { options }) => {
        return options?.map(({ name }: IOption) => (
          <Tag>{name}</Tag>
        ));
      }
    },
    {
      dataIndex: 'is_offer',
      title: 'Oferta',
      key: 'is_offer',
      align: 'center',
      width: 60,
      render: (_, { is_offer }) => {
        let color = is_offer ? 'cyan' : 'volcano'
        let text = is_offer ? 'Si' : 'No'
        return (<Tag color={color}>{text}</Tag>)
      }
    },
    {
      dataIndex: 'quantity',
      title: 'Cantidad',
      key: 'quantity',
      align: 'center',
      width: 30,
      render: (_, { stock, quantity }) => {
        let text = stock === 'KILOGRAM' ? 'Kg.' : 'Ud.'
        return (`${quantity} ${text}`)
      }
    },
    {
      dataIndex: 'price',
      title: 'Precio',
      align: 'center',
      key: 'price',
      width: 80,
      render: (_, { price }) => (
        `$${price}`
      )
    },
    {
      dataIndex: 'subtotal',
      title: 'Subtotal',
      align: 'center',
      key: 'subtotal',
      width: 80,
      render: (_, { price, quantity }) => (
        `$${price * quantity!}`
      )
    },
  ];

  const handleCancelOrder = (id: string) => {
    if (!id) return
    setLoading(true)
    updateOrder(id, {
      status: 'CANCELLED'
    })
      .then((data) => {
        notification.success({
          message: 'Orden cancelada con exito!.',
          onClose() {
            router.reload()
          },
        })
      })
      .catch((err) => {
        console.log(err)
        notification.error({
          message: 'Opss. Ocurrio algo!.',
          onClose() {
            router.reload()
          },
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <Layout title='Mis Ordenes - Cuatro Carnes'>
      <div className={styles.orders}>
        <div className={styles.orders__container}>
          <List
            itemLayout="horizontal"
            dataSource={orders}
            pagination={{
              pageSize: limit,
              onShowSizeChange: onPageSizeChange
            }}
            renderItem={(order, index) => {
              const { label, color }: any = STATUSES.find(status => status.value === order?.status)
              const items: MenuProps['items'] = [
                {
                  key: '1',
                  label: 'Cancelar Pedido',
                  disabled: order.status === 'CANCELLED',
                  onClick: () => handleCancelOrder(order._id)
                },
              ];
              return (
                <List
                  header={[
                    <Descriptions
                      extra={
                        <Dropdown menu={{ items }} trigger={['click']}>
                          <Button loading={loading} size='small' type="primary" shape="circle" icon={<MoreOutlined />} />
                        </Dropdown>
                      }
                      title={[
                        <Space>
                          <strong>{`Detalles del pedido. #${order.uniqueID}`}</strong>
                          <Tag color={color}>{label}</Tag>
                        </Space>
                      ]}
                      size='small'
                    />
                  ]}
                  children={
                    <Table
                      dataSource={order?.items}
                      scroll={{ x: 800 }}
                      pagination={false}
                      columns={columns}
                      size='small'
                    />
                  }
                  style={{ marginBottom: '20px' }}
                  dataSource={order.items}
                  bordered
                />
              )
            }}
          />
        </div>
      </div>
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin?p=/my-orders',
        permanent: false,
      }
    }
  }

  const orders = await getOrdersByUser(session.user.id)

  return {
    props: {
      orders
    }
  }
}

export default OrderPage