import { Button, Col, Drawer, Form, Input, InputNumber, Row, Select, Space, Spin, Upload, } from 'antd'
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { BiPlus } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { createProduct, getProductById, updateProductById } from '@/client';
import { useSwrFetcher } from '@/hooks/useSwrFetcher';
import { ICategories } from '@/interfaces/categories';

const { TextArea } = Input;

export const AddProduct = ({ onClose, open, mutate }: any) => {
  const { data: categories } = useSwrFetcher('/api/categories')
  const [form] = Form.useForm();
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [stock, setStock] = useState(1)

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true);
      // Get this url from response in real world.
      const formData = new FormData();
      formData.append("file", info.file.originFileObj as RcFile);
      formData.append("upload_preset", "prueba");

      axios
        .post('https://api.cloudinary.com/v1_1/alexispavon010/image/upload', formData)
        .then((response) => {
          setLoadingImage(false);
          setImageUrl(response.data.secure_url);
        })
        .catch((error) => {
          setLoadingImage(false);
          console.log(error);
        });
    }
  };

  const handleSubmit = (values: any) => {
    setLoading(true)
    if (!open.id) {
      createProduct({
        ...values,
        price: Number(values.price),
        stock: Number(stock),
        image: imageUrl
      })
        .then(() => {
          mutate(null);
          form.resetFields()
          onClose(false)
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    } else {
      updateProductById(open.id, values)
        .then(() => {
          form.resetFields()
          onClose(false)
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    }
  }

  const uploadButton = (
    <div>
      {loadingImage ? <Spin /> : <BiPlus />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    form.resetFields()
    setImageUrl(undefined)
    if (!open.id) return
    getProductById(open.id)
      .then(({ data }) => {
        setImageUrl(data.image)
        form.setFieldsValue(data)
      })
      .catch((error) => console.log(error))

  }, [open.id])


  return (
    <Drawer
      width={400}
      title={open.id ? 'Modificar Producto' : 'Agregar Producto'}
      placement="right"
      onClose={() => onClose({ visivle: false, id: undefined })}
      open={open.visible}
      footer={
        <Button loading={loading} block type="primary" onClick={() => form.submit()}>
          Cargar
        </Button>
      }
    >
      <Row>
        <Col>
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Col>
      </Row>
      <Form
        form={form}
        layout='vertical'
        name="basic"
        initialValues={{
          stock
        }}
        onFinish={handleSubmit}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          label="Nombre del Producto"
          name="title"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder='Escribe el nombre del producto' size='large' />
        </Form.Item>

        <Form.Item
          label="Cantidad"
          name="stock"
        // rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Space.Compact size='large' style={{ width: '100%' }}>
            <Button onClick={() => setStock(stock - 1)} type="primary">-</Button>
            <Input onChange={({ target }) => setStock(Number(target.value))} style={{ textAlign: 'center' }} value={stock} defaultValue={stock} />
            <Button onClick={() => setStock(stock + 1)} type="primary">+</Button>
          </Space.Compact>
        </Form.Item>

        <Form.Item
          label="Precio"
          name="price"
        // rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <InputNumber size='large' addonBefore="$" />
        </Form.Item>

        <Form.Item
          label="Categoria"
          name="category"
        // rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Select
            placeholder='Seleccione una categoria'
            size='large'
            options={
              categories.map((item: ICategories) => ({ value: item.name, label: item.name }))
            }
          />
        </Form.Item>

        <Form.Item
          label="Descripción"
          name="description"
        // rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <TextArea
            size='large'
            style={{ height: 120 }}
            placeholder='Escribe una descripción del producto'
          />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
