import { useEffect, useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { Dropdown, Space } from 'antd';

import { ICategories } from '@/interfaces/categories';
import styles from './styles.module.scss';

export const NavbarCategories = ({ categories, setProducts, feed = [] }: any) => {
  const [active, setActive] = useState(0)
  const buttonRefs = useRef<Array<HTMLButtonElement | any>>([]);
  const [dropdownCategories, setDropdownCategories] = useState(categories);

  const scrollToSection = (sectionId: string) => {
    const section: any = document.getElementById(sectionId);
    if (section) {
      const topPos = section.offsetTop - 100;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    } else {
      console.log(`La sección ${sectionId} no existe`);
    }
  };

  function filterProductsByCategory(name: string) {
    const filteredCategory = feed.find((categoryObj: ICategories) => categoryObj.name === name);

    if (filteredCategory) {
      setProducts([filteredCategory]); // Retorna el resultado envuelto en un array
    } else {
      setProducts(feed);
    }
  }

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          categories.forEach(({ name }: { name: string }) => {
            const button = buttonRefs.current.find((ref) => ref?.dataset.category === name);
            if (!button.classList) return
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


  useEffect(() => {
    const handleResize = () => {
      const containerWidth = document.getElementById('categories__container')!.offsetWidth;
      const categoriesWidth = document.getElementById('categories__wrapper')!.offsetWidth;

      let visibleCategoriesArray: any = [];
      let dropdownCategoriesArray: any = [];

      let totalWidth = 150;
      if (containerWidth && categoriesWidth) {
        if (!buttonRefs.current) return
        buttonRefs.current.forEach((button) => {
          const buttonWidth = button.offsetWidth;
          if (totalWidth + buttonWidth <= containerWidth) {
            visibleCategoriesArray.push(button.dataset.category);
            totalWidth += buttonWidth;
          } else {
            dropdownCategoriesArray.push(button.dataset.category);
          }
        });
        setDropdownCategories(dropdownCategoriesArray)
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [categories]);

  const items = dropdownCategories.map((name: string) =>
  ({
    label: name, id: name,
    onClick: () => {
      scrollToSection('list-menu'),
        filterProductsByCategory(name)
    }
  }))

  return (
    <div className={styles.categories__container} id="categories__container">
      <div className={styles.categories__wrapper} id="categories__wrapper">
        <nav className={styles.categories__start} >
          <button
            className={styles.categories__button}
            ref={(button) => {
              buttonRefs.current[0] = button;
            }}
            onClick={() => {
              filterProductsByCategory('')
              scrollToSection('list-menu')
              setActive(0)
            }}
          >
            TODOS
          </button>
          {categories.map(({ name }: any, i: number) => {
            const truncatedName = name.length > 10 ? `${name.substring(0, 10)}...` : name;
            return (
              <button
                key={i}
                className={styles.categories__button}
                data-category={name}
                ref={(button) => {
                  buttonRefs.current[i + 1] = button;
                }}
                onClick={() => {
                  filterProductsByCategory(name)
                  scrollToSection('list-menu')
                  setActive(i + 1)
                }}
              >
                {name.toUpperCase()}
              </button>
            )
          })}

        </nav>
        <div className={styles.categories__end}>
          {dropdownCategories && (
            <Dropdown
              trigger={['click']}
              menu={{ items }}
            >
              <Space style={{ whiteSpace: 'nowrap' }}>
                Mas
                <BiChevronDown />
              </Space>
            </Dropdown>
          )}
        </div>
      </div>
    </div >
  );
};