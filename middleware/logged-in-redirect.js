export default defineNuxtRouteMiddleware((to, from) => {
  const redirectTo = useState('redirectTo')

  if (from && to.path !== from.path && !redirectTo.value) {
    redirectTo.value = null
    if (from.query.redirect_to) {
      redirectTo.value = from.query.redirect_to
      from.query.redirect_to = undefined
    } else {
      redirectTo.value = from.fullPath
    }

    return navigateTo(to)
  }
})
