<script setup>
import { useProductDetail } from '@/stores/product'
import { useMember } from '@/stores/member'
import { useToast } from '@/stores/toast'
import { useCart } from '@/stores/cart'

import { Pagination, Autoplay, EffectFade } from 'swiper'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'

const modules = [Pagination, Autoplay, EffectFade]

// 產品 detail store
const productDetailStore = useProductDetail()
// 產品 detail method
const { getProductDetail } = productDetailStore

// 會員資料 store
const memberStore = useMember()

// 通知 store
const toastStore = useToast()
// 通知 method
const { addToast } = toastStore

// 購物車 store
const cartStore = useCart()
// 購物車 method
const { removeCartItem } = cartStore
// 增加數量
const plus = (item) => {
  if (item.count == item.stock) return
  item.count += 1
}
// 減少數量
const minus = (item) => {
  if (item.count == 1) return
  item.count -= 1
}
// 移除購物車商品
const onRemoveCartItem = (id) => {
  addToast({
    title: '成功移除商品',
    state: 'success'
  })
  removeCartItem(id)
}

// 頁面麵包屑
const breadcrumbs = reactive([
  {
    name: '首頁',
    href: '/'
  },
  {
    name: '購物車'
  }
])

useHead({
  title: '購物車 | 蒔栽',
  bodyAttrs: {
    class: 'cart'
  }
})

// 其他產品
const otherDetail = reactive([])

onMounted(async () => {
  // 購物車內所有分類
  const allCatalog = []

  // 產品 detail
  const { data: detail } = await getProductDetail(params.catalog)

  // 抓取除了自己以外的產品
  const target = allDetail.value.data.filter(
    (obj) => obj.outline.title !== params.title
  )

  const n = target.length

  // 只有一則，則直接回傳
  if (n == 1) return target
  // 沒有其他產品，則回傳空陣列
  if (n == 0) return []

  const [num1, num2] = useGetRandomNumbers(n, 2)

  otherDetail.push(target[num1], target[num2])
})
</script>

<template>
  <div class="main-wrapper">
    <div class="cart-wrapper">
      <div class="outline">
        <CommonBreadcrumbs :breadcrumbs="breadcrumbs" />
      </div>
      <div class="discount">
        <div class="tip">
          <p>優惠資訊</p>
          <div class="disable">
            <span>今日不要再顯示</span>
            <Icon name="mdi:close" />
          </div>
        </div>
        <Swiper
          :modules="modules"
          :autoplay="{
            delay: 2500,
            disableOnInteraction: false
          }"
          :speed="800"
          :effect="'fade'"
          :fade-effect="{
            crossFade: true
          }"
        >
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1682241229580-e72acdf0eb6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1681767892373-f1af9a264226?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1682240429814-c6a38c31d93c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <BaseNoResult v-if="!cartStore.cartList.length">
        <p>購物車內無新增商品</p>
      </BaseNoResult>
      <div v-else class="info">
        <div class="info-list">
          <ul>
            <li v-for="(item, key) in cartStore.cartList" :key="key">
              <CartItem
                :item="item"
                @plus="plus"
                @minus="minus"
                @remove-item="onRemoveCartItem"
              />
            </li>
          </ul>
        </div>
        <div class="info-aside">
          <div class="block">
            <p>
              <span>小計</span>
              <span>NT ${{ cartStore.subtotalPrice.toLocaleString() }}</span>
            </p>
            <p>
              <span>預估運費</span>
              <span>NT ${{ cartStore.fee.toLocaleString() }}</span>
            </p>
          </div>
          <div class="block">
            <p>
              <span>總計</span>
              <span>NT ${{ cartStore.totalPrice.toLocaleString() }}</span>
            </p>
          </div>
          <div class="block button-group">
            <BaseButton
              v-if="!memberStore.loginState"
              :to="'/member/login'"
              :text="'會員登入'"
            />
            <BaseButton :to="'/checkout'" :text="'前往結帳'" />
          </div>
        </div>
      </div>
      <div v-if="cartStore.cartList.length" class="may-like">
        <p>也許你會喜歡</p>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.cart-wrapper
  padding: 120px 0 100px
  margin: 0 auto
  max-width: 1280px
  &::before
    position: absolute
    top: 0
    left: 0
    z-index: -1
    display: block
    background-image: linear-gradient(rgba($green_fluorescent, .2), rgba($green_fluorescent, 0))
    width: 100%
    height: 600px
    pointer-events: none
    content: ''
  .outline
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    padding-top: 130px
    text-align: center
  .discount
    margin: 100px auto
    max-width: 1000px
    width: 100%
    .tip
      display: flex
      align-items: center
      justify-content: space-between
      &>p
        font-size: px(20)
        font-weight: 700
        letter-spacing: .8px
        line-height: 1.2
    .disable
      padding: 5px 14px
      display: flex
      align-items: center
      gap: 10px
      border-radius: 500px
      background-color: $yellow
      font-size: px(12)
      font-weight: 700
      line-height: 1.2
      cursor: pointer
      svg
        width: 20px
        height: 20px
    .swiper
      margin-top: 10px
    .swiper-slide
      position: relative
      aspect-ratio: 3/2
      img
        position: absolute
        top: 0
        left: 0
        border-radius: 8px
        width: 100%
        height: 100%
        object-fit: cover
  .info
    margin: 100px auto 0
    display: flex
    gap: 30px
    max-width: 1280px
    width: 100%
  .info-list
    flex: 1
    width: 100%
    li
      &:not(:last-child)
        border-bottom: 1px solid $green_fluorescent
  .info-aside
    padding: 20px
    align-self: flex-start
    position: sticky
    top: 160px
    flex-shrink: 0
    border: 1px solid $green_fluorescent
    border-radius: 8px
    max-width: 400px
    width: 100%
    .block
      padding: 20px 10px
      &:not(:last-child)
        border-bottom: 1px solid $green_fluorescent
    p
      display: flex
      align-items: center
      justify-content: space-between
      font-size: px(18)
      line-height: 1.2
      letter-spacing: .8px
      &:not(:last-child)
        margin-bottom: 20px
  .button-group
    display: flex
    align-items: center
    gap: 20px
  .may-like
    margin: 100px auto 0
    max-width: 1280px
    width: 100%
    font-size: px(24)
    line-height: 1.2
    letter-spacing: .8px
</style>
