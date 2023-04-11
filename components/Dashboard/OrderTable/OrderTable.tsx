import { useSwrFetcher } from "@/hooks/useSwrFetcher";
import { Button, Card, Col, Radio, Row, Space, Table, Tag, Tooltip } from "antd"
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useState } from "react";
import { AiOutlineMail, AiOutlineProfile } from "react-icons/ai";
import { BsPencil, BsWhatsapp } from "react-icons/bs";
import { OrderModal } from "../Modals/OrderModal";



export const OrderTable = () => {
  const [modalOpen, setModalOpen] = useState({ visible: false, order: {} })
  const [dateFilter, setDateFilter] = useState('')
  const { data: orders, isLoading } = useSwrFetcher(`/api/order${dateFilter}`, {})


  const columns: ColumnsType<any> = [
    {
      title: 'Nro',
      dataIndex: 'uniqueID',
      key: 'uniqueID',
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
      title: 'Mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      align: 'center',
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (value) => {
        return (<Tag>{value}</Tag>)
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
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="default" shape="circle" icon={<BsWhatsapp size={18} />} />
          </Tooltip>
          <Tooltip title="Editar">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="text" shape="circle" icon={<BsPencil size={18} />} onClick={() => setModalOpen({ visible: true, order: record })} />
          </Tooltip>
          <Tooltip title="Detalles">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="primary" shape="circle" icon={<AiOutlineProfile size={18} />} />
          </Tooltip>
          <Tooltip title="Enviar un correo">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="link" shape="circle" icon={<AiOutlineMail size={18} />} />
          </Tooltip>
        </Space>
      )
    },
  ];

  return (
    <>
      <Card>
        <Row>
          <Col>
            <Radio.Group onChange={({ target }) => setDateFilter(target.value ? `?date=${target.value}` : '')} defaultValue='all' >
              <Radio.Button value="all">Todos</Radio.Button>
              <Radio.Button value="day">Dia</Radio.Button>
              <Radio.Button value="week">Semana</Radio.Button>
              <Radio.Button value="month">Mes</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
      </Card>
      <Table
        loading={isLoading}
        scroll={{ x: 1000 }}
        columns={columns}
        dataSource={orders.data}
      />
      <OrderModal
        isModalOpen={modalOpen}
        setIsModalOpen={setModalOpen}
      />
    </>
  )
}
