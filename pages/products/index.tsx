import { Select } from 'antd'
import { useState, useEffect } from 'react'
import { BsChevronRight, } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

import styles from './styles.module.scss';
import { Layout } from '@/components/Layout';
import { IProduct } from '@/interfaces/products';
import { OrderModal } from '@/components/Modals';
import { CartItem } from '@/components/CartItem';
import { useSwrFetcher } from '@/hooks/useSwrFetcher';
import { ProductItem } from '@/components/ProductItem';
import { LoadingItem } from '@/components/LoadingItem';
import { OfferSlider } from '@/components/OfferSlider';
import { setPickUpTime } from '@/store/places/placesSlice';
import { CartItemMobile } from '@/components/CartItemMobile';
import { setShippingMethod } from '@/store/cart/shoppingSlice';
import { NavbarCategories } from '@/components/NavbarCategories';
import { LoadingCategories } from '@/components/LoadingCategories';

const ProductsPage = () => {
  const { data: { offers, categories = [], feed }, isLoading } = useSwrFetcher('/api/products/feed')
  const { cart, pickup_or_delivery } = useSelector((state: any) => state.shopping)
  const [openCartMobile, setOpenCartMobile] = useState(false)
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (!feed) return
    setProducts(feed)
  }, [feed])

  return (
    <Layout title='Productos - Cuatro Carnes'>
      <section className={styles.hero} id='hero'>
        <div className={styles.hero__container}>
          {/* <Slider /> */}
          <div className={styles.slider__list}>
            <OfferSlider />
          </div>
        </div >
      </section >
      <section className={styles.categories}>
        {
          categories?.length === 0
            ? <LoadingCategories />
            : <NavbarCategories
              feed={feed}
              categories={categories}
              setProducts={setProducts}
            />
        }
        <div className={styles.list}>
          <div className={styles.list__menu} id='list-menu'>
            <div className={styles.list__menu_wrapper}>
              {products?.length === 0
                ? <LoadingItem />
                : products?.map(({ name, products }: any, i: number) => (
                  <aside key={i} id={name} className={styles.list__menu_subcategory}>
                    <div>
                      <h2 className={styles.list__menu_subcategory_title}>{name}</h2>
                      <p className={styles.list__menu_subcategory_description}>Todos los precios son por kg.</p>
                    </div>
                    <div className={styles.list__products}>
                      {products.map((item: IProduct, i: number) => (
                        <ProductItem key={i} item={item} />
                      ))}
                    </div>
                  </aside>
                ))
              }
              {cart.length > 0 && (
                <div className={styles.list__mobile_content}>
                  <button onClick={() => setOpenCartMobile(true)} className={styles.list__mobile_button}>
                    <span className={styles.list__mobile_button_content}>
                      <div>Ver la orden</div>
                    </span>
                  </button>
                  <CartItemMobile
                    open={openCartMobile}
                    close={setOpenCartMobile}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.list__menu_configuration}>
            <div>
              <div className={styles.list__card}>
                <div>
                  <svg className={styles.list__card_image} style={{ width: '40px' }} xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 48 48" version="1.1" >
                    <g id="large_icon/coupon" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <circle id="circle" fill='#A92B3C' cx="24" cy="24" r="24" />
                      <path d="M25.2684309,11.5024332 C26.1789969,10.7367579 27.3511682,10.8502737 28.4829198,11.8151581 C29.8369797,12.9592194 31.0697805,14.088813 32.2531795,15.2606968 C33.2805135,16.2801133 34.2876376,17.3484974 35.3306904,18.5281715 C36.4882657,19.836942 38.0747389,21.1000836 37.9972678,22.7126758 C37.9647075,23.3670611 37.7951693,24.180591 37.1091572,24.8995245 C35.2678153,26.8292933 33.5050674,28.0857575 31.8905249,29.6861078 L31.8905249,29.6861078 L26.9054287,34.7542548 C26.8425537,34.8154643 26.7841696,34.8711093 26.7123124,34.9423349 L26.7123124,34.9423349 L26.6550512,34.9990928 L26.6382096,35.0068831 L25.3110962,36.2611216 C24.9102675,36.6395076 24.3937936,36.8698779 23.8425138,36.913281 C21.3061777,37.1158288 13.7218703,36.9744905 12.9673692,36.3735245 C12.1240571,35.6992461 12.0127752,35.2658807 12.0008266,31.8963529 L12,30.6368794 C12.0070369,27.7740797 12.095492,26.1109162 12.2880937,25.0998465 C12.359951,24.7247992 12.5047882,24.3742357 12.7214827,24.0592849 C12.7259738,24.0526075 12.7293421,24.047043 12.7338332,24.0403656 C13.1941687,23.3703998 13.7106426,22.7449499 14.2798867,22.1629032 C15.2059843,21.215516 16.5956402,19.7913096 18.0529148,18.3173025 L18.6804466,17.683781 C18.8902343,17.4724208 19.1002477,17.2612893 19.3093323,17.0516313 L19.9326456,16.4283229 C21.5812285,14.7845954 23.0964959,13.3148528 23.8874246,12.6565106 L23.8874246,12.6565106 Z M22.524607,29.7065852 C22.7076185,27.525301 19.7199291,25.8770959 17.8056072,26.9721896 C17.4698991,27.1647213 17.188084,27.3650434 16.9556708,27.5709299 C12.7026202,32.0069497 21.9856777,36.169196 22.524607,29.7065852 Z" id="icon" fill="#FFFFFF" />
                    </g>
                  </svg>
                </div>
                <div>
                  <h2 className={styles.list__card_title}>Cupones</h2>
                  <p className={styles.list__card_description}>
                    Añade el cupón a tu pedido
                  </p>
                </div>
                <div className={styles.list__card_actions}>
                  <BsChevronRight color='gray' size={16} />
                </div>
              </div>
              <div className={styles.order__card}>
                <div className={styles.order__card_wrapper}>
                  <p>Para</p>
                  <Select
                    className={styles.order__select}
                    onChange={(value) => dispatch(setShippingMethod(value))}
                    style={{ width: 'calc(100% - 80px)' }}
                    value={pickup_or_delivery}
                  >
                    <option value="DELIVERY">Delivery</option>
                    <option value="PICKUP">Retirar en el local</option>
                  </Select>
                  {/* <Tooltip title={pickup_or_delivery === 'DELIVERY' ? userDirection : ''}>
                    {pickup_or_delivery === 'DELIVERY' ? userDirection.slice(0, 30) + '...' : 'Para retirar en el local.'}
                  </Tooltip> */}
                </div>
                <hr className={styles.order__card_divider}></hr>
                {/* <div className={styles.order__card_wrapper}>
                  <p>Hora</p>
                  <Select
                    className={styles.order__select}
                    onChange={(value) => dispatch(setPickUpTime(value))}
                    style={{ width: 'calc(100% - 80px)' }}
                    value={pickUpTime}
                  >
                    <option value="Mañana (8:00am - 13:30pm)">Mañana (8:00am - 13:30pm)</option>
                    <option value="Tarde (14:30pm - 18:30pm)">Tarde (14:30pm - 18:30pm)</option>
                  </Select>
                </div> */}
              </div>
            </div>
            <div className={styles.cart_card}>
              {cart.length > 0 ? (
                <CartItem />
              ) : (
                <p>
                  Tu carrito aparecerá aquí
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      <OrderModal />
    </Layout >
  )
}

export default ProductsPage