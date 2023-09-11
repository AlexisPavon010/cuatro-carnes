import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { Badge } from 'antd';

import { setOpenOrderModal } from '@/store/ui/uiSlice';
import { IProduct } from '@/interfaces/products';
import styles from './styles.module.scss';

const { Ribbon } = Badge;

interface ProductItemProps {
  item: IProduct;
}

export const ProductItem = ({ item }: ProductItemProps) => {
  const dispatch = useDispatch()

  return (
    <div key={item._id} onClick={() => dispatch(setOpenOrderModal({ visible: true, product: item }))} className={styles.list__products_item}>
      <div>
        <h3 className={styles.list__products_title}>{item.title}</h3>
        <div className={styles.list__products_price}>
          {`$${item.price}`}
        </div>
      </div>
      <div>
        <Image
          src={item.image}
          height={50}
          width={70}
          style={{
            height: '100%',
            objectFit: 'contain'
          }}
          alt={item.title}
        />
        <Ribbon text="Nuevo!" style={{ display: item.is_new ? 'block' : 'none' }} />
        <Ribbon text="Oferta!" style={{ display: item.is_offer ? 'block' : 'none' }} />
      </div>
    </div>
  )
}