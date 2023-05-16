import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide, } from 'swiper/react';
import 'swiper/css';

import styles from './styles.module.scss';

export const NavbarCategories = ({ categories }: any) => {
  const [active, setActive] = useState(0)

  const scrollToSection = (sectionId: string) => {
    const section: any = document.getElementById(sectionId);
    section.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
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
        // El NodeList está vacío, esperar un poco y volver a intentar
        setTimeout(observeSections, 100);
      }
    };

    observeSections();

    return () => {
      observer.disconnect();
    };
  }, [categories, active]);

  return (
    <div className={styles.categories__wrapper}>
      <div className={styles.categories__start}>
        <Swiper
          spaceBetween={0}
          slidesPerView={3}
          breakpoints={{
            360: {
              slidesPerView: 3,
            },
            480: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 5,
            },
            808: {
              slidesPerView: 6,
            },
            900: {
              slidesPerView: 7,
            },
            1024: {
              slidesPerView: 9,
            }
          }}
        >
          {categories.map(({ name }: any, i: number) => (
            <SwiperSlide key={i}>
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
                {name}
              </button>
            </SwiperSlide>
          ))
          }
        </Swiper>
      </div >
    </div>
  );
};