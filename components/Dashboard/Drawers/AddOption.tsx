import { Button, Drawer, Form, Input, List, Modal, Space, Tooltip, Typography } from "antd"
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { KeyedMutator } from "swr";

import { createItemOptions, createOptions, deletedItemOptions, getItemOptionById, getOptionById, updateItemOptions, updateOptions } from "@/client";

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

export const AddOption = ({ open, onClose, mutate }: AddOptionProps) => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState({ visible: false, itemId: undefined });
  const [openDeletedModal, setOpenDeletedModal] = useState({ visible: false, itemId: undefined });
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1)

  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    form.resetFields()
    setOptions([])
    if (!open.id) return
    getOptionById(open.id)
      .then(({ data }) => {
        console.log(data)
        setOptions(data.items)
        form.setFieldsValue(data)
      })
      .catch((error) => console.log(error))
  }, [open.id])

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
          if (!open.id) {
            createOptions({ ...values, quantity: quantity, items: options })
              .then((response) => {
                mutate(null)
                form.resetFields()
                onClose({ id: undefined, visible: false })
              })
              .catch((error) => console.log(error))
              .finally(() => setLoading(false))
          } else {
            updateOptions(open.id!, values)
              .then((response) => {
                mutate(null)
                form.resetFields()
                onClose({ id: undefined, visible: false })
              })
              .catch((error) => console.log(error))
              .finally(() => setLoading(false))
          }
        }}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label="Nombre de la Opción"
          rules={[{ required: true, message: 'Porfavor inserte un nombre.' }]}
        >
          <Input placeholder='Escribe el nombre del producto' size='large' />
        </Form.Item>

        <Form.Item
          label="Cantidad"
          name="quantity"
        >
          <Space.Compact size='large' style={{ width: '100%' }}>
            <Button onClick={() => setQuantity((value) => (value > 1 ? value - 1 : value))} type="primary">-</Button>
            <Input onChange={({ target }) => setQuantity(Number(target.value))} style={{ textAlign: 'center' }} value={quantity} defaultValue={quantity} />
            <Button onClick={() => setQuantity(quantity + 1)} type="primary">+</Button>
          </Space.Compact>
        </Form.Item>
        <Space style={{ width: '100%' }} size='large' direction="vertical">
          <List
            bordered
            dataSource={options}
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <Tooltip title="Editar">
                    <Button
                      onClick={() => setOpenEditModal({ visible: true, itemId: item._id })}
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      type="text" shape="circle"
                      icon={<BsPencil size={18} />}
                    />
                  </Tooltip>,
                  <Tooltip title="Eliminar">
                    <Button
                      onClick={() => setOpenDeletedModal({ visible: true, itemId: item._id })}
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      type="default" shape="circle"
                      icon={<BsTrash size={18} />}
                    />
                  </Tooltip>,
                ]}
              >
                <Typography.Text>{item.name}</Typography.Text>
                <Typography.Text>${item.price}</Typography.Text>
              </List.Item>
            )}
          />

          <Button onClick={() => setOpenModal(true)} block type="default">Agregar un Item</Button>
        </Space>
      </Form>
      <NewItemModal id={open.id} open={openModal} setOpenModal={setOpenModal} setOptions={setOptions} />
      <DeletedItemModal id={open.id} open={openDeletedModal} setOpenDeletedModal={setOpenDeletedModal} setOptions={setOptions} />
      <EditItemModal id={open.id} open={openEditModal} setOpenEditModal={setOpenEditModal} setOptions={setOptions} />
    </Drawer>
  )
}

const NewItemModal = ({ id, open, setOpenModal, setOptions }: any) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
  }, [open])

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
          if (!id) {
            setOptions((prevState: any) => [...prevState, values])
            setOpenModal(false)
          } else {
            createItemOptions(id, values)
              .then(({ data }) => {
                setOptions(data.items);
                setOpenModal(false)
              })
              .catch((error) => console.log(error))
          }
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

const EditItemModal = ({ id, open, setOpenEditModal, setOptions }: any) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (open.visible)
      getItemOptionById(id, open.itemId)
        .then(({ data }) => {
          console.log(data)
          form.setFieldsValue(data)
        })
        .catch((error) => console.log(error))
  }, [open.visible])


  return (
    <Modal
      title='Editar item'
      open={open.visible}
      okText='Actualizar'
      cancelText='Cancelar'
      onOk={() => form.submit()}
      onCancel={() => setOpenEditModal({ visible: false, itemId: undefined })}
    >
      <Form
        layout='vertical'
        form={form}
        requiredMark={false}
        onFinish={(values: any) => {
          updateItemOptions(id, open.itemId, values)
            .then(({ data }) => {
              setOptions(data.items)
              setOpenEditModal({ visible: false, itemId: undefined })
            })
            .catch((error) => console.log(error))
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

const DeletedItemModal = ({ id, open, setOptions, setOpenDeletedModal }: any) => {
  return (
    <Modal
      title='Eliminar Item'
      open={open.visible}
      onOk={() => {
        if (!id) {
          setOptions([])
          setOpenDeletedModal({ visible: false, itemId: undefined })
        } else {
          deletedItemOptions(id, open.itemId)
            .then(({ data }) => {
              setOptions(data.items)
              setOpenDeletedModal({ visible: false, itemId: undefined })
            })
            .catch((error) => console.log(error))
        }
      }}
      onCancel={() => setOpenDeletedModal({ visible: false, itemId: undefined })}
    >
      <p>Estas seguro que desea eliminar este item?.
        Una vez eliminado no se podra recuperar.</p>
    </Modal >
  )
}