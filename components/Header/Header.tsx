import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';

import styles from './styles.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <nav className={styles.header__nav}>
          <div className={styles.header__nav_logo_container}>
            <Link href='/'>
              <img className={styles.header__nav_logo} src="/assets/logo-cuatro-carnes.svg" alt="" />
            </Link>
          </div>
          <div className={styles.header__nav_list}>
            <div className={styles.header__nav_links}>
              <div className={styles.header__nav_item}>
                <Link href='/products'>
                  Menu
                </Link>
              </div>
              <div className={styles.header__nav_item}>
                Locales
              </div>
              <div className={styles.header__nav_item}>
                Ofertas
              </div>
              <div className={styles.header__nav_item}>
                Nosotros
              </div>
              <div className={styles.header__nav_item}>
                Cupones
              </div>
              <div className={styles.header__nav_item}>
                <Link href='/dashboard'>
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.header__nav_end}>
            <button className={styles.header__button}>
              <div className={styles.header__button_content}>
                <svg className={styles.header__button_icon} xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 24" fill='#A92B3C'>
                  <g>
                    <path d="M2,9.6c-0.2-1,0.8-1.8,1.6-1.3L7.3,10c0.5,0.3,1.2,0.1,1.5-0.5l2.1-3.7c0.5-0.8,1.6-0.8,2,0L15,9.6   c0.3,0.5,0.9,0.8,1.5,0.5l3.9-1.7C21.3,8,22.2,8.8,22,9.8l-1.7,8.1c-0.1,0.6-0.6,0.9-1.1,0.9H4.9c-0.5,0-1-0.4-1.1-0.9L2,9.6z" />
                  </g>
                </svg>
                Gana Puntos,
                <strong>
                  Únete ahora!
                </strong>
              </div>
            </button>
            <button className={styles.header__button_login}>
              Registrarse
            </button>
            <button className={styles.header__button_menu}>
              <RxHamburgerMenu size={24} />
            </button>
          </div>
        </nav>
      </div >
    </header >
  )
}
