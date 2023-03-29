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

const NAV_LINKS = [
  { id: 'section-1', label: 'Section 1', isActive: false },
  { id: 'section-2', label: 'Section 2', isActive: false },
  { id: 'section-3', label: 'Section 3', isActive: false },
];

const ProductsPage = () => {
  const [navLinks, setNavLinks] = useState(NAV_LINKS);
  const [openModal, setOpenModal] = useState(false)
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
              <button
                className={navLinks[2].isActive ? styles.categories__button_active : styles.categories__button}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('section-3');
                }}
              >
                Vacuno x Kg.
              </button>
              <button className={styles.categories__button}>
                Pollo
              </button>
              <button className={styles.categories__button}>
                Cerdo
              </button>
              <button className={styles.categories__button}>
                Cordero
              </button>
              <button className={styles.categories__button}>
                Achuras y Embutidos
              </button>
              <button className={styles.categories__button}>
                Elaborados
              </button>
              <button className={styles.categories__button}>
                Varios
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
              <div id="section-1" ref={el => targetRefs.current[0] = el} className={styles.list__menu_subcategory}>
                <div>
                  <h2 className={styles.list__menu_subcategory_title}>Ofertas de la Semana</h2>
                  <p className={styles.list__menu_subcategory_description}>Todos los precios son por kg.</p>
                </div>
                <div className={styles.list__products}>
                  {Array(4).fill('').map(() => (
                    <div onClick={() => setOpenModal(true)} className={styles.list__products_item}>
                      <div>
                        <h3 className={styles.list__products_title}>Combo Whopper 2x1</h3>
                        <div className={styles.list__products_price}>$ 2,000.00</div>
                      </div>
                      <div>
                        <Image src='https://lh3.googleusercontent.com/fife/AMPSemdihEiz5P8O4C0pEF_Z9urCz_Q4ZO4KcP4HeJ7rlgWt5keeyiQafBR9hE9u7eTESSqIbswETaiK1DnZT3UPT6BeLBGdQr5AxhLwomWCAhybmOfNghduoAYJtFhPyDCWkrL5WhYo-NrHFfMGHPfrEivJvYGE3xdXhkQGE7KTRlLGpqfLttlx0fBWGyHincTCCtvaRCgK6UieCP7Dj80ViMUfY6kzDnm83UKqkz5DrtEoqU1FdBFHMMvvbZPSqerceExXa-mldcLNj-i9SZtng9cS1yc1GQu1PGv7S0CvYr_YXAZlRvyfamheUoy2Lk9iH2ChuJHmwmzYRxAxNii6pGyQZayfylQRDm2kGVb-dp4gJMRaUhwRcyepOnEp9R2IeLw2QSiML_ASLiubCETrsqCSQLrR8zT8pUV9Iv0ASte1lyB3QAHuBFa_YdEK6KY9NqBp5PMTeyC_1g5gITL_x4F_JZEzl1D0lyzeb9C-vZK959dU6I-RyCU6dhCVd5nZDcRgQnVM7mib66jz2qfuVCtglO27PskdvU7-M6AAkS9ZT4j7DSaO8rhDGcyKjO7gVUQy7AbdwTpZJE6xM8r_GWH6BLwRtuN4YJqfP-_QYVkfOPNpqKTnALzatpJN8uVc-PsMg8VXJwdUcpbJoXAy1ZK7ktEEzi0lqs1FtvutUopUohE734YjavrgVFPZze99xTECWw-V333XZz4n28rZgh8o765shaOydLUX3AJLJ0kaU5sYvSJk542d27uTZ1Eecn7OHlkhP5WkI4rNRp5xmf51HrC8Ql-dJP6b0pr-f9sn9CRx6wPYGOxEVwToOQnFO4eXPDx3o3Xxd69qWl8U-AYg_BSRX3dX7JM19xtxJUe_OFXW9G2hSYUC230UGIVRAKaXCt6uBk05cpUjBDklUBYPB5e7GWUadMQWl2PKE24PcK5Y7WXwo54F8lZbB-L2lztEyvmY2ACDtGDfQyMia8KuwumFjkI-BQ04o0pd1_zYKpuSD_wFCv9iZfoBNp0DgoXsbdypCAVhU2uXmxGHZ0tVn4HV2tJKOyGK1ysi9PJwrKgO_0HkTckNlrJd2a22G7eDhwjkXV65pyXsmTm3o_aLPtQ5HrFQR1rW3i749gjoVLKMnbdY3hybD0eCz56XeDXGRMVPTsfgKg8aAZXZVlmpqlS8PgAKLpSwmmD0HVbb5S3QDYps3UC64HXh_PwXsNrVQKfkY1Bk85o1RR7KQHO86VEUfjMo3FkyYV3tLypJyN_DStSqBnWWWOblUN69YDMESSMowpeTzt61-baczOBt5m87swR9QFtg1aoiJ6qk-rRVIwkmh_PLDE8wlJOLsnQ4ZgZvmIOvAtIyRx2AueiKPVrN2i6XUTKBfFc_SB87m1BYg3aiqiE2uG4YYzIfU6NZ75mEKuhDkF37589k4d6foMhXqRcOXi1kl_jT2-B3t8NhM-gwtCto_JVizLoGr2_T79h7DsNpJuBb6fkAk7ILeER5VopP5xNpvTL9c3XlrgtGyaAkQn-8utBxuHPt5UFJJ3T5SRGd65IQzmJYswedhq0cZb9X=w1349-h767' alt='' height={50} width={70} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.list__menu_subcategory}>
                <div>
                  <h2 className={styles.list__menu_subcategory_title}>Vacuno x Pieza</h2>
                  <p className={styles.list__menu_subcategory_description}>Ternera y novillito chico de producción propia criado a campo con terminación en corral.</p>
                </div>
                <div id="section-2" ref={el => targetRefs.current[1] = el} className={styles.list__products}>
                  {Array(12).fill('').map(() => (
                    <div onClick={() => setOpenModal(true)} className={styles.list__products_item}>
                      <div>
                        <h3 className={styles.list__products_title}>Combo Whopper 2x1</h3>
                        <div className={styles.list__products_price}>$ 2,000.00</div>
                      </div>
                      <div>
                        <Image src='https://lh3.googleusercontent.com/fife/AMPSemdihEiz5P8O4C0pEF_Z9urCz_Q4ZO4KcP4HeJ7rlgWt5keeyiQafBR9hE9u7eTESSqIbswETaiK1DnZT3UPT6BeLBGdQr5AxhLwomWCAhybmOfNghduoAYJtFhPyDCWkrL5WhYo-NrHFfMGHPfrEivJvYGE3xdXhkQGE7KTRlLGpqfLttlx0fBWGyHincTCCtvaRCgK6UieCP7Dj80ViMUfY6kzDnm83UKqkz5DrtEoqU1FdBFHMMvvbZPSqerceExXa-mldcLNj-i9SZtng9cS1yc1GQu1PGv7S0CvYr_YXAZlRvyfamheUoy2Lk9iH2ChuJHmwmzYRxAxNii6pGyQZayfylQRDm2kGVb-dp4gJMRaUhwRcyepOnEp9R2IeLw2QSiML_ASLiubCETrsqCSQLrR8zT8pUV9Iv0ASte1lyB3QAHuBFa_YdEK6KY9NqBp5PMTeyC_1g5gITL_x4F_JZEzl1D0lyzeb9C-vZK959dU6I-RyCU6dhCVd5nZDcRgQnVM7mib66jz2qfuVCtglO27PskdvU7-M6AAkS9ZT4j7DSaO8rhDGcyKjO7gVUQy7AbdwTpZJE6xM8r_GWH6BLwRtuN4YJqfP-_QYVkfOPNpqKTnALzatpJN8uVc-PsMg8VXJwdUcpbJoXAy1ZK7ktEEzi0lqs1FtvutUopUohE734YjavrgVFPZze99xTECWw-V333XZz4n28rZgh8o765shaOydLUX3AJLJ0kaU5sYvSJk542d27uTZ1Eecn7OHlkhP5WkI4rNRp5xmf51HrC8Ql-dJP6b0pr-f9sn9CRx6wPYGOxEVwToOQnFO4eXPDx3o3Xxd69qWl8U-AYg_BSRX3dX7JM19xtxJUe_OFXW9G2hSYUC230UGIVRAKaXCt6uBk05cpUjBDklUBYPB5e7GWUadMQWl2PKE24PcK5Y7WXwo54F8lZbB-L2lztEyvmY2ACDtGDfQyMia8KuwumFjkI-BQ04o0pd1_zYKpuSD_wFCv9iZfoBNp0DgoXsbdypCAVhU2uXmxGHZ0tVn4HV2tJKOyGK1ysi9PJwrKgO_0HkTckNlrJd2a22G7eDhwjkXV65pyXsmTm3o_aLPtQ5HrFQR1rW3i749gjoVLKMnbdY3hybD0eCz56XeDXGRMVPTsfgKg8aAZXZVlmpqlS8PgAKLpSwmmD0HVbb5S3QDYps3UC64HXh_PwXsNrVQKfkY1Bk85o1RR7KQHO86VEUfjMo3FkyYV3tLypJyN_DStSqBnWWWOblUN69YDMESSMowpeTzt61-baczOBt5m87swR9QFtg1aoiJ6qk-rRVIwkmh_PLDE8wlJOLsnQ4ZgZvmIOvAtIyRx2AueiKPVrN2i6XUTKBfFc_SB87m1BYg3aiqiE2uG4YYzIfU6NZ75mEKuhDkF37589k4d6foMhXqRcOXi1kl_jT2-B3t8NhM-gwtCto_JVizLoGr2_T79h7DsNpJuBb6fkAk7ILeER5VopP5xNpvTL9c3XlrgtGyaAkQn-8utBxuHPt5UFJJ3T5SRGd65IQzmJYswedhq0cZb9X=w1349-h767' alt='' height={50} width={70} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div id="section-3" ref={el => targetRefs.current[2] = el} className={styles.list__menu_subcategory}>
                <div>
                  <h2 className={styles.list__menu_subcategory_title}>Vacuno x Kg.</h2>
                  <p className={styles.list__menu_subcategory_description}>Ternera y novillito chico de producción propia criado a campo con terminanción en corral.</p>
                </div>
                <div className={styles.list__products}>
                  {Array(1).fill('').map(() => (
                    <div className={styles.list__products_item}>
                      <div>
                        <h3 className={styles.list__products_title}>Combo Whopper 2x1</h3>
                        <div className={styles.list__products_price}>$ 2,000.00</div>
                      </div>
                      <div>
                        <Image src='https://lh3.googleusercontent.com/fife/AMPSemdihEiz5P8O4C0pEF_Z9urCz_Q4ZO4KcP4HeJ7rlgWt5keeyiQafBR9hE9u7eTESSqIbswETaiK1DnZT3UPT6BeLBGdQr5AxhLwomWCAhybmOfNghduoAYJtFhPyDCWkrL5WhYo-NrHFfMGHPfrEivJvYGE3xdXhkQGE7KTRlLGpqfLttlx0fBWGyHincTCCtvaRCgK6UieCP7Dj80ViMUfY6kzDnm83UKqkz5DrtEoqU1FdBFHMMvvbZPSqerceExXa-mldcLNj-i9SZtng9cS1yc1GQu1PGv7S0CvYr_YXAZlRvyfamheUoy2Lk9iH2ChuJHmwmzYRxAxNii6pGyQZayfylQRDm2kGVb-dp4gJMRaUhwRcyepOnEp9R2IeLw2QSiML_ASLiubCETrsqCSQLrR8zT8pUV9Iv0ASte1lyB3QAHuBFa_YdEK6KY9NqBp5PMTeyC_1g5gITL_x4F_JZEzl1D0lyzeb9C-vZK959dU6I-RyCU6dhCVd5nZDcRgQnVM7mib66jz2qfuVCtglO27PskdvU7-M6AAkS9ZT4j7DSaO8rhDGcyKjO7gVUQy7AbdwTpZJE6xM8r_GWH6BLwRtuN4YJqfP-_QYVkfOPNpqKTnALzatpJN8uVc-PsMg8VXJwdUcpbJoXAy1ZK7ktEEzi0lqs1FtvutUopUohE734YjavrgVFPZze99xTECWw-V333XZz4n28rZgh8o765shaOydLUX3AJLJ0kaU5sYvSJk542d27uTZ1Eecn7OHlkhP5WkI4rNRp5xmf51HrC8Ql-dJP6b0pr-f9sn9CRx6wPYGOxEVwToOQnFO4eXPDx3o3Xxd69qWl8U-AYg_BSRX3dX7JM19xtxJUe_OFXW9G2hSYUC230UGIVRAKaXCt6uBk05cpUjBDklUBYPB5e7GWUadMQWl2PKE24PcK5Y7WXwo54F8lZbB-L2lztEyvmY2ACDtGDfQyMia8KuwumFjkI-BQ04o0pd1_zYKpuSD_wFCv9iZfoBNp0DgoXsbdypCAVhU2uXmxGHZ0tVn4HV2tJKOyGK1ysi9PJwrKgO_0HkTckNlrJd2a22G7eDhwjkXV65pyXsmTm3o_aLPtQ5HrFQR1rW3i749gjoVLKMnbdY3hybD0eCz56XeDXGRMVPTsfgKg8aAZXZVlmpqlS8PgAKLpSwmmD0HVbb5S3QDYps3UC64HXh_PwXsNrVQKfkY1Bk85o1RR7KQHO86VEUfjMo3FkyYV3tLypJyN_DStSqBnWWWOblUN69YDMESSMowpeTzt61-baczOBt5m87swR9QFtg1aoiJ6qk-rRVIwkmh_PLDE8wlJOLsnQ4ZgZvmIOvAtIyRx2AueiKPVrN2i6XUTKBfFc_SB87m1BYg3aiqiE2uG4YYzIfU6NZ75mEKuhDkF37589k4d6foMhXqRcOXi1kl_jT2-B3t8NhM-gwtCto_JVizLoGr2_T79h7DsNpJuBb6fkAk7ILeER5VopP5xNpvTL9c3XlrgtGyaAkQn-8utBxuHPt5UFJJ3T5SRGd65IQzmJYswedhq0cZb9X=w1349-h767' alt='' height={50} width={70} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                    <option value="">1</option>
                    <option value="">2</option>
                  </Select>
                </div>
                <hr className={styles.order__card_divider}></hr>
                <div className={styles.order__card_wrapper}>
                  <p>Para</p>
                  <Select style={{ width: 'calc(100% - 80px)' }}>
                    <option value="">1</option>
                    <option value="">2</option>
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