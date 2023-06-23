import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Navigation } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';

import styles from './styles.module.scss';

export const NavbarCategories = ({ categories }: any) => {
  const [active, setActive] = useState(0)

  const scrollToSection = (sectionId: string) => {
    const section: any = document.getElementById(sectionId);
    if (section) {
      const topPos = section.offsetTop - 100;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    } else {
      console.log(`La sección ${sectionId} no existe`);
    }
  };

  const buttonRefs = useRef<Array<HTMLButtonElement | any>>([]);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          categories.forEach(({ name }: { name: string }) => {
            const button = buttonRefs.current.find((ref) => ref?.dataset.category === name);
            button.classList.remove(styles.categories__button_active);
            if (sectionId === name) {
              button.classList.add(styles.categories__button_active);
            }
          });
        }
      });
    };

    const observerOptions = {
      threshold: 0.2
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observeSections = () => {
      const sections = document.querySelectorAll('aside');
      if (sections.length > 0) {
        sections.forEach((section) => {
          observer.observe(section);
        });
      } else {
        setTimeout(observeSections, 100);
      }
    };

    observeSections();

    return () => {
      observer.disconnect();
    };
  }, [categories, active]);

  return (
    <div className={styles.categories__container}>
      <div className={styles.categories__wrapper}>
        <div className={styles.categories__start}>
          <Swiper
            modules={[Navigation]}
            navigation={true}
            spaceBetween={0}
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
            {categories.map(({ name }: any, i: number) => {
              const truncatedName = name.length > 10 ? `${name.substring(0, 10)}...` : name;
              return (
                <SwiperSlide style={{ textAlign: 'center' }} key={i}>
                  <button
                    key={i}
                    className={styles.categories__button}
                    data-category={name}
                    ref={(button) => {
                      buttonRefs.current[i] = button;
                    }}
                    onClick={() => {
                      scrollToSection(name);
                      setActive(i)
                    }}
                  >
                    {name.toUpperCase()}
                  </button>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div >
      </div>
    </div>
  );
};