import { Button, Col, Drawer, Form, Input, InputNumber, Radio, Row, Select, Space, Spin, Tooltip, Upload, } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import axios from 'axios';

import { createProduct, getProductById, updateProductById } from '@/client';
import { useSwrFetcher } from '@/hooks/useSwrFetcher';
import { ICategories } from '@/interfaces/categories';
import { IProduct } from '@/interfaces/products';

const { TextArea } = Input;

export const AddProduct = ({ onClose, open, mutate }: any) => {
  const { data: categories } = useSwrFetcher('/api/categories')
  const [form] = Form.useForm();
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [stockChange, setChangeStock] = useState(false)
  const [isOffer, setIsOffer] = useState(false)
  const [isOfferQuantity, setIsOfferQuantity] = useState(false)

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true);
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
          console.log(error);
        });
    }
  };

  const handleSubmit = (values: IProduct) => {
    setLoading(true)
    if (!open.id) {
      createProduct({
        ...values,
        price: Number(values.price),
        image: imageUrl!
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
        image: imageUrl!,
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
        initialValues={{
          is_new: false,
          is_offer: isOffer,
          stock: 'QUANTITY'
        }}
      >
        <Form.Item
          label="Nombre del Producto"
          name="title"
          rules={[{ required: true, message: 'El nombre del producto es requerido.' }]}
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
          name="stock"
        >
          <Radio.Group defaultValue={'QUANTITY'}>
            <Radio value='QUANTITY'>Cantidad</Radio>
            <Radio value='KILOGRAM'>Kg.</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Es Nuevo."
          name="is_new"
        >
          <Radio.Group>
            <Radio value={false}>No</Radio>
            <Radio value={true}>Si</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Esta en oferta."
          name="is_offer"
        >
          <Radio.Group value={isOffer} onChange={() => setIsOffer((value) => !value)}>
            <Radio value={false}>No</Radio>
            <Radio value={true}>Si</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Precio"
          name="price"
          rules={[{ required: true, message: 'El precio es requerido.' }]}
        >
          <InputNumber style={{ width: '100%' }} size='large' addonBefore="$" />
        </Form.Item>

        {
          isOffer && (
            <Form.Item
              label={
                <span>
                  Precio Oferta Semanal
                  {' '}
                  <Tooltip title='Cuando un producto pertenece a la categoría Ofertas Semanales.'>
                    <AiOutlineQuestionCircle size='16' />
                  </Tooltip>
                </span>
              }
              name="offert_price"
              rules={[{ required: true, message: 'El precio oferta es requerido.' }]}
            >
              <InputNumber style={{ width: '100%' }} size='large' addonBefore="$" />
            </Form.Item>
          )
        }

        <Form.Item
          label="Oferta por cantidad."
          name="is_offer_quantity"
        >
          <Radio.Group value={isOfferQuantity} onChange={() => setIsOfferQuantity((value) => !value)}>
            <Radio value={false}>No</Radio>
            <Radio value={true}>Si</Radio>
          </Radio.Group>
        </Form.Item>

        {
          isOfferQuantity && (
            <Form.Item
              label='Cantidad / Kilogramos'
              name="offer_quantity"
              rules={[{ required: true, message: 'El precio oferta es requerido.' }]}
            >
              <InputNumber style={{ width: '100%' }} size='large' />
            </Form.Item>
          )
        }

        <Form.Item
          label="Categoría"
          name="category"
          rules={[{ required: true, message: 'La categoría es requerida' }]}
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
          rules={[{ required: true, message: 'La descripcíon es requerida.' }]}
        >
          <TextArea
            size='large'
            style={{ height: 120 }}
            placeholder='Escribe una descripción del producto'
          />
        </Form.Item>
      </Form >
    </Drawer >
  )
}
