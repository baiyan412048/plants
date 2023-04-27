import { defineStore } from 'pinia'

// 單元設定
export const useNewsSetting = defineStore('newsSetting', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  // 取得單元設定
  const getNewsSetting = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/news/setting`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  return { getNewsSetting }
})

// 最新消息分類
export const useNewsCatalog = defineStore('newsCatalog', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  const getNewsCatalog = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/news/catalog`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getNewsCatalog
  }
})

// 最新消息 outline
export const useNewsOutline = defineStore('newsOutline', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  const newsIsInnerPage = ref(false)
  const newsActiveCatalog = ref('全部類別')

  const getNewsOutline = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/news`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    newsIsInnerPage,
    newsActiveCatalog,
    getNewsOutline
  }
})

// 最新消息 detail
export const useNewsDetail = defineStore('newsDetail', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  const getNewsDetail = async (catalog, title) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/news/${catalog}${title ? `/${title}` : ''}`,
        {
          pick: ['data']
        }
      )

      return { data, pending, error, refresh }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getNewsDetail
  }
})
