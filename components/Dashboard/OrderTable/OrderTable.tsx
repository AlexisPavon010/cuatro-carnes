import { AiOutlineMail, AiOutlineProfile } from "react-icons/ai";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { BsPencil, BsWhatsapp } from "react-icons/bs";
import { MdOutlineLocalShipping, MdStorefront } from "react-icons/md";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";
import { useState } from "react";
import moment from "moment";

import { OrderModal } from "../Modals/OrderModal";
import { EmailModal } from "../Modals/EmailModal";
import { IOrder } from "@/interfaces/order";
import { STATUSES } from "@/constants/status";
import { openWhatsApp } from "@/utils/openWhatsApp";

interface OrderTableProps {
  orders: IOrder[];
  isLoading: boolean;
  pages?: number;
  currentPage?: number;
  onPageChange?: any;
  onPageSizeChange?: any;
  pageSize?: number;
}

export const OrderTable = ({
  orders = [],
  isLoading,
  pages = 0,
  currentPage = 1,
  onPageChange,
  onPageSizeChange,
  pageSize = 0,
}: OrderTableProps) => {
  const [modalOpen, setModalOpen] = useState({ visible: false, order: {} })
  const [emailOpen, setEmailOpen] = useState({ visible: false, order: {} })
  const router = useRouter()

  const columns: ColumnsType<any> = [
    {
      title: 'Nro',
      dataIndex: 'uniqueID',
      key: 'uniqueID',
      width: 90,
    },
    {
      width: 85,
      align: 'center',
      title: 'Metodo',
      key: 'shipping',
      dataIndex: 'shipping',
      render: (value) => {
        let text = value === 'DELIVERY' ? 'Delivery' : 'Retiro';
        let color = value === 'DELIVERY' ? '#87d068' : '#2db7f5';
        let icon = value === 'DELIVERY' ? <MdOutlineLocalShipping color={color} size={24} /> : <MdStorefront color={color} size={22} />;
        return (
          <Tooltip title={text}>
            {icon}
          </Tooltip>
        )
      }
    },
    {
      render: (createdAt) => moment(createdAt).format('DD/MM/YYYY, h:mm:ss a'),
      title: 'Fecha y Hora',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 200,
    },
    {
      align: 'center',
      title: 'Monto',
      dataIndex: 'total',
      key: 'total',
      width: 120,
      render: (total: number) => (
        <div>${total}</div>
      )
    },
    {
      dataIndex: 'username',
      title: 'Cliente',
      key: 'username',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'Dirección',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      align: 'center',
      title: 'Estado',
      width: 150,
      dataIndex: 'status',
      key: 'status',
      render: (value) => {
        let text = STATUSES.find(status => status.value === value)?.label;
        let color = STATUSES.find(status => status.value === value)?.color;
        return (<Tag color={color}>{text?.toUpperCase()}</Tag>)
      }
    },
    {
      align: 'center',
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space>
          <Tooltip title="Chatear por consulta">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="default" shape="circle" icon={<BsWhatsapp size={18} />} onClick={() => openWhatsApp(record)} />
          </Tooltip>
          <Tooltip title="Editar">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="text" shape="circle" icon={<BsPencil size={18} />} onClick={() => setModalOpen({ visible: true, order: record })} />
          </Tooltip>
          <Tooltip title="Detalles">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="primary" shape="circle" icon={<AiOutlineProfile size={18} />} onClick={() => router.push(`/dashboard/order/${record._id}`)} />
          </Tooltip>
          <Tooltip title="Enviar un correo">
            <Button style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="link" shape="circle" icon={<AiOutlineMail size={18} />} onClick={() => setEmailOpen({ visible: true, order: record })} />
          </Tooltip>
        </Space>
      )
    },
  ];

  return (
    <>
      <Table
        loading={isLoading}
        scroll={{ x: 1000 }}
        columns={columns}
        dataSource={orders}
        rowClassName={(row) => row?.fleet ? `ant_table_row_${row?.fleet}` : ''}
        pagination={{
          className: 'section-not-print',
          locale: {
            items_per_page: 'x pág.',
          },
          total: pageSize * pages,
          current: currentPage,
          pageSize: pageSize,
          onChange: onPageChange,
          onShowSizeChange: onPageSizeChange,
          showSizeChanger: true
        }}
      />
      <OrderModal
        isModalOpen={modalOpen}
        setIsModalOpen={setModalOpen}
      />
      <EmailModal
        isModalOpen={emailOpen}
        setIsModalOpen={setEmailOpen}
      />
    </>
  )
}
