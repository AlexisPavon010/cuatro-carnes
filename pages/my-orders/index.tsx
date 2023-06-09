import { Avatar, Badge, List, Space, Typography } from 'antd';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

import { getOrdersByUser } from '@/database/dbOrders';
import { Layout } from '@/components/Layout'
import styles from './styles.module.scss'
import { IOrder } from '@/interfaces/order';
import { IProduct } from '@/interfaces/products';

interface OrderPageProps {
  orders: IOrder[]
}

const OrderPage = ({ orders }: OrderPageProps) => {
  const [limit, setLimit] = useState(10)

  const onPageSizeChange = (current: any, size: number) => {
    setLimit(size)
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
            renderItem={(order, index) => (
              <List
                header={<strong>{`Detalles del pedido. #${order.uniqueID}`}</strong>}
                renderItem={(item: IProduct, i) => (
                  < List.Item
                    key={i}
                    extra={
                      < Space >
                        <Typography.Text>${item.price}</Typography.Text>
                        <Typography.Text>${item.price * item.quantity!}</Typography.Text>
                        <Badge color='#A92B3C' count={item.quantity} />
                      </Space >
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar shape='square' src={item.image} />}
                      description={item.title}
                    // description={item.description}
                    />
                  </List.Item >
                )}
                style={{ marginBottom: '20px' }}
                dataSource={order.items}
                bordered
              />
            )}
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