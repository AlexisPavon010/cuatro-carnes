import { Col, Form, FormInstance, Modal, Row, Select, Tag, notification } from "antd"
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from 'react'
import es from 'date-fns/locale/es';
import moment from "moment";
registerLocale('es', es)

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
  const [fleet, setFleet] = useState('')
  const [startDate, setStartDate] = useState(moment().toDate());

  const onFinish = (values: any) => {
    console.log(values)
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

  useEffect(() => {
    setStartDate(moment().toDate())
    if (!isModalOpen.order.status) return
    setFleet(isModalOpen.order.fleet)
    form.setFieldValue('status', isModalOpen.order.status)
    if (isModalOpen.order.deadline) {
      setStartDate(moment(isModalOpen.order.deadline).toDate())
    }
  }, [isModalOpen])

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
          fleet: 'default',
          deadline: new Date()
        }}
      >
        <Row gutter={[30, 0]}>
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
              <CustomSelect form={form} fleet={fleet} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[30, 0]}>
          <Col>
            <Form.Item
              label="Fecha de entrega"
              name="deadline"
            >
              <ReactDatePicker
                locale={es}
                dateFormat="Pp"
                selected={startDate}
                className="react-date-picker"
                onChange={(date: Date) => {
                  setStartDate(date)
                  form.setFieldValue('deadline', date)
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

const CustomSelect = ({ form, fleet }: { form: FormInstance<any>, fleet: string }) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

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

  useEffect(() => {
    setSelectedValue(fleet)
  }, [fleet])

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