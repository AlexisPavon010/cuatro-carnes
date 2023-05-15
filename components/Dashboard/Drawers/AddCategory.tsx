import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Drawer, Form, Input } from "antd";
import { KeyedMutator } from "swr";

import { createCategory, getCategoryById, updateCategoryById } from "@/client";

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

  useEffect(() => {
    form.resetFields()
    if (!open.id) return
    getCategoryById(open.id)
      .then(({ data }) => {
        form.setFieldsValue(data)
      })
      .catch((error) => console.log(error))
      .finally()
  }, [open.id])

  return (
    <Drawer
      width={400}
      title="Nueva Categoría"
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
          if (!open.id) {
            createCategory(values)
              .then((response) => {
                mutate(null)
                form.resetFields()
                onClose({ id: undefined, visible: false })
              })
              .catch((error) => console.log(error))
              .finally(() => setLoading(false))
          } else {
            updateCategoryById(open.id, values)
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
          label="Nombre de la Categoría"
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