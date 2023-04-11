import { Checkbox, Modal, Space } from 'antd'
import React from 'react'

interface OptionsModalProps {
  isOptionsOpen: any;
  setIsOptionsOpen: any
}

export const OptionsModal = ({ isOptionsOpen, setIsOptionsOpen }: OptionsModalProps) => {

  const handleOk = () => {
  };

  const handleCancel = () => {
    setIsOptionsOpen({ id: undefined, visible: false });
  };

  return (
    <Modal title="Opciones" open={isOptionsOpen.visible} onOk={handleOk} onCancel={handleCancel}>
      <Space direction='vertical'>
        <Checkbox onChange={() => { }}>Tamaño de tira</Checkbox>
        <Checkbox onChange={() => { }}>Marcas en los huesos</Checkbox>
        <Checkbox onChange={() => { }}>Tipo de corte</Checkbox>
        <Checkbox onChange={() => { }}>Marcas</Checkbox>
        <Checkbox onChange={() => { }}>Tipo de chorizo</Checkbox>
        <Checkbox onChange={() => { }}>Tipo de cerveza</Checkbox>
        <Checkbox onChange={() => { }}>En caso de que no haya stock</Checkbox>
        <Checkbox onChange={() => { }}>Fileteado</Checkbox>
        <Checkbox onChange={() => { }}>Corte</Checkbox>
        <Checkbox onChange={() => { }}>Congelado</Checkbox>
        <Checkbox onChange={() => { }}>Tamaño de chorizo</Checkbox>
        <Checkbox onChange={() => { }}>Cerveza</Checkbox>
        <Checkbox onChange={() => { }}> Picado</Checkbox>
      </Space>
    </Modal>
  )
}