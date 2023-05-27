import { defineStore } from 'pinia'

export const usePayment = defineStore(
  'payment',
  () => {
    const runtimeConfig = useRuntimeConfig()
    const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

    const order = reactive({
      memberId: '',
      bill: {},
      shipping: {},
      price: {},
      products: [],
      purchase: []
    })

    const amount = ref(0)

    const resetOrderInfo = () => {
      order.memberId = ''
      order.bill = {}
      order.shipping = {}
      order.price = {}
      order.products = []
      order.purchase = []

      amount = 0
    }

    const postPaymentRequest = async (postData) => {
      // const { id } = postData
      try {
        const { data, pending, error, refresh } = await useFetch(
          `${API_BASE_URL}/api/payment/request`,
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

    const postPaymentConfirm = async (postData) => {
      try {
        const { data, pending, error, refresh } = await useFetch(
          `${API_BASE_URL}/api/payment/confirm`,
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

    return {
      order,
      amount,
      resetOrderInfo,
      postPaymentRequest,
      postPaymentConfirm
    }
  },
  {
    persist: true
  }
)
