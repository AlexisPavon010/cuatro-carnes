import Skeleton from 'react-loading-skeleton';

import styles from './styles.module.scss'

export const LoadingItem = () => {
  return (
    <div className={styles.skeleton}>
      <Skeleton width={320} />
      <Skeleton width={200} />
      {/* <AntSkeleton active paragraph={{ rows: 1 }} /> */}
      <div className={styles.skeleton__wrapper}>
        {Array(5).fill('').map((_: any, i: number) => (
          <div key={i} className={styles.skeleton__item}>
            <Skeleton width={200} count={2} />
            <Skeleton width={70} height={70} />
          </div>
        ))}
      </div>
    </div>
  )
}
