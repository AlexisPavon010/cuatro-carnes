import { Button, Card, Col, Descriptions, List, Row, Tag, Typography } from 'antd';
import mapboxgl, { Map, Marker, LngLatBounds, AnySourceData } from 'mapbox-gl'
import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react'
import moment from 'moment';
import { BiArrowBack } from 'react-icons/bi';
import { GetServerSideProps } from 'next';

import { Layout } from '@/components/Dashboard/Layout';
import { directionsApi } from '@/client/Direction';
import { IOrder } from '@/interfaces/order';
import { getOrdersById } from '@/database/dbOrders';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

interface OrderDetailsProps {
  order: IOrder
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const mapDiv = useRef<HTMLDivElement>(null)
  const markerRef = useRef<Marker | any>(null)
  const mapRef = useRef<Map>()
  const router = useRouter()

  console.log(order.cords)

  const getRoutesBetweenPoints = async () => {
    if (!order.cords) return;
    const { data } = await directionsApi.get(`/${order.cords.join(',')};-58.826729%2C-27.469368`)
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
      .setLngLat([-58.826729, -27.469368])
      .addTo(mapRef.current!)
  }


  useEffect(() => {

    if (!order.cords) return

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


  return (
    <Layout>
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
      <Card style={{ marginBottom: '20px' }}>
        <Descriptions column={{ xs: 1, sm: 1, lg: 2 }} title={`Pedido Nro. #${order.uniqueID}`} size='small' extra={<Tag>{order.status}</Tag>}>
          <Descriptions.Item label="Nombre">{order.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{order.email}</Descriptions.Item>
          <Descriptions.Item label="Domicilio">{order.address || '--------'}</Descriptions.Item>
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
        renderItem={(item: any) => (
          <List.Item>
            <Typography.Text>{item.title}</Typography.Text>
          </List.Item>
        )}
        style={{ marginBottom: '20px' }}
        dataSource={order.items}
        bordered
      />
      <Card id="section-not-print">
        <div style={{
          height: '600px',
          width: '100%',
        }} ref={mapDiv} />
      </Card>
    </Layout >
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id = '' } = query

  const data = await getOrdersById(id.toString())

  return {
    props: {
      order: data
    }
  }
}

export default OrderDetails;