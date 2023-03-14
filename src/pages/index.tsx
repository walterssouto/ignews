import {GetStaticProps} from 'next'

import { SubscribleButton } from '@/components/SubscribleButton'
import Head from 'next/head'
import styles from './home.module.scss'
import {stripe} from '../services/stripe'

interface HomeProps {
  product: {
    price_id: string;
    amount: number
  }
}
export default function Home({ product }:HomeProps ) {
  return (
    <>
      <Head><title>Início | ig.news</title></Head>
      <main className={styles.contentConteiner}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>Get access to all the publications <br /> 
            <span>for {product.amount} mounth</span>
          </p>
          <SubscribleButton priceId={product.price_id} />
        </section>

        <img src="./images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps:GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1MX9HqJMa7uojigzsf6t999d')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  }
  
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }

}