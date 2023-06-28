import { defineStore } from 'pinia'

export const usePayment = defineStore('payment', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL, apiKey: API_KEY } = runtimeConfig.public

  // 購物車列表
  // const orderCookie = useCookie('order')
  // orderCookie.value = orderCookie.value || {}
  // const order = reactive(orderCookie.value)
  const order = reactive({})

  const amount = useCookie('amount')
  amount.value = amount.value || 0

  const resetOrderInfo = () => {
    order.memberId = ''
    order.bill = {}
    order.shipping = {}
    order.price = {}
    order.products = []
    order.purchase = []

    amount.value = 0
  }

  const updateOrderInfo = ({
    memberId,
    bill,
    shipping,
    price,
    products,
    purchase
  }) => {
    order.memberId = memberId
    order.bill = bill
    order.shipping = shipping
    order.price = price
    order.products = products
    order.purchase = purchase

    // 更新 cookie
    // orderCookie.value = toRaw(order)
  }

  const postPaymentRequest = async (postData) => {
    // const { id } = postData
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/payment/request`,
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

  const postPaymentConfirm = async (postData) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/payment/confirm`,
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

  return {
    order,
    amount,
    resetOrderInfo,
    updateOrderInfo,
    postPaymentRequest,
    postPaymentConfirm
  }
})
