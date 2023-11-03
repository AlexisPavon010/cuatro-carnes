import { Button, Empty } from 'antd'

export const EmptyProducts = ({ setSearch }: any) => {
  return (
    <Empty
      description='Productos no encontrado'
    >
      <Button onClick={() => setSearch('')} type="default">Volver</Button>
    </Empty>
  )
}