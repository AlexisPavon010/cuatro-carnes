import { Select } from 'antd'
import Image from 'next/image'
import { useSelector } from 'react-redux'
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

const NAV_LINKS = [
  { id: 'section-1', label: 'Section 1', isActive: false },
  { id: 'section-2', label: 'Section 2', isActive: false },
  { id: 'section-3', label: 'Section 3', isActive: false },
];

const ProductsPage = () => {
  const { data: categories, isLoading } = useSwrFetcher('/api/categories')
  const { data: products } = useSwrFetcher('/api/products')

  function filterProductsByCategory(products: IProduct[], categories: ICategories[]) {
    const filteredProductsByCategory = {};

    categories.forEach((category) => {
      const filteredProducts = products.filter((product: IProduct) => {
        return product.category === category.name;
      });

      // @ts-ignore 
      filteredProductsByCategory[category.name] = {
        name: category.name,
        products: filteredProducts,
      };
    });

    return Object.values(filteredProductsByCategory);
  }

  const [navLinks, setNavLinks] = useState(NAV_LINKS);
  const [openModal, setOpenModal] = useState<{ visible: boolean, product: undefined | IProduct }>({ visible: false, product: undefined })
  const { cart } = useSelector((state: any) => state.shopping)
  const targetRefs = useRef<any>([]);

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
    <Layout>
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
                  <svg className={styles.list__card_image} style={{ width: '40px' }} xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 24" fill='#A92B3C'>
                    <g>
                      <path d="M2,9.6c-0.2-1,0.8-1.8,1.6-1.3L7.3,10c0.5,0.3,1.2,0.1,1.5-0.5l2.1-3.7c0.5-0.8,1.6-0.8,2,0L15,9.6   c0.3,0.5,0.9,0.8,1.5,0.5l3.9-1.7C21.3,8,22.2,8.8,22,9.8l-1.7,8.1c-0.1,0.6-0.6,0.9-1.1,0.9H4.9c-0.5,0-1-0.4-1.1-0.9L2,9.6z" />
                    </g>
                  </svg>
                </div>
                <div>
                  <h2 className={styles.list__card_title}>Recompensas y ofertas</h2>
                  <p className={styles.list__card_description}>
                    Agrega una oferta o recompensa a tu pedido
                  </p>
                </div>
                <div className={styles.list__card_actions}>
                  <BsChevronRight color='gray' size={16} />
                </div>
              </div>
              <div className={styles.order__card}>
                <div className={styles.order__card_wrapper}>
                  <p>Orden</p>
                  <Select style={{ width: 'calc(100% - 80px)' }}>
                    <option value="1">Ordenar</option>
                    <option value="2">Retirar</option>
                  </Select>
                </div>
                <hr className={styles.order__card_divider}></hr>
                <div className={styles.order__card_wrapper}>
                  <p>Para</p>
                  <Select style={{ width: 'calc(100% - 80px)' }}>
                    <option value="1">11:00</option>
                    <option value="2">13:00</option>
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