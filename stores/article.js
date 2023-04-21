import { defineStore } from 'pinia'

// 單元設定
export const useArticleSetting = defineStore('articleSetting', () => {
  // const runtimeConfig = useRuntimeConfig()
  // const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  // 取得單元設定
  const getArticleSetting = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        'http://localhost:3000/api/article/setting',
        {
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
  const getArticleCatalog = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        'http://localhost:3000/api/article/catalogs',
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
    getArticleCatalog
  }
})

// 文章 outline
export const useArticleOutline = defineStore('articleOutline', () => {
  const articleIsInnerPage = ref(false)

  const articleActiveCatalog = ref('全部類別')

  const getArticleOutline = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        'http://localhost:3000/api/article',
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
    articleIsInnerPage,
    articleActiveCatalog,
    getArticleOutline
  }
})

// 文章 detail
export const useArticleDetail = defineStore('articleDetail', () => {
  const getArticleDetail = async (catalog, title) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `http://localhost:3000/api/article/${catalog}${
          title ? `/${title}` : ''
        }`,
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
    getArticleDetail
  }
})