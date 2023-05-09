import { useState } from "react";
import { Modal, message } from "antd";

import { deletedOptions } from "@/client";

export const DeleteOption = ({ open, onClose, mutate }: any) => {
  const [loading, setLoading] = useState(false)

  const handleOk = () => {
    setLoading(true)
    deletedOptions(open.id)
      .then(({ data }) => {
        mutate(null);
        message.success('Opción Eliminada')
        onClose({ visible: false, id: undefined });
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  };

  const handleCancel = () => {
    onClose({ visible: false, id: undefined });
  };

  return (
    <Modal
      title="Eliminar Opción"
      confirmLoading={loading}
      open={open.visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Estas seguro que desea eliminar esta opcion?.
        Una vez eliminado no se podra recuperar.</p>
    </Modal>
  )
}