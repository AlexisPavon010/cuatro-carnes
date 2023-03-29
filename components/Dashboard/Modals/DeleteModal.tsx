import { deleteProductById } from "@/client";
import { Modal } from "antd"
import { useState } from "react";

export const DeleteModal = ({ isModalOpen, setIsModalOpen, mutate }: any) => {
  const [loading, setLoading] = useState(false)

  const handleOk = () => {
    setLoading(true)
    deleteProductById(isModalOpen.id)
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
      title="Eliminar Producto"
      confirmLoading={loading}
      open={isModalOpen.visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Estas seguro que desea eliminar este producto?.
        Una vez eliminado no se podra recuperar.</p>
    </Modal>
  )
}