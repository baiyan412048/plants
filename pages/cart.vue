<script setup>
import { useProductOutline } from '@/stores/product'
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

// 會員資料 store
const memberStore = useMember()

// 通知 store
const toastStore = useToast()
// 通知 method
const { addToast } = toastStore

// 購物車 store
const cartStore = useCart()
// 購物車 method
const { removeCartItem, removeCartPurchaseItem } = cartStore
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
  removeCartItem(id)
  addToast({
    title: '成功移除商品',
    state: 'success'
  })
}

// 移除購物車加購品
const onRemovePurchase = (productId, purchaseId) => {
  removeCartPurchaseItem(productId, purchaseId)
  addToast({
    title: '成功移除加購品',
    state: 'success'
  })
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

// 產品 detail store
const productOutlineStore = useProductOutline()
// 產品 detail method
const { getProductOutline } = productOutlineStore

// 產品 detail
const { data: product } = await getProductOutline()

onMounted(() => {
  // 購物車內所有分類
  const allCatalog = [...cartStore.cartList.map((obj) => obj.catalog)]
  const allDetail = computed(() => product.value.data)

  // 抓取除了自己以外的產品
  const target = allDetail.value.filter((obj) =>
    allCatalog.includes(obj.catalog.catalog)
  )

  otherDetail.push(...target)
})
</script>

<template>
  <div class="main-wrapper">
    <div class="cart-wrapper">
      <div class="outline">
        <CommonBreadcrumbs :breadcrumbs="breadcrumbs" />
      </div>
      <ClientOnly>
        <template #fallback>
          <BaseLoadingBlock />
        </template>
        <BaseNoResult v-if="!cartStore.cartList.length">
          <p>購物車內無新增商品</p>
        </BaseNoResult>
        <template v-else>
          <div class="info">
            <div class="info-list">
              <ul>
                <li v-for="(item, key) in cartStore.cartList" :key="key">
                  <CartItem
                    :item="item"
                    @plus="plus"
                    @minus="minus"
                    @remove-item="onRemoveCartItem"
                    @remove-purchase="onRemovePurchase"
                  />
                </li>
              </ul>
            </div>
            <div class="info-aside">
              <div class="block">
                <p>
                  <span>小計</span>
                  <span
                    >NT ${{ cartStore.subtotalPrice.toLocaleString() }}</span
                  >
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
          <div class="may-like">
            <p class="tip">也許你會喜歡</p>
            <Swiper
              :slides-per-view="1"
              :space-between="50"
              :breakpoints="{
                768: {
                  slidesPerView: 3
                },
                1024: {
                  slidesPerView: 4
                }
              }"
              :modules="modules"
              :autoplay="{
                delay: 2500,
                disableOnInteraction: false
              }"
              :speed="800"
            >
              <SwiperSlide v-for="(item, key) in otherDetail" :key="key">
                <ProductCard :index="key" :product="item" />
              </SwiperSlide>
            </Swiper>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.cart-wrapper
  padding: 120px 60px 100px
  margin: 0 auto
  max-width: calc(1280px + 60px * 2)
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
    padding-top: 130px
    margin-bottom: 100px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
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
    margin: 0 auto
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
    .tip
      margin-bottom: 20px
      font-size: px(24)
      line-height: 1.2
      letter-spacing: .8px
  +rwdmax(1024)
    padding: 120px 40px 100px
  +rwdmax(992)
    .info
      flex-direction: column
    .info-aside
      position: static
      max-width: 100%
  +rwdmax(767)
    padding: 80px 20px 60px
    .outline
      padding-top: 60px
      margin-bottom: 20px
    .may-like
      margin: 60px auto 0
      max-width: 300px
      .tip
        text-align: center
</style>
