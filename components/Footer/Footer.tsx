import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

import styles from './styles.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__menu}>
          <div className={styles.footer__menu_text}>
          </div>
          <div className={styles.footer__spacer}></div>
          {/* <div className={styles.footer__menu_info_start}>
            <h5 className={styles.footer__menu_info_text}>Links Rápidos</h5>
            <p className={styles.footer__menu_info_subtitle}>Menú</p>
            <p className={styles.footer__menu_info_subtitle}>Locales</p>
            <p className={styles.footer__menu_info_subtitle}>Nosotros</p>
          </div> */}
          {/* <div className={styles.footer__menu_info_center}>
            <h5 className={styles.footer__menu_info_text}>Información</h5>
            <p className={styles.footer__menu_info_subtitle}>Sitemap</p>
          </div> */}
          <div className={styles.footer__menu_info_end}>
            <h3 className={styles.footer__menu_info_text}>Compañía</h3>
            <Link href='/nosotros#contact' className={styles.footer__menu_info_subtitle}>
              Contáctanos
            </Link>
            <Link href='/politica-de-privacidad' className={styles.footer__menu_info_subtitle}>
              Política de privacidad
            </Link>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          <span className={styles.footer__copyrights}>2023 Cuatro Carnes &reg; Todos los derechos reservados.</span>
          <div className={styles.footer__spacer}></div>
          <div className={styles.footer__social}>
            {/* <div className={styles.footer__social_icon}>
              <FaFacebookF size={24} color='#f4e8e4' />
            </div> */}
            <div className={styles.footer__social_icon}>
              <Link href='https://www.instagram.com/cuatro_carnes' passHref legacyBehavior>
                <a target="_blank" rel="noopener noreferrer" aria-label="Link de Instagram">
                  <FaInstagram size={24} color='#f4e8e4' />
                </a>
              </Link>
            </div>
            {/* <div className={styles.footer__social_icon}>
              <FaYoutube size={24} color='#f4e8e4' />
            </div>
            <div className={styles.footer__social_icon}>
              <FaTwitter size={24} color='#f4e8e4' />
            </div> */}
          </div>
        </div>
      </div>
    </footer >
  )
}
