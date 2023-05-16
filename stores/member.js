import { defineStore } from 'pinia'

export const useMember = defineStore('user', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  const loginState = ref(false)
  const profile = reactive({
    id: '',
    name: '',
    email: ''
  })

  const getDetailProfile = async (id) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/member/${id}`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  const putDetailProfile = async (postData) => {
    const { id } = postData
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/member/${id}`,
        {
          method: 'PUT',
          body: postData,
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  const addFavoriteProduct = async () => {
    if (profile.id == '') {
      return {
        error: ref({
          data: '尚未登入會員'
        })
      }
    }

    const { id } = postData
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/member/${id}`,
        {
          method: 'PUT',
          body: postData,
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  const toRegister = async (postData) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/member`,
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

  const toLogin = async (email, password) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/member/login`,
        {
          method: 'POST',
          body: {
            email,
            password
          },
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  const toLogout = () => {
    loginState.value = false
    profile.id = ''
    profile.name = ''
    profile.email = ''
  }

  return {
    loginState,
    profile,
    addFavoriteProduct,
    toRegister,
    toLogin,
    toLogout,
    getDetailProfile,
    putDetailProfile
  }
})
