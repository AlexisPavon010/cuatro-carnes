import 'swiper/css';
import "swiper/css/navigation";
import { Navigation } from 'swiper';
import { IProduct } from '@/interfaces/products';
import { Swiper, SwiperSlide } from 'swiper/react';

import { LoadingCard } from '../LoadingCard';
import { OfferItem } from '../OfferItem';

interface OfferSliderProps {
  products: IProduct[];
  setOpenModal: (state: any) => void;
}

export const OfferSlider = ({ products, setOpenModal }: OfferSliderProps) => {

  function filterProductsByOffers(products: IProduct[]) {
    return products.filter(p => p.category === 'Ofertas semanales')
  }

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
      {
        filterProductsByOffers(products).length === 0
          ? Array(3).fill('').map((_: any, i: number) => (
            <SwiperSlide key={i}>
              <LoadingCard />
            </SwiperSlide>
          ))
          : filterProductsByOffers(products).map((product, i) => (
            <SwiperSlide key={i}>
              <OfferItem product={product} setOpenModal={setOpenModal} />
            </SwiperSlide>
          ))
      }
    </Swiper>
  )
}
