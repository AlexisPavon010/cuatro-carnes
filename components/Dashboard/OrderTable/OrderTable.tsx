import { Button, Card, Col, Radio, Row, Space, Table, Tooltip } from "antd"
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { AiOutlineMail, AiOutlineProfile } from "react-icons/ai";
import { BsPencil, BsWhatsapp } from "react-icons/bs";

interface OrderTableProps {
  data: any[];
  isLoading: boolean
}

const dataSource = [
  {
    uniqueID: '00001',
    date: '11/11/11 : 11:11:11',
    total: 32,
    client: '10 Downing Street',
    email: 'Downing@Street',
    status: 'success',
  },
  {
    uniqueID: '00001',
    date: '11/11/11 : 11:11:11',
    total: 32,
    client: '10 Downing Street',
    email: 'Downing@Street',
    status: 'success',
  },
];

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
    width: 180,
    render: (createdAt) => moment(createdAt).format('MM/DD/YYYY, h:mm:ss a')
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
    title: 'Estado',
    dataIndex: 'status',
    key: 'status',
  },
  {
    align: 'center',
    title: 'Acciones',
    dataIndex: 'actions',
    key: 'actions',
    render: () => (
      <Space>
        <Tooltip title="Chatear por consulta">
          <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="default" shape="circle" icon={<BsWhatsapp size={18} />} />
        </Tooltip>
        <Tooltip title="Editar">
          <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="text" shape="circle" icon={<BsPencil size={18} />} />
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

export const OrderTable = ({ isLoading, data }: OrderTableProps) => {
  return (
    <>
      <Card>
        <Row>
          <Col xs={24} md={8} lg={8}>
            <Radio.Group defaultValue='all' >
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
        dataSource={data}
      />
    </>
  )
}
