import { Dropdown, MenuProps, Skeleton } from 'antd';
import { useSession, signOut } from 'next-auth/react';
import { LoadingOutlined } from '@ant-design/icons';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss'

export const Header = ({ openDrawer }: any) => {
  const [loading, setLoading] = useState(false)
  const { data: session }: any = useSession()
  const router = useRouter()

  const handleNavigate = () => {
    router.push('/auth/signin')
    setLoading(true)
  }

  const items: MenuProps['items'] = [
    {
      label: 'Configuración de la cuenta',
      onClick: () => router.push('/account-settings'),
      key: '0',
    },
    {
      label: 'Mis Pedidos',
      key: '1',
      onClick: () => router.push('/my-orders')
    },
    {
      type: 'divider',
    },
    {
      label: 'Cerrar Sesion',
      key: '3',
      onClick: () => signOut()
    },
  ];

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const nav = document.getElementById('categories__container');
        const header = document.getElementsByTagName('header')[0];

        if (nav) {
          if (entry.isIntersecting) {
            header.style.opacity = '1'
            header.style.zIndex = '5'
            nav.style.boxShadow = 'none'
          } else {
            header.style.opacity = '0'
            header.style.zIndex = '3'
            nav.style.boxShadow = '0 2px 4px 0 rgba(80, 35, 20, 0.1)'
          }
        }
      });
    };

    const observerOptions = {
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observeSections = () => {
      const sections = document.querySelectorAll('section');
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

  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <nav className={styles.header__nav}>
          <div className={styles.header__nav_logo_container}>
            <Link href='/'>
              <img className={styles.header__nav_logo} src="/assets/logo-cuatro-carnes.svg" alt="Logo Cuatro Carnes" />
            </Link>
          </div>
          <div className={styles.header__nav_list}>
            <div className={styles.header__nav_links}>
              {/* <div className={styles.header__nav_item}>
                <Link href='/offers'>
                  Ofertas
                </Link>
              </div> */}
              <div className={styles.header__nav_item}>
                <Link href='/nosotros'>
                  Nosotros
                </Link>
              </div>
              {/* <div className={styles.header__nav_item}>
                Cupones
              </div> */}
              {session?.user.role === 'admin' && (
                <div className={styles.header__nav_item}>
                  <Link href='/dashboard'>
                    Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className={styles.header__nav_end}>
            {session === undefined && (
              <Skeleton.Button style={{ width: '120px' }} active={true} shape='round' />
            )}
            {session && (
              <div className={styles.header__session}>
                <div className={styles.header__session_user}>
                  <svg className={styles.header__button_icon} xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 24 24" fill='#A92B3C'>
                    <g>
                      <path d="M2,9.6c-0.2-1,0.8-1.8,1.6-1.3L7.3,10c0.5,0.3,1.2,0.1,1.5-0.5l2.1-3.7c0.5-0.8,1.6-0.8,2,0L15,9.6   c0.3,0.5,0.9,0.8,1.5,0.5l3.9-1.7C21.3,8,22.2,8.8,22,9.8l-1.7,8.1c-0.1,0.6-0.6,0.9-1.1,0.9H4.9c-0.5,0-1-0.4-1.1-0.9L2,9.6z" />
                    </g>
                  </svg>
                  {session.user?.name}
                </div>
                <Dropdown className={styles.header__dropdown} overlayClassName={styles.header__dropdown_menu} placement="bottomRight" menu={{ items }} trigger={['click']}>
                  <button aria-label="boton menu" className={styles.header__session_menu}>
                    <RxHamburgerMenu size={24} />
                  </button>
                </Dropdown>
              </div>
            )}
            {session === null && (
              <>
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
                {loading ? (
                  <button onClick={handleNavigate} aria-label="boton registrarse" className={styles.header__button_loading}>
                    <LoadingOutlined style={{
                      margin: '8px 36px',
                      fontSize: '24px',
                      color: 'white'
                    }} />
                  </button>
                )
                  : (
                    <button onClick={handleNavigate} aria-label="boton registrarse" className={styles.header__button_login}>
                      Registrarse
                    </button>
                  )
                }
              </>
            )}
            <button
              onClick={() => openDrawer()}
              aria-label="boton menu"
              className={styles.header__button_menu}
            >
              <RxHamburgerMenu size={24} />
            </button>
          </div>
        </nav>
      </div >
    </header >
  )
}
