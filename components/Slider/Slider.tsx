import { Swiper, SwiperSlide } from 'swiper/react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useEffect, useRef } from 'react';
import Link from 'next/link'
import 'swiper/css';

import styles from './styles.module.scss';
import { IProduct } from '@/interfaces/products';
import { OfferItem } from '../OfferItem';

interface SliderProps {
  products: IProduct[]
}

export const Slider = ({ products }: SliderProps) => {
  const swiperRef = useRef<any>(null);
  const swiper = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiper.current = swiperRef.current.swiper;
    }
  }, [swiperRef]);

  return (
    <section className={styles.slider}>
      <div className={styles.slider__container}>
        <div className={styles.slider__layout}>
          <div className={styles.slider__nav}>
            <h2 className={styles.slider__nav_title}>
              Ofertas
            </h2>
            <div className={styles.slider__nav_actions}>
              <Link href='/' className={styles.slider__nav_actions_links}>
                Ver todo
              </Link>
              <button aria-label="boton anterior slider" className={styles.slider__nav_actions_button}>
                <BsChevronLeft onClick={() => swiper.current.slidePrev()} size={16} />
              </button>
              <button aria-label="boton siguiente slider" className={styles.slider__nav_actions_button}>
                <BsChevronRight onClick={() => swiper.current.slideNext()} size={16} />
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
              {products.map((product, i) => (
                <SwiperSlide key={i}>
                  <OfferItem product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section >
  )
}
