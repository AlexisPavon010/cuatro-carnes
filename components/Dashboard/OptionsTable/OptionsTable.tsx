import { Button, Card, Col, Dropdown, MenuProps, Row, Space, Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table";
import { BiPencil } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { useState } from 'react';

import { AddOption } from "../Drawers/AddOption";
import { useSwrFetcher } from "@/hooks/useSwrFetcher";
import { DeleteOption } from "../Modals/DeleteOption";

export const OptionsTable = () => {
  const [openOption, setOpenOption] = useState<{ visible: boolean, id: string | undefined }>({ visible: false, id: undefined })
  const [openDeletedOption, setDeletedOption] = useState<{ visible: boolean, id: string | undefined }>({ visible: false, id: undefined })
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
      key: '5',
      icon: <BsTrash size={14} />,
      label: 'Eliminar',
      onClick: () => setDeletedOption({ visible: true, id: record?._id! })
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
      <DeleteOption
        mutate={mutate}
        onClose={setDeletedOption}
        open={openDeletedOption}
      />
    </>
  )
}