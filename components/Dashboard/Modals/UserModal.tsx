import { Form, Modal, Select, message, } from 'antd';
import { useState, useEffect } from 'react';
import { IUser } from '@/interfaces/user';

import { updateUser } from '@/client';

interface OptionsModalProps {
  openModal: { visible: boolean, user: IUser | undefined };
  setOpenModal: any
  mutate: any
}

export const UserModal = ({ mutate, openModal, setOpenModal }: OptionsModalProps) => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    setLoading(true)
    updateUser({ role: values.rol, id: openModal.user?._id! })
      .then(({ data }) => {
        mutate(null)
        message.success('Rol cambiado con exito')
        setOpenModal({ id: undefined, visible: false });
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  };

  const handleCancel = () => {
    setOpenModal({ id: undefined, visible: false });
  };

  useEffect(() => {
    if (!openModal.user?._id!) return

    form.setFieldValue('rol', openModal.user?.role)

  }, [openModal.user])

  return (
    <Modal
      title="Opciones de usuario"
      open={openModal.visible}
      confirmLoading={loading}
      onOk={() => form.submit()}
      onCancel={handleCancel}
    >
      <Form
        onFinish={onFinish}
        layout='vertical'
        form={form}
        requiredMark={false}
      >
        <Form.Item
          label="Cambio de rol"
          name="rol"
        >
          <Select
            style={{ width: 200 }}
            options={[
              {
                label: 'Administrador',
                value: 'admin'
              },
              {
                label: 'Cliente',
                value: 'client'
              },
            ]}
          />
        </Form.Item>
      </Form >
    </Modal >
  )
}