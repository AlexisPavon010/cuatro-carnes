import { useSwrFetcher } from "@/hooks/useSwrFetcher";
import { Button, Card, Col, Dropdown, MenuProps, Row, Space, Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { MdOutlineComputer } from "react-icons/md";



export const CouponsTable = () => {
  const [selectedRecord, setSelectedRecord] = useState<any | undefined>(undefined);
  const { data, isLoading } = useSwrFetcher('/api/coupons')

  const getMenuItems = (record: any | undefined): MenuProps['items'] => [
    {
      key: '1',
      icon: <BiPencil size={14} />,
      label: 'Modificar',
      onClick: () => console.log({ visible: true, id: record?._id! })
    },
    {
      key: '4',
      icon: record?.status ? <AiOutlineLock size={14} /> : <AiOutlineUnlock size={14} />,
      label: record?.status ? 'Desactivar' : 'Activar',
      onClick: () => console.log(record?._id!, record?.status!)
    },
    {
      key: '5',
      icon: <MdOutlineComputer size={14} />,
      label: 'Eliminar',
      onClick: () => console.log({ visible: true, id: record?._id! })
    }
  ];

  const columns: ColumnsType<any> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descuento (%)',
      dataIndex: 'discount',
      key: 'discount',
      render: (value) => `%${value}`
    },
    {
      align: 'center',
      title: 'Estado',
      dataIndex: 'active',
      key: 'active',
      render: (status) => {
        let text = status ? 'Activo' : 'Inactivo';
        let color = status ? '#87d068' : 'default';
        return (<Tag color={color}>{text}</Tag>)
      }
    },
    {
      width: 180,
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          menu={{ items: getMenuItems(selectedRecord) }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Button onClick={() => setSelectedRecord(record)}>Acciones</Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <Card>
        <Row>
          <Col xs={24} md={8} lg={8}>

          </Col>
          <Col flex={1}>
          </Col>
          <Col>
            <Space wrap>
              <Button onClick={() => console.log({ visible: true, id: undefined })} type="primary">Agregar Cupon</Button>
            </Space>
          </Col>
        </Row>
      </Card>
      <Table
        scroll={{ x: 1000 }}
        loading={isLoading}
        columns={columns}
        dataSource={data}
      />
    </>
  )
}