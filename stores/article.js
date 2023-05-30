import { defineStore } from 'pinia'

// 單元設定
export const useArticleSetting = defineStore('articleSetting', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL, apiKey: API_KEY } = runtimeConfig.public

  // 取得單元設定
  const getArticleSetting = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/setting`,
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

  return { getArticleSetting }
})

// 文章分類
export const useArticleCatalog = defineStore('articleCatalog', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL, apiKey: API_KEY } = runtimeConfig.public

  const getArticleCatalog = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/catalog`,
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

  return {
    getArticleCatalog
  }
})

// 文章 outline
export const useArticleOutline = defineStore('articleOutline', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL, apiKey: API_KEY } = runtimeConfig.public

  const articleActiveCatalog = ref('全部類別')

  const getArticleOutline = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article`,
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

  return {
    articleActiveCatalog,
    getArticleOutline
  }
})

// 文章 detail
export const useArticleDetail = defineStore('articleDetail', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL, apiKey: API_KEY } = runtimeConfig.public

  const getArticleDetail = async (catalog, title) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/article/${catalog}${title ? `/${title}` : ''}`,
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

  return {
    getArticleDetail
  }
})
