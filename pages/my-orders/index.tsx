import { Avatar, Badge, List, Space, Typography } from 'antd'
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
            header={<div>Total Pedidos</div>}
            bordered
            dataSource={orders}
            pagination={{
              pageSize: 5,
            }}
            renderItem={(order) => (
              order.items.map((item: IProduct) => (
                <List.Item
                  key={item.title}
                  extra={
                    < Space >
                      <Typography.Text>${item.price}</Typography.Text>
                      <Typography.Text>${item.price * item.quantity!}</Typography.Text>
                      <Badge count={item.quantity} />
                    </Space >
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar shape='square' src={item.image} />}
                    title={item.title}
                    // description={item.description}
                  />
                </List.Item >
              ))
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