import { Button, Drawer, Form, Input, List, Modal, Space, Tooltip, Typography } from "antd"
import { Dispatch, SetStateAction, useState } from "react";
import { KeyedMutator } from "swr";

import { createCategory } from "@/client";
import { FiDelete } from "react-icons/fi";
import { BsPencil, BsTrash } from "react-icons/bs";

interface AddOptionProps {
  mutate: KeyedMutator<any>
  onClose: Dispatch<SetStateAction<{
    visible: boolean;
    id: string | undefined;
  }>>
  open: {
    visible: boolean;
    id: string | undefined;
  }
}

const data = [
  'Opcion 1',
  'Opcion 2',
  'Opcion 3',
  'Opcion 4',
  'Opcion 5',
];

export const AddOption = ({ open, onClose, mutate }: AddOptionProps) => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1)

  return (
    <Drawer
      width={400}
      title="Nueva Opción"
      placement="right"
      onClose={() => onClose({ id: undefined, visible: false })}
      open={open.visible}
      footer={
        <Button loading={loading} block type="primary" size="large" onClick={() => form.submit()}>
          Cargar
        </Button>
      }
    >
      <Form
        form={form}
        layout='vertical'
        name="basic"
        initialValues={{
          price: 0
        }}
        onFinish={(values) => {
          setLoading(true)
          createCategory(values)
            .then((response) => {
              mutate(null)
              form.resetFields()
              onClose({ id: undefined, visible: false })
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
        }}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          label="Nombre de la Opción"
          name="name"
          rules={[{ required: true, message: 'Porfavor inserte un nombre.' }]}
        >
          <Input placeholder='Escribe el nombre del producto' size='large' />
        </Form.Item>

        <Form.Item
          label="Cantidad"
          name="quantity"
        >
          <Space.Compact size='large' style={{ width: '100%' }}>
            <Button onClick={() => setQuantity(quantity - 1)} type="primary">-</Button>
            <Input onChange={({ target }) => setQuantity(Number(target.value))} style={{ textAlign: 'center' }} value={quantity} defaultValue={quantity} />
            <Button onClick={() => setQuantity(quantity + 1)} type="primary">+</Button>
          </Space.Compact>
        </Form.Item>
        <Space style={{ width: '100%' }} size='large' direction="vertical">
          <List
            bordered
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Tooltip title="Editar">
                    <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="text" shape="circle" icon={<BsPencil size={18} />} />
                  </Tooltip>,
                  <Tooltip title="Eliminar">
                    <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="default" shape="circle" icon={<BsTrash size={18} />} />
                  </Tooltip>,
                ]}
              >
                <Typography.Text mark>{item}</Typography.Text>
              </List.Item>
            )}
          />

          <Button onClick={() => setOpenModal(true)} block type="default">Agregar un Item</Button>
        </Space>
      </Form>
      <NewItemModal open={openModal} setOpenModal={setOpenModal} />
    </Drawer>
  )
}

const NewItemModal = ({ open, setOpenModal }: any) => {
  const [form] = Form.useForm()
  return (
    <Modal
      title='Agregar un Item'
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpenModal(false)}
    >
      <Form
        layout='vertical'
        form={form}
        requiredMark={false}
        onFinish={(values: any) => {
          console.log(values)
        }}
        onFinishFailed={() => { }}
      >
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Precio"
          name="price"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}