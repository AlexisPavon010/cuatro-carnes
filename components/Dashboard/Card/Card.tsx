import { Button, Card as AntdCard, Col, Divider, Row, Skeleton, Space, Typography } from "antd"

const { Title, Paragraph } = Typography;

interface CardProps {
  title: string;
  total: number;
  description: string;
  loading: boolean;
  setDateFilter: () => void
}

export const Card = ({ title, description, total = 0, loading, setDateFilter }: CardProps) => {

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
          <Button onClick={setDateFilter} size="small">
            VER PEDIDOS
          </Button>
        </Col>
      </Row>
      <Divider style={{ margin: '16px 0 8px 0' }} />
      <Space size='small' direction='vertical'>
        {loading ? (
          <Skeleton.Avatar active shape="square" />
        ) : (
          <Title style={{ marginBottom: '4px' }} level={2}>{total}</Title>
        )}
        <Paragraph>{description}</Paragraph>
      </Space>
    </AntdCard>
  )
}
