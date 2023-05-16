import { defineStore } from 'pinia'

export const useToast = defineStore('toast', () => {
  const toastBag = reactive([])
  // {
  //   title: '已成功註冊',
  //   text: '登入會員',
  //   state: 'success',
  //   button: [
  //     {
  //       type: 'a',
  //       to: '/member/login',
  //       text: '會員登入'
  //     }
  //   ]
  // },

  const addToast = (item) => {
    item.id = Math.random().toString(36).substring(2, 5)
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
