import { useState } from 'react'
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Upload } from 'antd'
import { AiOutlineLoading } from 'react-icons/ai';
import { BiPlusCircle } from 'react-icons/bi';

const { TextArea } = Input;

export const AddProduct = ({ onClose, open }: any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const uploadButton = (
    <div>
      {loading ? <AiOutlineLoading /> : <BiPlusCircle />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Drawer
      width={400}
      title="Basic Drawer"
      placement="right"
      onClose={() => onClose(false)}
      open={open}
      footer={
        <Button block type="primary" onClick={() => form.submit()}>
          Cargar
        </Button>
      }
    >
      <Row>
        <Col>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          // beforeUpload={beforeUpload}
          // onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Col>
      </Row>
      <Form
        form={form}
        layout='vertical'
        name="basic"
        onFinish={(e) => console.log(e)}
        autoComplete="off"
        requiredMark={false}
      >
        <Form.Item
          label="Nombre del Producto"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder='Escribe el nombre del producto' size='large' />
        </Form.Item>

        <Form.Item
          label="Cantidad"
          name="quantity"
        // rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Space.Compact size='large' style={{ width: '100%' }}>
            <Button type="primary">-</Button>
            <Input style={{ textAlign: 'center' }} defaultValue={1} />
            <Button type="primary">+</Button>
          </Space.Compact>
        </Form.Item>

        <Form.Item
          label="Precio"
          name="price"
        // rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input size='large' addonBefore="$" />
        </Form.Item>

        <Form.Item
          label="Categoria"
          name="categories"
        // rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Select
            size='large'
            defaultValue="lucy"
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
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
