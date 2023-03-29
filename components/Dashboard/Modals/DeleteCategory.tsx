import { deleteCategoryById } from '@/client/Category';
import { Modal } from 'antd';
import React, { useState } from 'react'

export const DeleteCategory = ({ isModalOpen, setIsModalOpen, mutate }: any) => {
  const [loading, setLoading] = useState(false)


  const handleOk = () => {
    setLoading(true)
    deleteCategoryById(isModalOpen.id)
      .then(({ data }) => {
        mutate(null);
        setIsModalOpen({ visible: false, id: undefined });
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  };

  const handleCancel = () => {
    setIsModalOpen({ visible: false, id: undefined });
  };

  return (
    <Modal
      title="Eliminar Categoria"
      confirmLoading={loading}
      open={isModalOpen.visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Estas seguro que desea eliminar esta categoria?.
        Una vez eliminado no se podra recuperar.</p>
    </Modal>
  )
}