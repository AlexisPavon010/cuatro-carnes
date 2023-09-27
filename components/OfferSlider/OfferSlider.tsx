import 'swiper/css';
import "swiper/css/navigation";
import { Navigation } from 'swiper';
import { IProduct } from '@/interfaces/products';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useSwrFetcher } from '@/hooks/useSwrFetcher';
import { LoadingCard } from '../LoadingCard';
import { OfferItem } from '../OfferItem';

export const OfferSlider = () => {
  const { data } = useSwrFetcher('/api/products/offers');
  return (
    <Swiper
      modules={[Navigation]}
      navigation={true}
      spaceBetween={20}
      slidesPerView={3}
      breakpoints={{
        20: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        768: {
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
  )
}
