import { defineStore } from 'pinia'

// 單元設定
export const useProductSetting = defineStore('productSetting', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  // 取得單元設定
  const getProductSetting = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/setting`,
        {
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
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  const getProductCatalog = async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/catalogs`,
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
    getProductCatalog
  }
})

// 產品 outline
export const useProductOutline = defineStore('productOutline', () => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

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
  const { apiBaseUrl: API_BASE_URL } = runtimeConfig.public

  const getProductDetail = async (catalog, title) => {
    try {
      const { data, pending, error, refresh } = await useFetch(
        `${API_BASE_URL}/api/product/${catalog}${title ? `/${title}` : ''}`,
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
    getProductDetail
  }
})
