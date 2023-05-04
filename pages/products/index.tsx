import { Select } from 'antd'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { BsChevronRight, } from 'react-icons/bs'
import { Swiper, SwiperSlide, } from 'swiper/react';
import 'swiper/css';

import { Layout } from '@/components/Layout'
import styles from './styles.module.scss'
import { OrderModal } from '@/components/Modals';
import { CartItem } from '@/components/CartItem'
import { useSwrFetcher } from '@/hooks/useSwrFetcher'
import { IProduct } from '@/interfaces/products'
import { ICategories } from '@/interfaces/categories'
import { LoadingItem } from '@/components/LoadingItem'
import { setShippingMethod } from '@/store/cart/shoppingSlice'

const NAV_LINKS = [
  { id: 'section-1', label: 'Section 1', isActive: false },
  { id: 'section-2', label: 'Section 2', isActive: false },
  { id: 'section-3', label: 'Section 3', isActive: false },
];

const ProductsPage = () => {
  const [openModal, setOpenModal] = useState<{ visible: boolean, product: undefined | IProduct }>({ visible: false, product: undefined })
  const { cart, pickup_or_delivery } = useSelector((state: any) => state.shopping)
  const { userDirection } = useSelector((state: any) => state.places)
  const { data: categories, isLoading } = useSwrFetcher('/api/categories')
  const [navLinks, setNavLinks] = useState(NAV_LINKS);
  const { data: products } = useSwrFetcher('/api/products')
  const targetRefs = useRef<any>([]);
  const dispatch = useDispatch()


  function filterProductsByCategory(products: IProduct[], categories: ICategories[]) {
    const filteredProductsByCategory = {};

    categories.forEach((category) => {
      const filteredProducts = products.filter((product: IProduct) => {
        return product.category === category.name;
      });

      if (filteredProducts.length > 0) {
        // @ts-ignore 
        filteredProductsByCategory[category.name] = {
          name: category.name,
          products: filteredProducts,
        };
      }
    });

    return Object.values(filteredProductsByCategory);
  }

  const scrollToSection = (sectionId: string) => {
    const section: any = document.getElementById(sectionId);
    section.scrollIntoView({ block: 'start', inline: 'nearest', behavior: "smooth" });
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.75 // Change this value to adjust when the element should be considered visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log(`Element with id "${entry.target.id}" is visible!`);
          // Update the corresponding nav link object in state
          setNavLinks(prevNavLinks => {
            const currentNavLink: any = prevNavLinks.find(navLink => navLink.id === entry.target.id);
            // Deactivate any other navLinks that are active
            return prevNavLinks.map(navLink => {
              if (navLink.isActive && navLink.id !== currentNavLink.id) {
                return { ...navLink, isActive: false };
              }
              return navLink;
            }).map(navLink => {
              if (navLink.id === currentNavLink.id) {
                return { ...navLink, isActive: true };
              }
              return navLink;
            });
          });
        }
      });
    }, options);

    targetRefs.current.forEach((targetRef: any) => {
      if (targetRef) {
        observer.observe(targetRef);
      }
    });

    return () => {
      targetRefs.current.forEach((targetRef: any) => {
        if (targetRef) {
          observer.unobserve(targetRef);
        }
      });
    };
  }, []);

  return (
    <Layout title='Productos - Cuatro Carnes'>
      <section className={styles.hero}>
        <div className={styles.hero__container}>
          {/* <Slider /> */}
          <div className={styles.slider__list}>
            <Swiper
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
              {Array(8).fill('').map((_, i) => (
                <SwiperSlide key={i}>
                  < div className={styles.slider__list_item} >
                    <div className={styles.slider__list_item_image}>
                      <div className={styles.slider__list_item_price}>
                        $ 2600.00
                      </div>
                    </div>
                    <h3 className={styles.slider__list_item_text}>Matambre vacuno entero (1,5kg).</h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div >
      </section >
      <section className={styles.categories}>
        <div className={styles.categories__container}>
          <div className={styles.categories__wrapper}>
            <div className={styles.categories__start}>
              <button
                className={navLinks[0].isActive ? styles.categories__button_active : styles.categories__button}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('section-1');
                }}
              >
                Ofertas de la Semana
              </button>
              <button
                className={navLinks[1].isActive ? styles.categories__button_active : styles.categories__button}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('section-2');
                }}
              >
                Vacuno x Pieza
              </button>
            </div>
            {/* <div className={styles.categories__end}>
              <h5 className={styles.categories__subcategorie}>
                Mas
              </h5>
              <BsChevronUp />
            </div> */}
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.list__menu}>
            <div className={styles.list__menu_wrapper}>
              {isLoading
                ? <LoadingItem />
                : filterProductsByCategory(products, categories).map(({ name, products }: any, i: number) => (
                  <div id={`section-${i + 1}`} ref={el => targetRefs.current[i + 1] = el} className={styles.list__menu_subcategory}>
                    <div>
                      <h2 className={styles.list__menu_subcategory_title}>{name}</h2>
                      <p className={styles.list__menu_subcategory_description}>Todos los precios son por kg.</p>
                    </div>
                    <div className={styles.list__products}>
                      {products.map((item: IProduct) => (
                        <div onClick={() => setOpenModal({ visible: true, product: item })} className={styles.list__products_item}>
                          <div>
                            <h3 className={styles.list__products_title}>{item.title}</h3>
                            <div className={styles.list__products_price}>{`$${item.price}`}</div>
                          </div>
                          <div>
                            <Image src={item.image} alt='' height={50} width={70} style={{
                              height: '100%',
                              objectFit: 'cover'
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              }
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
                  <p>{pickup_or_delivery === 'delivery' ? 'Donde' : 'Orden'}</p>
                  <Select
                    className={styles.order__select}
                    style={{ width: 'calc(100% - 80px)' }}
                    defaultValue={pickup_or_delivery === 'delivery' ? userDirection : 'Para retirar'}
                    onChange={(value) => dispatch(setShippingMethod(value))}
                    disabled
                  >
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Retirar</option>
                  </Select>
                </div>
                <hr className={styles.order__card_divider}></hr>
                <div className={styles.order__card_wrapper}>
                  <p>Para</p>
                  <Select
                    className={styles.order__select}
                    // onChange={(value) => dispatch(setPickUpTime(value))}
                    style={{ width: 'calc(100% - 80px)', visibility: pickup_or_delivery === 'delivery' ? 'hidden' : 'visible' }}
                  >
                    <option value="1">Mañana (7:00am - 12:00pm)</option>
                    <option value="2">Mediodia (12:00pm - 14:00pm)</option>
                    <option value="3">Tarde (16:00pm - 21:00pm)</option>
                  </Select>
                </div>
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
      <OrderModal open={openModal} close={setOpenModal} />
    </Layout >
  )
}

export default ProductsPage