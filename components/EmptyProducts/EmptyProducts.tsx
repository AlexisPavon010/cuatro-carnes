import { Button, Empty } from 'antd'

export const EmptyProducts = ({ setSearch }: any) => {
  return (
    <Empty
      image='/assets/not-found.png'
      description='Producto no encontrado'
    >
      <Button onClick={() => setSearch('')} type="primary">Volver</Button>
    </Empty>
  )
}