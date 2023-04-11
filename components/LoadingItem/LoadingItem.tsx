import { Skeleton } from "antd"

import styles from './styles.module.scss'

export const LoadingItem = () => {
  return (
    <div className={styles.skeleton}>
      <Skeleton active paragraph={{ rows: 1 }} />
      <div className={styles.skeleton__wrapper}>
        {Array(5).fill('').map(() => (
          <div className={styles.skeleton__item}>
            <Skeleton active paragraph={{ rows: 1 }} />
            <Skeleton.Image active style={{ height: '70px', width: '70px' }} />
          </div>
        ))}
      </div>
    </div>
  )
}
