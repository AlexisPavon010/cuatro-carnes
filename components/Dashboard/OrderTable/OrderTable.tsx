import { Button, Card, Col, Radio, Row, Space, Table, Tooltip } from "antd"
import { ColumnsType } from "antd/es/table";
import { AiOutlineMail, AiOutlineProfile } from "react-icons/ai";
import { BsPencil, BsWhatsapp } from "react-icons/bs";


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
    dataIndex: 'date',
    key: 'date',
  },
  {
    align: 'center',
    title: 'Monto',
    dataIndex: 'total',
    key: 'totalf',
    render: (total) => (
      <div>${total}</div>
    )
  },
  {
    title: 'Cliente',
    dataIndex: 'client',
    key: 'clientF',
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

export const OrderTable = () => {
  return (
    <>
      <Card>
        <Row>
          <Col xs={24} md={8} lg={8}>
            <Radio.Group >
              <Radio.Button value="large">Todos</Radio.Button>
              <Radio.Button value="default">Dia</Radio.Button>
              <Radio.Button value="small">Semana</Radio.Button>
              <Radio.Button value="mes">Mes</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
      </Card>
      <Table
        scroll={{ x: 1000 }}
        columns={columns}
        dataSource={dataSource}
      />
    </>
  )
}
