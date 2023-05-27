import { usePayment } from '@/stores/payment'
import { useToast } from '@/stores/toast'

export default defineNuxtRouteMiddleware((to, from) => {
  // 付款 store
  const paymentStore = usePayment()
  // 訂單 method
  const { postPaymentRequest } = paymentStore

  // 通知 store
  const toastStore = useToast()
  // 通知 method
  const { addToast } = toastStore

  if (!memberStore.profile?.id) {
    addToast({
      title: '尚未登入會員',
      state: 'notice'
    })
    return navigateTo('/member/login')
  }
})
