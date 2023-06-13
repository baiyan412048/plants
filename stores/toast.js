import { defineStore } from 'pinia'

export const useToast = defineStore('toast', () => {
  const toastBag = reactive([])

  const addToast = (item) => {
    item.id = Math.random().toString(36).substring(2, 9)
    toastBag.push(item)

    // 3秒後移除通知
    const timeout = setTimeout(() => {
      removeToast(item.id)
      clearTimeout(timeout)
    }, 3000)
  }

  const removeToast = (id) => {
    toastBag.splice(
      toastBag.findIndex((obj) => obj.id == id),
      1
    )
  }

  return {
    toastBag,
    addToast,
    removeToast
  }
})
