import { GetServerSideProps } from 'next';

import { Layout } from '@/components/Layout';
import styles from './styles.module.scss'
import Link from 'next/link';

const OffersPage = () => {
  return (
    <Layout title='Ofertas - Cuatro carnes'>
      <div className={styles.offers}>
        <div className={styles.offers__container}>
          <h1 className={styles.offers__title}>Ofertas</h1>
          <Link href={`/offers/${1}`}>
            <div className={styles.offers__list}>
              {
                [
                  'https://s3-sa-east-1.amazonaws.com/api-lac.production/images/news_images/2022-11-30/44f849b5953a006d95865d51c44605ba.jpeg',
                  'https://s3-sa-east-1.amazonaws.com/api-lac.production/images/news_images/2022-05-16/b1473684726a9bbe6f840bc50a14ec3d.jpeg',
                  'https://s3-sa-east-1.amazonaws.com/api-lac.production/images/news_images/2022-04-11/e380e6cf7354b95d4ae2f3b0062bf488.jpeg',
                  'https://s3-sa-east-1.amazonaws.com/api-lac.production/images/news_images/2022-02-25/f9a54189102d128a6c9c105773647c59.jpeg',
                  'https://s3-sa-east-1.amazonaws.com/api-lac.production/images/news_images/2021-09-13/6be64c9a459aa305bff85169be97fc6b.jpeg',
                  'https://s3-sa-east-1.amazonaws.com/api-lac.production/images/news_images/2021-06-29/21921aa9faf59dfc58193585b06d2420.jpeg'
                ]
                  .map((url) => (
                    <div className={styles.offers__list_item}>
                      <div className={styles.offers__list_item_image} style={{
                        backgroundImage: `url(${url})`
                      }} />
                      <div className={styles.offers__list_item_title}>
                        Llegó la provo que todos querían.
                      </div>
                    </div>
                  ))}
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  }
}

export default OffersPage;