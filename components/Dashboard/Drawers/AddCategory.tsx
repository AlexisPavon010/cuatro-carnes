import { Button, Drawer, Form, Input } from "antd"
import { Dispatch, SetStateAction, useState } from "react";
import { KeyedMutator } from "swr";

import { createCategory } from "@/client";

const { TextArea } = Input;

interface AddCategoryProps {
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


export const AddCategory = ({ open, onClose, mutate }: AddCategoryProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
          label="Nombre de la Categoria"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder='Escribe el nombre del producto' size='large' />
        </Form.Item>

        <Form.Item
          label="Descripción"
          name="description"
        // rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <TextArea
            size='large'
            style={{ height: 120 }}
            placeholder='Escribe una descripción del producto'
          />
        </Form.Item>
      </Form>
    </Drawer>
  )
}