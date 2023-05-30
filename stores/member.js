import { defineStore } from 'pinia'

export const useMember = defineStore('user', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL, apiKey: API_KEY } = runtimeConfig.public

  const loginState = useCookie('loginState')
  loginState.value = loginState.value || false

  const profile = useCookie('profile')
  profile.value = profile.value || {
    id: '',
    name: '',
    email: '',
    favorite: []
  }

  const getDetailProfile = async (id) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/member/${id}`,
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

  const putDetailProfile = async (postData) => {
    const { id } = postData
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/member/${id}`,
        {
          headers: {
            'x-api-key': API_KEY
          },
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

  const putMemberPassword = async (postData) => {
    const { id } = postData
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/member/${id}/password`,
        {
          headers: {
            'x-api-key': API_KEY
          },
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

  const addFavoriteProduct = async (postData) => {
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
        `${API_BASE_URL}/api/member/${id}/favorite`,
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

  const removeFavoriteProduct = async (postData) => {
    const { id } = postData
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/member/${id}/favorite`,
        {
          headers: {
            'x-api-key': API_KEY
          },
          method: 'DELETE',
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

  const toLogin = async (email, password) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/member/login`,
        {
          headers: {
            'x-api-key': API_KEY
          },
          method: 'POST',
          body: {
            email,
            password
          },
          pick: ['data']
        }
      )

      if (!error.value?.data) {
        const memberData = computed(() => data.value.data)

        // 切換登入狀態
        loginState.value = true
        // 更新會員資訊
        profile.value = {
          id: memberData.value._id,
          name: memberData.value.name,
          email: memberData.value.email,
          favorite: memberData.value.favorite
        }
      }

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  const toLogout = () => {
    loginState.value = false
    profile.value = {
      id: '',
      name: '',
      email: '',
      favorite: []
    }
  }

  return {
    loginState,
    profile,
    addFavoriteProduct,
    removeFavoriteProduct,
    toRegister,
    toLogin,
    toLogout,
    getDetailProfile,
    putDetailProfile,
    putMemberPassword
  }
})
