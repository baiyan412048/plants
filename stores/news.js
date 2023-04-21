import { defineStore } from 'pinia'

// 單元設定
export const useNewsSetting = defineStore('newsSetting', () => {
  // const runtimeConfig = useRuntimeConfig()
  // const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  // 取得單元設定
  const getNewsSetting = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        'http://localhost:3000/api/news/setting',
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
  const getNewsCatalog = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        'http://localhost:3000/api/news/catalogs',
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
  const newsIsInnerPage = ref(false)

  const newsActiveCatalog = ref('全部類別')

  const getNewsOutline = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        'http://localhost:3000/api/news',
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
  const getNewsDetail = async (catalog, title) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `http://localhost:3000/api/news/${catalog}${title ? `/${title}` : ''}`,
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
