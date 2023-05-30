import { defineStore } from 'pinia'

// 單元設定
export const useFAQSetting = defineStore('faqSetting', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL, apiKey: API_KEY } = runtimeConfig.public

  // 取得單元設定
  const getFAQSetting = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/faq/setting`,
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

  return { getFAQSetting }
})

// 常見問題分類
export const useFAQCatalog = defineStore('faqCatalog', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL, apiKey: API_KEY } = runtimeConfig.public

  const getFAQCatalog = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/faq/catalog`,
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
    getFAQCatalog
  }
})

// 常見問題 detail
export const useFAQDetail = defineStore('faqDetail', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL, apiKey: API_KEY } = runtimeConfig.public

  const faqActiveCatalog = ref('全部類別')

  const getFAQDetail = async (catalog, title) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/faq/${catalog ? `/${catalog}` : ''}${
          title ? `/${title}` : ''
        }`,
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
    faqActiveCatalog,
    getFAQDetail
  }
})
