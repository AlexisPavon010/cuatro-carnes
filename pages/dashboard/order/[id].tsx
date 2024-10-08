import { Button, Card, Col, Descriptions, List, Row, Table, Tag, Tooltip } from 'antd';
import mapboxgl, { AnySourceData, LngLatBounds, Map, Marker } from 'mapbox-gl';
import { BsCash, BsCreditCard2Back } from 'react-icons/bs';
import { AiOutlineBank } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import 'mapbox-gl/dist/mapbox-gl.css';
import Head from 'next/head';
import Link from 'next/link';
import moment from 'moment';

import { Layout } from '@/components/Dashboard/Layout';
import { getOrdersById } from '@/database/dbOrders';
import { directionsApi } from '@/client/Direction';
import { IProduct } from '@/interfaces/products';
import { IOption } from '@/interfaces/options';
import { STATUSES } from '@/constants/status';
import { FLEETS } from '@/constants/fleets';
import { IOrder } from '@/interfaces/order';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

interface OrderDetailsProps {
  order: IOrder
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
    dataIndex: 'title',
    title: 'Opciones',
    key: 'title',
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
    dataIndex: 'address',
    title: 'Subtotal',
    align: 'center',
    key: 'address',
    width: 80,
    render: (_, { price, quantity }) => (
      `$${price * quantity!}`
    )
  },
];

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const mapDiv = useRef<HTMLDivElement>(null)
  const markerRef = useRef<Marker | any>(null)
  const mapRef = useRef<Map>()
  const router = useRouter()

  console.log(order)

  const getRoutesBetweenPoints = async () => {
    if (!order.cords) return;
    const { data } = await directionsApi.get(`/${order.cords.join(',')};-58.587295973638355%2C-34.442304238763754`)
    const { geometry } = data.routes[0]

    const bounds = new LngLatBounds(order.cords, order.cords)

    for (const coord of geometry.coordinates) {
      const newCoord: [number, number] = [coord[0], coord[1]]
      bounds.extend(newCoord)
    }

    mapRef.current!.fitBounds(bounds, {
      padding: 100
    })

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: geometry.coordinates
            }
          }
        ]
      },
    }

    mapRef.current?.on('load', () => {
      mapRef.current?.addSource('RouteString', sourceData)
      mapRef.current?.addLayer({
        id: 'RouteString',
        type: 'line',
        source: 'RouteString',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': 'cyan',
          'line-width': 3
        }
      })
    })

    new Marker()
      .setLngLat([-58.587295973638355, -34.442304238763754])
      .addTo(mapRef.current!)
  }

  useEffect(() => {
    if (order.shipping === 'PICKUP') return

    if (!mapRef.current) {
      mapRef.current = new Map({
        container: mapDiv.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: order.cords,
        zoom: 14
      })

      markerRef.current = new Marker()
        .setLngLat(mapRef.current.getCenter())
        .addTo(mapRef.current)
      getRoutesBetweenPoints()
    }
  }, [order])

  const renderPaymentMethod = (method: string) => {
    let icon
    let text
    let color

    switch (method) {
      case 'credit_card':
        icon = <BsCreditCard2Back size={16} />
        text = 'Tarjeta de Credito'
        color = 'cyan'
        break;

      case 'cash':
        icon = <BsCash size={16} />
        text = 'Efectivo'
        color = 'green'
        break;

      case 'debit_card':
        icon = <BsCreditCard2Back size={16} />
        text = 'Tarjeta de Debito'
        color = 'blue'
        break;

      case 'bank_transfer':
        icon = <AiOutlineBank size={16} />
        text = 'Transferencia Bancaria'
        color = 'geekblue'
        break;

    }

    return (
      <Tooltip title={text}>
        <Tag
          color={color}
          icon={icon}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {text}
        </Tag>
      </Tooltip >
    )
  }

  return (
    <Layout
      items={[
        {
          title: 'Dashboard',
        },
        {
          title: <Link href="/dashboard">Orden</Link>,
        },
        {
          title: `#${order.uniqueID}`,
        }
      ]}
    >
      <Head>
        <title>Cuatro Carnes | Dashboard</title>
      </Head>
      <Card style={{ marginBottom: '20px' }} id="section-not-print">
        <Row>
          <Col flex={1}>
            <Button
              type='ghost'
              onClick={() => router.back()}
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              icon={<BiArrowBack size={16} />}
            >
              Volver
            </Button>
          </Col>
          <Col>
            <Button onClick={() => window.print()}>
              Imprimir
            </Button>
          </Col>
        </Row>
      </Card>
      <Card
        size='small'
        style={{
          marginBottom: '20px',
          borderTop: `8px solid ${FLEETS.find((f) => f.value === order.fleet)?.color}`
        }}
      >
        <Descriptions
          size='small'
          column={{ xs: 1, sm: 1, lg: 1 }}
          title={`Pedido Nro. #${order.uniqueID}`}
          extra={
            <Tag color={STATUSES.find(status => status.value === order.status)?.color}>
              {STATUSES.find(status => status.value === order.status)?.label}
            </Tag>
          }
        >
          <Descriptions.Item label="Nombre">{order.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{order.email}</Descriptions.Item>
          <Descriptions.Item label="Domicilio">{`${order.address} ` || '--------'}</Descriptions.Item>
          <Descriptions.Item label="Piso/Depto/Lote">{`${order.reference ? order.reference : '--------'} `}</Descriptions.Item>
          <Descriptions.Item label="Localidad">{`${order.address_1 ? order.address_1 : '--------'} `}</Descriptions.Item>
          <Descriptions.Item label="Celular">+{order.phone ? order.phone : '0000000'}</Descriptions.Item>
          <Descriptions.Item label="Para">
            <Tag color='blue'>{order.shipping === 'DELIVERY' ? 'DELIVERY' : 'RETIRAR'}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Metodo de Pago">
            {renderPaymentMethod(order.payment_option)}
          </Descriptions.Item>
          <Descriptions.Item label="Fecha alta">{moment(order.createdAt).format('DD/MM/YYYY, h:mm:ss a')}</Descriptions.Item>
          <Descriptions.Item label="Fecha entrega"> {order.deadline ? moment(order.deadline).format('DD/MM/YYYY, h:mm:ss a') : '--------'}</Descriptions.Item>
        </Descriptions>
      </Card>
      <List
        size='small'
        header={
          <Descriptions
            extra={`(${order.items ? order.items.length : 0}) items`}
            title={`Detalles del pedido Nro. #${order.uniqueID}`}
            size='small'
          />
        }
        footer={
          <Descriptions column={{ xs: 1, sm: 2, lg: 4 }}>
            <Descriptions.Item label="Subtotal">${order.sub_total && order.sub_total.toFixed(2)}</Descriptions.Item>
            <Descriptions.Item label="Descuentos ">$0.00</Descriptions.Item>
            <Descriptions.Item label="Envío">$0.00</Descriptions.Item>
            <Descriptions.Item label="Total">${order.total && order.total.toFixed(2)}</Descriptions.Item>
          </Descriptions>
        }
        children={
          <Table
            dataSource={order.items}
            pagination={false}
            columns={columns}
            size='small'
          />
        }
        style={{ marginBottom: '20px' }}
        itemLayout="vertical"
        bordered
      />
      {
        order.shipping === 'DELIVERY' ? (
          <Card id="section-not-print">
            <div style={{
              height: '600px',
              width: '100%',
            }} ref={mapDiv} />
          </Card>
        ) : (<div />)
      }
    </Layout >
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id = '' } = query

  const data = await getOrdersById(id.toString())

  if (!data) {
    return {
      redirect: {
        destination: `/dashboard`,
        permanent: false,
      }
    }
  }

  return {
    props: {
      order: data
    }
  }
}

export default OrderDetails;