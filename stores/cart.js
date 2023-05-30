import { defineStore } from 'pinia'

export const useCart = defineStore('cart', () => {
  // 購物車列表
  const cartListCookie = useCookie('cartList')
  cartListCookie.value = cartListCookie.value || []
  const cartList = reactive(cartListCookie.value)
  // 小計
  const subtotalPrice = computed(() => {
    const cartPriceGroup = cartList.map((obj) => parseInt(obj.total))
    return cartPriceGroup.length
      ? cartPriceGroup.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        )
      : 0
  })
  // 運費
  const fee = computed(() => {
    return 0
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
      // 更新 cookie
      cartListCookie.value = toRaw(cartList)
      return
    }
    cartList.push({
      ...item
    })
    // 更新 cookie
    cartListCookie.value = toRaw(cartList)
  }

  // 移除購物車
  const removeCartItem = (id) => {
    cartList.splice(
      cartList.findIndex((obj) => obj.id == id),
      1
    )
    // 更新 cookie
    cartListCookie.value = toRaw(cartList)
  }

  // 移除購物車加購品
  const removeCartPurchaseItem = (productId, purchaseId) => {
    cartList.forEach((obj) => {
      if (obj.id == productId) {
        obj.purchase.splice(
          obj.purchase.findIndex((item) => {
            if (item._id == purchaseId) {
              item.selected = false
              return item
            }
          }),
          1
        )
      }
    })
    // 更新 cookie
    cartListCookie.value = toRaw(cartList)
  }

  // 清空購物車
  const resetCartList = () => {
    cartList.splice(0, cartList.length)
    // 更新 cookie
    cartListCookie.value = toRaw(cartList)
  }

  return {
    cartList,
    subtotalPrice,
    fee,
    totalPrice,
    addCartItem,
    removeCartItem,
    removeCartPurchaseItem,
    resetCartList
  }
})
