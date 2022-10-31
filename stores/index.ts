import { defineStore } from 'pinia'

export const useStore = defineStore('body', () => {
  const className = ref('test')

  return {
    className
  }
})
