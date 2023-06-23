import { Button, Card, Col, Dropdown, MenuProps, Radio, Row, Space, Table, Tag, Tooltip } from "antd"
import { AiOutlineMail, AiOutlineProfile } from "react-icons/ai";
import { BsPencil, BsWhatsapp } from "react-icons/bs";
import { MdDeliveryDining } from "react-icons/md";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";
import { FaStore } from "react-icons/fa";
import { useState } from "react";
import moment from "moment";

import { OrderModal } from "../Modals/OrderModal";
import { orderToXLS } from "@/utils/reports";
import { EmailModal } from "../Modals/EmailModal";
import { IOrder } from "@/interfaces/order";
import { STATUSES } from "@/constants/status";
import { openWhatsApp } from "@/utils/openWhatsApp";

interface OrderTableProps {
  orders: IOrder[];
  isLoading: boolean;
  setDateFilter: (value: string) => void
}

export const OrderTable = ({ orders = [], isLoading, setDateFilter }: OrderTableProps) => {
  const [modalOpen, setModalOpen] = useState({ visible: false, order: {} })
  const [emailOpen, setEmailOpen] = useState({ visible: false, order: {} })
  const [skip, setSkip] = useState(1)
  const [limit, setLimit] = useState(10)
  const router = useRouter()

  const columns: ColumnsType<any> = [
    {
      title: 'Nro',
      dataIndex: 'uniqueID',
      key: 'uniqueID',
      width: 90,
    },
    {
      width: 85,
      align: 'center',
      title: 'Metodo',
      key: 'shipping',
      dataIndex: 'shipping',
      render: (value) => {
        let text = value === 'DELIVERY' ? 'Delivery' : 'Retiro';
        let color = value === 'DELIVERY' ? '#87d068' : '#2db7f5';
        let icon = value === 'DELIVERY' ? <MdDeliveryDining color={color} size={24} /> : <FaStore color={color} size={18} />;
        return (
          <Tooltip title={text}>
            {icon}
          </Tooltip>
        )
      }
    },
    {
      title: 'Fecha y Hora',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (createdAt) => moment(createdAt).format('DD/MM/YYYY, h:mm:ss a')
    },
    {
      align: 'center',
      title: 'Monto',
      dataIndex: 'total',
      key: 'total',
      width: 120,
      render: (total: number) => (
        <div>${total}</div>
      )
    },
    {
      title: 'Cliente',
      dataIndex: 'username',
      key: 'username',
      width: 150,
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'Dirección',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true
    },
    {
      align: 'center',
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (value) => {
        let text = STATUSES.find(status => status.value === value)?.label;
        let color = STATUSES.find(status => status.value === value)?.color;
        return (<Tag color={color}>{text?.toUpperCase()}</Tag>)
      }
    },
    {
      align: 'center',
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Chatear por consulta">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="default" shape="circle" icon={<BsWhatsapp size={18} />} onClick={() => openWhatsApp(record)} />
          </Tooltip>
          <Tooltip title="Editar">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="text" shape="circle" icon={<BsPencil size={18} />} onClick={() => setModalOpen({ visible: true, order: record })} />
          </Tooltip>
          <Tooltip title="Detalles">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="primary" shape="circle" icon={<AiOutlineProfile size={18} />} onClick={() => router.push(`/dashboard/order/${record._id}`)} />
          </Tooltip>
          <Tooltip title="Enviar un correo">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="link" shape="circle" icon={<AiOutlineMail size={18} />} onClick={() => setEmailOpen({ visible: true, order: record })} />
          </Tooltip>
        </Space>
      )
    },
  ];

  const onPageChange = (page: any) => {
    setSkip(page)
  }

  const onPageSizeChange = (current: any, size: number) => {
    setLimit(size)
  }

  const downloadReport = () => {
    const formatOrders = orders.map((order: IOrder) =>
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
    <>
      <Card id="section-not-print">
        <Row>
          <Col flex={1}>
            <Radio.Group onChange={({ target }) => setDateFilter(target.value ? `date=${target.value}` : '')} defaultValue='all' >
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
      <Table
        loading={isLoading}
        scroll={{ x: 1000 }}
        columns={columns}
        dataSource={orders}
        rowClassName={(row) => row?.fleet ? `ant_table_row_${row?.fleet}` : ''}
        pagination={{
          className: 'section-not-print',
          locale: {
            items_per_page: 'x pág.',
          }
        }}
      />
      <OrderModal
        isModalOpen={modalOpen}
        setIsModalOpen={setModalOpen}
      />
      <EmailModal
        isModalOpen={emailOpen}
        setIsModalOpen={setEmailOpen}
      />
    </>
  )
}
