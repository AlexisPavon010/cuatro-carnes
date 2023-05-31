import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './styles.module.scss'
import { Skeleton } from 'antd';

export const LoadingCategories = () => {
  return (
    <div className={styles.categories__container}>
      <div className={styles.categories__wrapper}>
        <div className={styles.categories__start}>
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            breakpoints={{
              360: {
                slidesPerView: 3,
              },
              480: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              808: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              }
            }}
          >
            {Array(5).fill('').map((_: any, i: number) => {
              return (
                <SwiperSlide style={{ textAlign: 'center' }} key={i}>
                  <Skeleton.Button active block style={{ height: '24px' }} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div >
      </div>
    </div>
  )
}
