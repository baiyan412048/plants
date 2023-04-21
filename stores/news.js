import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

export const useNewsListStore = defineStore('newsListStore', () => {
  const newsActiveCatalog = ref('全部類別')

  const newsOutlines = reactive([])

  const getNewsOutlineData = async () => {
    try {
      const { data } = await useFetch(
        'http://localhost:3000/api/article'
      ).json()

      newsOutlines.splice(0, newsOutlines.length, ...data.value.data)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    newsActiveCatalog,
    newsOutlines,
    getNewsOutlineData
  }
})
