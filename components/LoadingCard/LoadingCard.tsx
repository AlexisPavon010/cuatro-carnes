// import { Skeleton } from 'antd'
import Skeleton from 'react-loading-skeleton'

import styles from './styles.module.scss'

export const LoadingCard = () => {
  return (
    <div className={styles.slider__list_item} >
      <Skeleton containerClassName={styles.slider__list_item_skeleton} />
      <Skeleton containerClassName={styles.slider__list_item_text} width={200} />
    </div>
  )
}