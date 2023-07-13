import { useState } from 'react'
import { Button, Card, Col, Dropdown, Input, MenuProps, Row, Select, Space, Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table";
import { AiOutlineLock, AiOutlineMenu, AiOutlineUnlock } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { MdOutlineComputer } from "react-icons/md";

import { AddProduct } from "../Drawers";
import { useSwrFetcher } from '@/hooks/useSwrFetcher';
import { DeleteModal } from '../Modals/DeleteModal';
import { IProduct } from '@/interfaces/products';
import { activateProductById } from '@/client';
import { OptionsModal } from '../Modals/OptionsModal';

const { Search } = Input;

export const ProductTable = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<{ visible: boolean, id: string | undefined }>({ visible: false, id: undefined });
  const [isModalOpen, setIsModalOpen] = useState<{ visible: boolean, id: string | undefined }>({ visible: false, id: undefined });
  const [category, setCategory] = useState('')
  const [term, setTerm] = useState('')
  const { data, error, isLoading, mutate } = useSwrFetcher(`/api/products?${category}${term}`)
  const { data: categories } = useSwrFetcher('/api/categories')
  const [isDrawerOpen, setIsDrawerOpen] = useState<{ visible: boolean, id: string | undefined }>({ visible: false, id: undefined })
  const [selectedRecord, setSelectedRecord] = useState<IProduct | undefined>(undefined);

  const handleActivateProduct = (id: string, status: boolean) => {
    activateProductById(id, { status: !status })
      .then(({ data }) => {
        mutate(null)
      })
      .catch((error) => console.log(error))
  }


  const getMenuItems = (record: IProduct | undefined): MenuProps['items'] => [
    {
      key: '1',
      icon: <BiPencil size={14} />,
      label: 'Modificar',
      onClick: () => setIsDrawerOpen({ visible: true, id: record?._id! })
    },
    {
      key: '3',
      icon: <AiOutlineMenu size={14} />,
      label: 'Opciones',
      onClick: () => setIsOptionsOpen({ visible: true, id: record?._id! })
    },
    {
      key: '4',
      icon: record?.status ? <AiOutlineLock size={14} /> : <AiOutlineUnlock size={14} />,
      label: record?.status ? 'Desactivar' : 'Activar',
      onClick: () => handleActivateProduct(record?._id!, record?.status!)
    },
    {
      key: '5',
      icon: <MdOutlineComputer size={14} />,
      label: 'Eliminar',
      onClick: () => setIsModalOpen({ visible: true, id: record?._id! })
    }
  ];

  const columns: ColumnsType<any> = [
    {
      title: 'Imagen',
      dataIndex: 'image',
      key: 'image',
      render: (url) => (
        <img style={{ width: '60px' }} src={url} alt="" />
      )
    },
    {
      title: 'Nombre',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Categoría',
      dataIndex: 'category',
      key: 'category',
    },
    {
      align: 'center',
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      render: (total) => (
        <div>${total}</div>
      )
    },
    {
      align: 'center',
      title: 'Precio Oferta',
      dataIndex: 'offert_price',
      key: 'offert_price',
      render: (total) => (
        <div>${total ? total : 0}</div>
      )
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        status ? <Tag color='green'>Activo</Tag> : <Tag color='magenta'>Inactivo</Tag>
      )
    },
    {
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
        <Row gutter={[12, 12]}>
          <Col xs={24} md={4} lg={6}>
            <Search placeholder="Buscar..." onSearch={(value) => setTerm(value ? `term=${value}&` : '')} />
          </Col>
          <Col xs={24} md={6} lg={6}>
            <Select
              onChange={(value) => setCategory(value ? `category=${value}&` : '')}
              placeholder='Seleccione una categoría'
              style={{ width: '100%' }}
              allowClear
              options={
                categories.map(({ name }: { name: string }) => (
                  { value: name, label: name }
                ))
              }
            />
          </Col>
          <Col flex={1}>
          </Col>
          <Col>
            <Space wrap>
              <Button onClick={() => setIsDrawerOpen({ visible: true, id: undefined })} type="primary">Ingresar Producto</Button>
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
      <AddProduct
        onClose={setIsDrawerOpen}
        open={isDrawerOpen}
        mutate={mutate}
      />
      <OptionsModal
        isOptionsOpen={isOptionsOpen}
        setIsOptionsOpen={setIsOptionsOpen}
      />
      <DeleteModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        mutate={mutate}
      />
    </>
  )
}
