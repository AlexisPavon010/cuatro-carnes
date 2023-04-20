import { useEffect, useState } from 'react'
import { Modal, Select, notification } from "antd"

import { STATUSES } from '@/constants/status';
import { updateOrder } from '@/client/Order';
import { IOrder } from '@/interfaces/order';

interface OrderModal {
  isModalOpen: {
    order: IOrder,
    visible: boolean
  },
  setIsModalOpen: (state: { visible: boolean, id: string }) => void
}

export const OrderModal = ({ isModalOpen, setIsModalOpen }: any) => {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(isModalOpen.order.status)

  useEffect(() => {
    setStatus(isModalOpen.order.status)
  }, [isModalOpen.order.status])

  const handleOk = () => {
    setLoading(true)
    updateOrder(isModalOpen.order._id, status)
      .then((res) => {
        console.log(res)
        notification.success({
          message: 'Orden Actualizada con exito!.',
        })
        setIsModalOpen({ visible: false, order: {} });
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  };

  const handleCancel = () => {
    setIsModalOpen({ visible: false, order: {} });
  };

  return (
    <Modal
      title={`Pedido Nro. ${isModalOpen.order.uniqueID ? isModalOpen.order.uniqueID : '00000'}`}
      confirmLoading={loading}
      open={isModalOpen.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Actualizar'
      cancelText='Cancelar'
    >
      <Select
        value={status}
        style={{ width: 200 }}
        onChange={(value) => setStatus(value)}
        options={STATUSES.map(status => (
          { value: status.value, label: status.label }
        ))}
      />
    </Modal>
  )
}