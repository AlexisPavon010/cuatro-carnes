import { useState } from 'react'
import { Button, Card, Col, Dropdown, MenuProps, Row, Select, Space, Table, Tooltip } from "antd"
import { ColumnsType } from "antd/es/table";
import { AiOutlineLock, AiOutlineMenu } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { MdOutlineComputer } from "react-icons/md";

import { ICategories } from "@/interfaces/categories";
import { IProduct } from "@/interfaces/products";
import { AddProduct } from "../Drawers";

interface ProductTableProps {
  data: IProduct[]
  categories: ICategories[]

}

const items: MenuProps['items'] = [
  {
    key: '1',
    icon: <BiPencil size={14} />,
    label: 'Modificar',
    onClick: () => { console.log('first') }
  },
  {
    key: '2',
    icon: <BsImage size={14} />,
    label: 'Galeria',
    onClick: () => { console.log('first') }
  },
  {
    key: '3',
    icon: <AiOutlineMenu size={14} />,
    label: 'Opciones',
    onClick: () => { console.log('first') }
  },
  {
    key: '4',
    icon: <AiOutlineLock size={14} />,
    label: 'Activar',
    onClick: () => { console.log('first') }
  },
  {
    key: '5',
    icon: <MdOutlineComputer size={14} />,
    label: 'Eliminar',
    onClick: () => { console.log('first') }
  },
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
    title: 'Categoria',
    dataIndex: 'categorie',
    key: 'categorie',
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
    title: 'Estado',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Acciones',
    dataIndex: 'actions',
    key: 'actions',
    render: () => (
      <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
        <Button>Acciones</Button>
      </Dropdown>
    )
  },
];

export const ProductTable = ({ data, categories = [] }: ProductTableProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      <Card>
        <Row>
          <Col xs={24} md={8} lg={8}>
            <Select
              style={{ width: 120 }}
              options={
                categories.map(({ name }) => (
                  { value: name, label: name }
                ))
              }
            />
          </Col>
          <Col flex={1}>
          </Col>
          <Col>
            <Space wrap>
              <Button onClick={() => setIsDrawerOpen(true)} type="primary">Ingresar Producto</Button>
              <Button>Default Button</Button>
            </Space>
          </Col>
        </Row>
      </Card>
      <Table
        scroll={{ x: 1000 }}
        columns={columns}
        dataSource={data}
      />
      <AddProduct
        onClose={setIsDrawerOpen}
        open={isDrawerOpen}
      />
    </>
  )
}
