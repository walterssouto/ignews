import { api } from '@/services/api'
import { getStripeJs } from '@/services/stripe-js'
import { useSession, signIn } from 'next-auth/react'
import styles from './styles.module.scss'

export function SubscribleButton() {
  const { data: session } = useSession()
  
  async function handleSubscrible() {
    if (!session) {
      signIn('github')
      return
    }

    try {
      const response = await api.post('/subscrible')

      const { sessionId } = response.data

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({ sessionId })
    } catch (err) {
      alert(err.message)
    }
  }
  return (
    <button
      type="button"
      className={styles.subscribleButton}
      onClick={handleSubscrible}
    >
      Subscrible now
    </button>
  )
}
