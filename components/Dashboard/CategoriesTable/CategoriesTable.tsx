import { useState } from 'react'
import { Button, Card, Col, Dropdown, Input, MenuProps, Row, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table';
import { useSwrFetcher } from '@/hooks/useSwrFetcher';
import { BiPencil } from 'react-icons/bi';
import { MdOutlineComputer } from 'react-icons/md';

import { AddCategory } from '../Drawers';
import { DeleteCategory } from '../Modals/DeleteCategory';

const { Search } = Input;

export const CategoriesTable = () => {
  const [search, setSearch] = useState('')
  const { data, isLoading, mutate } = useSwrFetcher(`/api/categories${search}`)
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<{ visible: boolean, id: string | undefined }>({ visible: false, id: undefined });
  const [isDrawerOpen, setIsDrawerOpen] = useState<{ visible: boolean, id: string | undefined }>({ visible: false, id: undefined })

  const getMenuItems = (recordId: string | undefined): MenuProps['items'] => [
    {
      key: '1',
      icon: <BiPencil size={14} />,
      label: 'Modificar',
      onClick: () => setIsDrawerOpen({ visible: true, id: selectedItemId })
    },
    {
      key: '2',
      icon: <MdOutlineComputer size={14} />,
      label: 'Eliminar',
      onClick: () => setIsModalOpen({ visible: true, id: selectedItemId })
    },
  ];



  const columns: ColumnsType<any> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Dropdown menu={{ items: getMenuItems(selectedItemId) }} placement="bottomRight" trigger={['click']}>
          <Button onClick={() => setSelectedItemId(record._id)}>Acciones</Button>
        </Dropdown>
      )
    },
  ];

  return (
    <>
      <Card>
        <Row gutter={[0, 12]}>
          <Col xs={24} md={6} lg={6}>
            <Search
              onChange={({ target }) => {
                setTimeout(() => {
                  setSearch(target.value ? `?search=${target.value}` : '')
                }, 500);
              }}
              placeholder='Buscar..'
            />
          </Col>
          <Col flex={1}>
          </Col>
          <Col>
            <Space wrap>
              <Button onClick={() => setIsDrawerOpen({ visible: true, id: undefined })} type="primary">Ingresar Categoría</Button>
            </Space>
          </Col>
        </Row>
      </Card>
      <Table
        loading={isLoading}
        scroll={{ x: 1000 }}
        columns={columns}
        dataSource={data}
      />
      <AddCategory
        onClose={setIsDrawerOpen}
        open={isDrawerOpen}
        mutate={mutate}
      />
      <DeleteCategory
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        mutate={mutate}
      />
    </>
  )
}