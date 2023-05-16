import { defineStore } from 'pinia'

export const useOrder = defineStore('order', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  const getMemberOrder = async (id) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/order/${id ? id : ''}`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  return { getMemberOrder }
})
