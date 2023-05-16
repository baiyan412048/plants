import { useMember } from '@/stores/member'

export default defineNuxtRouteMiddleware(() => {
  const memberStore = useMember()
  if (!memberStore.profile?.id) {
    return navigateTo('/member/login')
  }
})
