import { Button, Modal, Upload, UploadFile, UploadProps, message } from "antd"
import { BiUpload } from 'react-icons/bi';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';
import axios from 'axios';

export const EmailModal = ({ isModalOpen, setIsModalOpen }: any) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleCancel = () => {
    setIsModalOpen({ visible: false, id: undefined });
  };

  const handleOk = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('file', file as RcFile);
    });
    setUploading(true);
    axios
      .post('/api/email', formData)
      .then((response) => {
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch((error) => {
        message.error('upload failed.');
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
        <Button icon={<BiUpload />}>Subir Archivo</Button>
      </Upload>
    </Modal>
  )
}