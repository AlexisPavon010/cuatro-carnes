import { Button, Card as AntdCard, Col, Divider, Row, Space, Typography } from "antd"

const { Title, Paragraph } = Typography;

interface CardProps {
  title: string;
  total: number;
  description: string;

}

export const Card = ({ title, description, total }: CardProps) => {
  return (
    <AntdCard
      bodyStyle={{
        padding: '12px'
      }}
    >
      <Row>
        <Col flex={1}>
          {title}
        </Col>
        <Col>
          <Button size="small">
            VER PEDIDOS
          </Button>
        </Col>
      </Row>
      <Divider style={{ margin: '16px 0 8px 0' }} />
      <Space size='small' direction='vertical'>
        <Title style={{ marginBottom: '4px' }} level={2}>{total}</Title>
        <Paragraph>{description}</Paragraph>
      </Space>
    </AntdCard>
  )
}
