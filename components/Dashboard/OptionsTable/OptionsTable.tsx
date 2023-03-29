import { Card, Col, Row, Table } from "antd"
import { ColumnsType } from "antd/es/table";


const columns: ColumnsType<any> = [
  {
    title: 'Grupo de Opcion',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Cantidad',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    align: 'center',
    title: 'Estado',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Acciones',
    dataIndex: 'actions',
    key: 'actions',
    // render: () => (
    //   <Space>
    //     <Tooltip title="Chatear por consulta">
    //       <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="default" shape="circle" icon={<BsWhatsapp size={18} />} />
    //     </Tooltip>
    //     <Tooltip title="Editar">
    //       <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="text" shape="circle" icon={<BsPencil size={18} />} />
    //     </Tooltip>
    //     <Tooltip title="Detalles">
    //       <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="primary" shape="circle" icon={<AiOutlineProfile size={18} />} />
    //     </Tooltip>
    //     <Tooltip title="Enviar un correo">
    //       <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="link" shape="circle" icon={<AiOutlineMail size={18} />} />
    //     </Tooltip>
    //   </Space>
    // )
  },
];

export const OptionsTable = () => {
  return (
    <>
      <Card>
        <Row>
          <Col xs={24} md={8} lg={8}>

          </Col>
        </Row>
      </Card>
      <Table
        scroll={{ x: 1000 }}
        columns={columns}
        dataSource={[]}
      />
    </>
  )
}
