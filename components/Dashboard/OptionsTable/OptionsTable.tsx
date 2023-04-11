import { Button, Card, Col, Dropdown, MenuProps, Row, Space, Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table";
import { useState } from 'react'

import { AddOption } from "../Drawers/AddOption";
import { useSwrFetcher } from "@/hooks/useSwrFetcher";
import { BiPencil } from "react-icons/bi";
import { AiOutlineLock, AiOutlineMenu, AiOutlineUnlock } from "react-icons/ai";
import { MdOutlineComputer } from "react-icons/md";

export const OptionsTable = () => {
  const [openOption, setOpenOption] = useState<{ visible: boolean, id: string | undefined }>({ visible: false, id: undefined })
  const [selectedRecord, setSelectedRecord] = useState<any | undefined>(undefined);
  const { data, error, isLoading, mutate } = useSwrFetcher('/api/options')

  const getMenuItems = (record: any | undefined): MenuProps['items'] => [
    {
      key: '1',
      icon: <BiPencil size={14} />,
      label: 'Modificar',
      onClick: () => setOpenOption({ visible: true, id: record?._id! })
    },
    {
      key: '3',
      icon: <AiOutlineMenu size={14} />,
      label: 'Opciones',
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
      title: 'Grupo de Opción',
      dataIndex: 'name',
      key: 'name',
    },
    {
      width: 60,
      align: 'center',
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      width: 60,
      align: 'center',
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let text = status ? 'Activo' : 'Inactivo';
        let color = status ? '#87d068' : 'default';
        return (<Tag color={color}>{text}</Tag>)
      }
    },
    {
      width: 60,
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
        <Row gutter={[0, 12]}>
          <Col xs={24} md={6} lg={6}>
          </Col>
          <Col flex={1}>
          </Col>
          <Col>
            <Space wrap>
              <Button onClick={() => setOpenOption({ visible: true, id: undefined })} type="primary">Ingresar Opción</Button>
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
      <AddOption
        mutate={mutate}
        onClose={setOpenOption}
        open={openOption}
      />
    </>
  )
}