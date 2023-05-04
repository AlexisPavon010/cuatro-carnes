import { Col, Form, FormInstance, Modal, Row, Select, Tag, notification } from "antd"
import { useState } from 'react'

import { STATUSES } from '@/constants/status';
import { updateOrder } from '@/client/Order';
import { IOrder } from '@/interfaces/order';
import { FLEETS } from '@/constants/fleets';

interface OrderModal {
  isModalOpen: {
    order: IOrder,
    visible: boolean
  },
  setIsModalOpen: (state: { visible: boolean, id: string }) => void
}

export const OrderModal = ({ isModalOpen, setIsModalOpen }: any) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const onFinish = (values: any) => {
    setLoading(true)
    updateOrder(isModalOpen.order._id, values)
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
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText='Actualizar'
      cancelText='Cancelar'
    >
      <Form
        onFinish={onFinish}
        layout='vertical'
        form={form}
        requiredMark={false}
        initialValues={{
          status: isModalOpen.order.status,
          fleet: isModalOpen.order.fleet
        }}
      >
        <Row gutter={[12, 12]}>
          <Col>
            <Form.Item
              label="Estado"
              name="status"
            >
              <Select
                style={{ width: 200 }}
                options={STATUSES.map(status => (
                  { value: status.value, label: status.label }
                ))}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="Color"
              name="fleet"
            >
              <CustomSelect form={form} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

const CustomSelect = ({ form }: { form: FormInstance<any> }) => {
  const [selectedValue, setSelectedValue] = useState(undefined);

  const onTagClose = () => {
    setSelectedValue(undefined);
  };

  const tagRender = (props: any) => {
    const { label, value, closable } = props;
    const isCurrentValue = selectedValue === value;

    return (
      <Tag color={value} closable={closable && isCurrentValue} onClose={onTagClose}>
        {label}
      </Tag>
    );
  };

  const onSelect = (value: any) => {
    setSelectedValue(value);
    form.setFieldValue('fleet', value)
  };

  return (
    <Select
      mode="tags"
      tagRender={tagRender}
      style={{ width: 200 }}
      options={FLEETS}
      value={selectedValue}
      onSelect={onSelect}
    />
  );
}