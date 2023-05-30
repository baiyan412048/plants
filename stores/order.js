import { defineStore } from 'pinia'

export const useOrder = defineStore('order', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL, apiKey: API_KEY } = runtimeConfig.public

  const getMemberOrder = async (id) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/order${id ? `/${id}` : ''}`,
        {
          headers: {
            'x-api-key': API_KEY
          },
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  const postMemberOrder = async (postData) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/order/`,
        {
          headers: {
            'x-api-key': API_KEY
          },
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

  return { getMemberOrder, postMemberOrder }
})
