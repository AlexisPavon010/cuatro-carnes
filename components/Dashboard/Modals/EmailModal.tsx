import { Button, Modal, Upload, UploadFile, UploadProps, message } from "antd";
import { BiUpload } from 'react-icons/bi';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';
import axios from 'axios';

import { updateOrder } from "@/client/Order";

export const EmailModal = ({ isModalOpen, setIsModalOpen }: any) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const { uniqueID, email, _id } = isModalOpen.order || {}

  const handleCancel = () => {
    setIsModalOpen({ visible: false, id: undefined });
  };

  const handleOk = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file as RcFile);
    });
    formData.append('email', email);
    formData.append('uniqueID', uniqueID);
    setUploading(true);
    axios
      .post('/api/email', formData)
      .then((response) => {
        setFileList([]);
        handleCancel()
        message.success('Correo enviado con exito!.');
        updateOrder(_id!, {
          status: 'COMPLETED'
        })
      })
      .catch((error) => {
        message.error('Error al enviar el correo.');
        console.log(error);
      })
      .finally(() => setUploading(false))
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <Modal
      title="Enviar un correo"
      confirmLoading={uploading}
      open={isModalOpen.visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Enviar'
      cancelText='Cancelar'
    >
      <Upload  {...props}>
        <Button
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          icon={<BiUpload size={18} />}
        >
          Subir Archivo
        </Button>
      </Upload>
    </Modal>
  )
}