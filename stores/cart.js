import { defineStore } from 'pinia'

export const useCart = defineStore(
  'cart',
  () => {
    // 購物車列表
    const cartList = reactive([])
    // 小計
    const subtotalPrice = computed(() => {
      const cartPriceGroup = cartList.map(
        (obj) => parseInt(obj.total) * obj.count
      )
      return cartPriceGroup.length
        ? cartPriceGroup.reduce(
            (accumulator, currentValue) => accumulator + currentValue
          )
        : 0
    })
    // 運費
    const fee = computed(() => {
      return 100
    })
    // 總計
    const totalPrice = computed(() => {
      return subtotalPrice.value + fee.value
    })

    // 加入購物車
    const addCartItem = (item) => {
      // 若有重複產品則為更新購物車
      if (cartList.findIndex((obj) => obj.id == item.id) >= 0) {
        cartList.splice(
          cartList.findIndex((obj) => obj.id == item.id),
          1,
          item
        )
        return
      }
      cartList.push({
        ...item
      })
    }

    // 移除購物車
    const removeCartItem = (id) => {
      cartList.splice(
        cartList.findIndex((obj) => obj.id == id),
        1
      )
    }

    return {
      cartList,
      subtotalPrice,
      fee,
      totalPrice,
      addCartItem,
      removeCartItem
    }
  },
  {
    persist: true
  }
)
