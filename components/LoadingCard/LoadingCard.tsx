import { Skeleton } from 'antd'

import styles from './styles.module.scss'

export const LoadingCard = () => {
  return (
    <div className={styles.slider__list_item} >
      <Skeleton.Image active rootClassName={styles.slider__list_item_skeleton} />
      <Skeleton active paragraph={{ rows: 0 }} rootClassName={styles.slider__list_item_text} />
    </div>
  )
}