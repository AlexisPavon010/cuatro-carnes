import { Checkbox, Modal, Space } from 'antd';
import { useState, useEffect } from 'react';

import { useSwrFetcher } from '@/hooks/useSwrFetcher';
import { IOption } from '@/interfaces/options';
import { addOptionProductById, getProductById } from '@/client/Product';

interface OptionsModalProps {
  isOptionsOpen: any;
  setIsOptionsOpen: any
}

export const OptionsModal = ({ isOptionsOpen, setIsOptionsOpen }: OptionsModalProps) => {
  const { data: options }: { data: IOption[] } = useSwrFetcher('/api/options')
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>([])
  const [loading, setLoading] = useState(false)

  const handleOk = () => {
    setLoading(true)
    addOptionProductById(isOptionsOpen.id, selectedOptions)
      .then(({ data }) => {
        console.log(data)
        setIsOptionsOpen({ id: undefined, visible: false });
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  };

  const handleCancel = () => {
    setIsOptionsOpen({ id: undefined, visible: false });
  };

  const handleCheckboxChange = (option: IOption, checked: boolean) => {
    if (checked) {
      setSelectedOptions(prevSelectedOptions => [...prevSelectedOptions, option]);
    } else {
      setSelectedOptions(prevSelectedOptions => prevSelectedOptions.filter(o => o._id !== option._id));
    }
  }

  useEffect(() => {
    if (!isOptionsOpen.id) return

    getProductById(isOptionsOpen.id)
      .then(({ data }) => {
        setSelectedOptions(data.options.filter((option: IOption) => option.quantity > 0))
      })

  }, [isOptionsOpen.id])

  return (
    <Modal
      title="Opciones"
      open={isOptionsOpen.visible}
      confirmLoading={loading}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Space direction='vertical'>
        {options.map((option) => (
          <Checkbox
            key={option._id}
            value={option}
            checked={selectedOptions.some((o) => o._id === option._id)}
            onChange={(e) => handleCheckboxChange(option, e.target.checked)}
          >
            {option.name}
          </Checkbox>
        ))}
      </Space>
    </Modal>
  )
}