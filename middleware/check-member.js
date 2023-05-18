import { useMember } from '@/stores/member'
import { useToast } from '@/stores/toast'

export default defineNuxtRouteMiddleware(() => {
  // 會員 store
  const memberStore = useMember()
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
