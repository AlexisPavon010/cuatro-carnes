import 'swiper/css';
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import { LoadingCard } from '@/components/LoadingCard';
import { useSwrFetcher } from '@/hooks/useSwrFetcher';
import { OfferItem } from '@/components/OfferItem';
import { IProduct } from '@/interfaces/products';
import styles from './styles.module.scss';

export const Slider = () => {
  const { data } = useSwrFetcher('/api/products/offers', { revalidateOnFocus: false })
  const swiperRef = useRef<any>(null);
  const swiper = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiper.current = swiperRef.current.swiper;
    }
  }, [swiperRef]);

  if (data.length === 0) return null

  return (
    <section className={styles.slider}>
      <div className={styles.slider__container}>
        <div className={styles.slider__layout}>
          <div className={styles.slider__nav}>
            <h2 className={styles.slider__nav_title}>
              Ofertas Semanales
            </h2>
            <div className={styles.slider__nav_actions}>
              <button aria-label="boton anterior slider" className={styles.slider__nav_actions_button}>
                <BsChevronLeft onClick={() => swiper.current.slidePrev()} size={24} />
              </button>
              <button aria-label="boton siguiente slider" className={styles.slider__nav_actions_button}>
                <BsChevronRight onClick={() => swiper.current.slideNext()} size={24} />
              </button>
            </div>
          </div>
          <div className={styles.slider__list}>
            <Swiper
              ref={swiperRef}
              spaceBetween={20}
              slidesPerView={3}
              breakpoints={{
                319: {
                  slidesPerView: 1,
                },
                720: {
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                1024: {
                  slidesPerView: 3,
                }
              }}
            >
              {data.length !== 0 ? data.map((product: IProduct, i: number) => (
                <SwiperSlide key={i}>
                  <OfferItem product={product} />
                </SwiperSlide>
              )) : (
                Array(3).fill('').map((_: any, i: number) => (
                  <SwiperSlide key={i}>
                    <LoadingCard />
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </section >
  )
}