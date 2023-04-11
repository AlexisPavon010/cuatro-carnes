import { Button, Drawer, Form, Input, Space } from "antd"
import { Dispatch, SetStateAction, useState } from "react";
import { KeyedMutator } from "swr";

import { createCategory } from "@/client";

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
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1)

  return (
    <Drawer
      width={400}
      title="Nueva Categoria"
      placement="right"
      onClose={() => onClose({ id: undefined, visible: false })}
      open={open.visible}
      footer={
        <Button loading={loading} block type="primary" onClick={() => form.submit()}>
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
      </Form>
    </Drawer>
  )
}