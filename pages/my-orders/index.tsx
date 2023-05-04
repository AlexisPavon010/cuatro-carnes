import { Badge, Card, List, Typography } from 'antd'
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

import { getOrdersByUser } from '@/database/dbOrders';
import { Layout } from '@/components/Layout'
import styles from './styles.module.scss'
import { IOrder } from '@/interfaces/order';
import { IProduct } from '@/interfaces/products';

interface OrderPageProps {
  orders: IOrder[]
}

const OrderPage = ({ orders }: OrderPageProps) => {
  return (
    <Layout title='Mis Ordenes - Cuatro Carnes'>
      <div className={styles.orders}>
        <div className={styles.orders__container}>
          <List
            header={<div>Mis Ordenes</div>}
            bordered
            dataSource={orders}
            renderItem={(order) => (
              <List.Item
                extra={[
                  <Typography.Text >${order.total}</Typography.Text>
                ]}
              >
                {order.items.map((item: IProduct) => (
                  <Typography.Text>
                    <Badge count={item.quantity} />
                    {item.title}
                  </Typography.Text>
                ))}
              </List.Item>
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
        destination: '/auth/signin?p=/order/history',
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