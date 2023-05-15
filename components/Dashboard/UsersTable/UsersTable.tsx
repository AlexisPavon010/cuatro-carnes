import { Button, Dropdown, MenuProps, Table, Tag } from "antd";
import { useSwrFetcher } from "@/hooks/useSwrFetcher";
import { BiPencil, BiTrash } from "react-icons/bi";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

import { UserModal } from "../Modals/UserModal";
import { IUser } from "@/interfaces/user";

export const UsersTable = () => {
  const { data, isLoading, mutate } = useSwrFetcher('/api/users')
  const [openModal, setOpenModal] = useState<{ visible: boolean, user: undefined | IUser }>({ visible: false, user: undefined })
  const [selectedRecord, setSelectedRecord] = useState<any | undefined>(undefined);


  const getMenuItems = (record: IUser | undefined): MenuProps['items'] => [
    {
      key: '1',
      icon: <BiPencil size={14} />,
      label: 'Modificar',
      onClick: () => setOpenModal({ visible: true, user: record })
    },
    {
      key: '5',
      icon: <BiTrash size={14} />,
      label: 'Eliminar',
      onClick: () => console.log({ visible: true, id: record?._id! })
    }
  ];

  const columns: ColumnsType<any> = [
    {
      title: 'Nombre de Usuario',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefono',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Roles',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        let text = role === 'admin' ? 'Administrador' : 'Cliente';
        let color = text === 'Administrador' ? '#87d068' : 'cyan';
        return (<Tag color={color} >{text}</Tag>)
      }
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Dropdown
          menu={{ items: getMenuItems(selectedRecord) }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Button onClick={() => setSelectedRecord(record)}>Acciones</Button>
        </Dropdown>
      ),
    },
  ];


  return (
    <>
      <Table
        scroll={{ x: 1000 }}
        loading={isLoading}
        columns={columns}
        dataSource={data}
      />
      <UserModal
        mutate={mutate}
        openModal={openModal}
        setOpenModal={setOpenModal} />
    </>
  )
}
