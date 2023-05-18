import { Button, Col, Drawer, Form, Input, InputNumber, Radio, Row, Select, Space, Spin, Upload, } from 'antd'
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
  const [stockChange, setChangeStock] = useState(false)
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
        stock: stockChange ? 'QUANTITY' : 'KILOGRAM',
        [stockChange ? 'q_stock' : 'kg_stock']: Number(stock),
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
      updateProductById(open.id, {
        ...values,
        image: imageUrl,
        stock: stockChange ? 'QUANTITY' : 'KILOGRAM',
        [stockChange ? 'q_stock' : 'kg_stock']: Number(stock)
      })
        .then(() => {
          form.resetFields()
          onClose(false)
          mutate(null);
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
          label="Codigo de producto"
          name="product_code"
        // rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <InputNumber style={{ width: '100%' }} size='large' addonBefore="#" placeholder='000000' />
        </Form.Item>

        <Form.Item
          label='Stock'
        >
          <Radio.Group defaultValue={false} onChange={() => setChangeStock((state) => !state)}>
            <Radio value={true}>Cantidad</Radio>
            <Radio value={false}>Kg.</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label={stockChange ? 'Cantidad' : 'Kilogramo (kg.)'}
          name={stockChange ? 'q_stock' : 'kg_stock'}
        >
          <Space.Compact size='large' style={{ width: '100%' }}>
            <Button onClick={() => setStock(stock - 1)} type="primary">-</Button>
            <Input onChange={({ target }) => setStock(Number(target.value))} style={{ textAlign: 'center' }} value={stock} defaultValue={stock} />
            <Button onClick={() => setStock(stock + 1)} type="primary">+</Button>
          </Space.Compact>
        </Form.Item>

        <Form.Item
          label='Alerta de Stock'
        >
          <Space.Compact size='large' style={{ width: '100%' }}>
            <Button onClick={() => { }} type="primary">-</Button>
            <Input style={{ textAlign: 'center' }} defaultValue={0} />
            <Button onClick={() => { }} type="primary">+</Button>
          </Space.Compact>
        </Form.Item>

        <Form.Item
          label="Precio"
          name="price"
        // rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <InputNumber style={{ width: '100%' }} size='large' addonBefore="$" />
        </Form.Item>

        <Form.Item
          label="Precio oferta (superior a 2Kg. o 2 piezas)"
          name="offert_price"
        // rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <InputNumber style={{ width: '100%' }} size='large' addonBefore="$" />
        </Form.Item>

        <Form.Item
          label="Categoría"
          name="category"
        // rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Select
            placeholder='Seleccione una categoría'
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
    </Drawer >
  )
}
