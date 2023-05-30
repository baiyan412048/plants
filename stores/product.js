import { defineStore } from 'pinia'

// 單元設定
export const useProductSetting = defineStore('productSetting', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL, apiKey: API_KEY } = runtimeConfig.public

  // 取得單元設定
  const getProductSetting = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/setting`,
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

  return { getProductSetting }
})

// 產品分類
export const useProductCatalog = defineStore('productCatalog', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL, apiKey: API_KEY } = runtimeConfig.public

  const getProductCatalog = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/catalog`,
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
    getProductCatalog
  }
})

// 產品篩選
export const useProductFilter = defineStore('productFilter', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL, apiKey: API_KEY } = runtimeConfig.public

  // 取得產品尺寸
  const getProductSize = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/size`,
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

  // 取得產品難易度
  const getProductDiff = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/diff`,
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

  // 取得產品環境
  const getProductEnv = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/env`,
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
    getProductSize,
    getProductDiff,
    getProductEnv
  }
})

// 產品 outline
export const useProductOutline = defineStore('productOutline', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL, apiKey: API_KEY } = runtimeConfig.public

  const productIsInnerPage = ref(false)
  const productActiveCatalog = reactive({
    catalog: '所有植物',
    type: 'plants'
  })

  const getProductOutline = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product`,
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
    productIsInnerPage,
    productActiveCatalog,
    getProductOutline
  }
})

// 產品 detail
export const useProductDetail = defineStore('productDetail', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL, apiKey: API_KEY } = runtimeConfig.public

  const getProductDetail = async (catalog, title) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/${catalog}${title ? `/${title}` : ''}`,
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
    getProductDetail
  }
})
