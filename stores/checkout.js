import { defineStore } from 'pinia'

export const useCheckout = defineStore('checkout', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  const toCheckout = async (postData) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/order/`,
        {
          method: 'POST',
          body: postData,
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  return { toCheckout }
})
