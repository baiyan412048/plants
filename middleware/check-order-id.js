import { useMember } from '@/stores/member'
import { useToast } from '@/stores/toast'

export default defineNuxtRouteMiddleware(() => {
  const route = useRoute()
  const { query } = route
  if (!query.orderId) {
    return navigateTo('/product')
  }
})
