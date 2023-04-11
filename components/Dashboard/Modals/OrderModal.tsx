import { useState } from 'react'
import { Modal, Select } from "antd"

export const OrderModal = ({ isModalOpen, setIsModalOpen }: any) => {
  const [loading, setLoading] = useState(false)

  const handleOk = () => {
    setLoading(true)
  };

  const handleCancel = () => {
    setIsModalOpen({ visible: false, order: {} });
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Modal
      title={`Pedido Nro. ${isModalOpen.order.uniqueID ? isModalOpen.order.uniqueID : '00000'}`}
      confirmLoading={loading}
      open={isModalOpen.visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Select
        defaultValue="lucy"
        style={{ width: 200 }}
        onChange={handleChange}
        options={[
          { value: 1, label: 'Solicitado sin pagar' },
          { value: 2, label: 'Pendiente Mercado Pago' },
          { value: 3, label: 'Cancelado' },
          { value: 4, label: 'Solicitado/Pagado MP' },
          { value: 5, label: 'En proceso para entregar' },
          { value: 6, label: 'Entregado al cliente' },
          { value: 7, label: 'En proceso de Pago PayPal' },
          { value: 8, label: 'Solicitado/Pagado PayPal' },
          { value: 9, label: 'Cancelado PayPal' },
          { value: 10, label: 'Pagado otros medios' },
        ]}
      />
    </Modal>
  )
}