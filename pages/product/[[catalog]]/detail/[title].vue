<script setup>
import { useProductSetting, useProductDetail } from '@/stores/product'
import { useCart } from '@/stores/cart'
import { useToast } from '@/stores/toast'

import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

const modules = [Navigation, Pagination, Autoplay, EffectFade]

const route = useRoute()
const { params } = route

// 購物車 store
const cartStore = useCart()
// 購物車 method
const { addCartItem } = cartStore

// 通知 store
const toastStore = useToast()
// 通知 method
const { addToast } = toastStore

// 單元設定 store
const productSettingStore = useProductSetting()
// 單元設定 method
const { getProductSetting } = productSettingStore

// 產品 detail store
const productDetailStore = useProductDetail()
// 產品 detail method
const { getProductDetail } = productDetailStore

// get data
const [{ data: setting }, { data: detail }] = await Promise.all([
  getProductSetting(),
  getProductDetail(params.catalog, params.title)
])

// 產品 detail data
const productDetail = computed(() => detail.value.data)
// 已存在購物車
const isExist = cartStore.cartList?.find(
  (obj) => obj.id == productDetail.value._id
)
// 產品簡介
const outline = reactive(productDetail.value.outline)
// 產品圖片輪播
const slides = reactive(
  productDetail.value?.slides && [...productDetail.value?.slides]
)
// 產品描述
const dep = ref(productDetail.value?.dep ?? '')
// 庫存
const stock = ref(outline.stock)
// 購物須知
const notes = ref(productDetail.value?.notes ?? '')
// 加購商品
const purchase = reactive(
  productDetail.value?.purchase && [...productDetail.value.purchase]
)
purchase?.forEach((obj) => {
  // 設定選項
  // 需顯示原購物車已選擇加購商品
  const target = isExist?.purchase
  if (target && target.some((item) => item._id == obj._id)) {
    obj.selected = true
    return
  }
  obj.selected = false
})
// 選取加購商品
const togglePurchase = (item) => (item.selected = !item.selected)
// 產品介紹
const content = computed(() => productDetail.value?.contents ?? [])
// 包裝服務
const packageService = computed(() => productDetail.value?.package ?? [])
// 照護方式
const care = computed(() => productDetail.value?.care ?? [])

// 相同分類所有產品 detail
const { data: allDetail } = await getProductDetail(params.catalog)

// 頁面麵包屑
const breadcrumbs = reactive([
  {
    name: '首頁',
    href: '/'
  },
  {
    name: setting.value.data[0].name,
    href: '/product'
  },
  {
    name: params.catalog,
    href: `/product/${params.catalog}`
  },
  {
    name: params.title
  }
])

// 購物車修改數量
const countTemp = ref(isExist?.count ?? 1)
// 增加數量
const plus = () => {
  if (countTemp.value == stock.value) return
  countTemp.value += 1
}
// 減少數量
const minus = () => {
  if (countTemp.value == 1) return
  countTemp.value -= 1
}

// 總計
const totalPrice = computed(() => {
  const price = parseInt(outline.price) * countTemp.value
  const purchasePriceGroup = purchase
    ?.filter((obj) => obj.selected)
    .map((obj) => obj.price)
  const purchasePrice =
    purchasePriceGroup && purchasePriceGroup.length
      ? purchasePriceGroup.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        )
      : 0
  return price + purchasePrice
})

// 加入購物車
const addToCart = () => {
  const { title, image, catalog, stock, price } = outline
  addCartItem({
    id: productDetail.value._id,
    title,
    image,
    stock,
    catalog: catalog.catalog,
    count: countTemp.value,
    price,
    total: totalPrice.value,
    purchase: purchase.filter((obj) => obj.selected)
  })
  // 訊息通知
  addToast({
    title: '成功加入購物車',
    state: 'success',
    button: [
      {
        type: 'a',
        to: '/checkout',
        text: '馬上結帳'
      }
    ]
  })
}

useHead({
  title: `${params.title} | 蒔栽`,
  bodyAttrs: {
    class: 'product'
  }
})

// 其他產品
const otherDetail = reactive([])

onMounted(() => {
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
    <div class="product-wrapper">
      <div class="product-detail">
        <div class="outline">
          <CommonBreadcrumbs :breadcrumbs="breadcrumbs" />
          <div class="outline-detail">
            <div class="outline-aside">
              <div class="tag">{{ params.catalog }}</div>
              <h1 class="title">{{ params.title }}</h1>
              <p class="dep">{{ dep }}</p>
              <div class="price">
                <p class="delete">
                  NT ${{ outline.originalPrice.toLocaleString() }}
                </p>
                <p>NT ${{ outline.price.toLocaleString() }}</p>
              </div>
              <div class="collapse">
                <CommonCollapse
                  v-if="notes !== ''"
                  :open="true"
                  :name="'購物須知'"
                >
                  <template #target>
                    <p>
                      {{ notes }}
                    </p>
                  </template>
                </CommonCollapse>
                <CommonCollapse
                  v-if="purchase && purchase.length"
                  :open="true"
                  :name="'加購商品'"
                >
                  <template #target>
                    <ProductPurchase
                      v-for="(item, key) in purchase"
                      :key="key"
                      :purchase="item"
                      @toggle-purchase="togglePurchase(item)"
                    />
                  </template>
                </CommonCollapse>
              </div>
              <div class="detail">
                <p class="detail-price">
                  總計 :
                  <span>NT ${{ totalPrice.toLocaleString() }}</span>
                </p>
                <div class="detail-other">
                  <CommonProductCount
                    :value="countTemp"
                    :stock="stock"
                    @plus="plus"
                    @minus="minus"
                  />
                  <BaseButton
                    :type="'button'"
                    :text="isExist ? '更新購物車' : '加入購物車'"
                    @to-click="addToCart"
                  />
                </div>
              </div>
            </div>
            <div v-if="slides && slides.length" class="swiper-group">
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
                :navigation="
                  slides.length
                    ? {
                        nextEl: '.swiper-control .next',
                        prevEl: '.swiper-control .prev'
                      }
                    : false
                "
                :pagination="
                  slides.length
                    ? {
                        el: '.swiper-control .pagination',
                        type: 'fraction'
                      }
                    : false
                "
                :loop="true"
              >
                <SwiperSlide v-for="(src, key) in slides" :key="key">
                  <nuxt-img :src="src" loading="lazy" />
                </SwiperSlide>
              </Swiper>
              <div class="swiper-control">
                <div class="navigation prev">Prev</div>
                <div class="pagination"></div>
                <div class="navigation next">Next</div>
              </div>
            </div>
          </div>
        </div>
        <div class="info">
          <div v-if="content.length" class="info-content">
            <div
              v-for="(paragraph, key) in content"
              :key="key"
              class="paragraph"
            >
              <div
                v-if="paragraph.images.length"
                class="images"
                :class="`-${paragraph.style}`"
              >
                <nuxt-img
                  v-for="(src, index) in paragraph.images"
                  :key="index"
                  :src="src"
                  loading="lazy"
                />
              </div>
              <div class="text">{{ paragraph.content }}</div>
            </div>
          </div>
          <div v-if="packageService.length" class="info-package">
            <div
              v-for="(paragraph, key) in packageService"
              :key="key"
              class="paragraph"
            >
              <div
                v-if="paragraph.images.length"
                class="images"
                :class="`-${paragraph.style}`"
              >
                <nuxt-img
                  v-for="(src, index) in paragraph.images"
                  :key="index"
                  :src="src"
                  loading="lazy"
                />
              </div>
              <div class="text">{{ paragraph.content }}</div>
            </div>
          </div>
          <div v-if="care.length" class="info-care">
            <div v-for="(paragraph, key) in care" :key="key" class="paragraph">
              <div
                v-if="paragraph.images.length"
                class="images"
                :class="`-${paragraph.style}`"
              >
                <nuxt-img
                  v-for="(src, index) in paragraph.images"
                  :key="index"
                  :src="src"
                  loading="lazy"
                />
              </div>
              <div class="text">{{ paragraph.content }}</div>
            </div>
          </div>
        </div>
        <CommonShareGroup />
        <div v-if="otherDetail.length" class="other-group">
          <CommonOtherDetail
            v-for="(item, key) in otherDetail"
            :key="key"
            :item="item.outline"
            :href="`/product/${item.outline.catalog.catalog}/detail/${item.outline.title}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.product-wrapper
  padding: 120px 0 100px
  position: relative
  z-index: 0
  &::before
    position: absolute
    top: 0
    left: 0
    z-index: -1
    display: block
    background-image: linear-gradient(rgba($green, .2), rgba($green, 0))
    width: 100%
    height: 600px
    pointer-events: none
    content: ''
  +rwdmax(767)
    padding: 80px 0 60px

.product-detail
  padding: 0 120px
  .outline
    margin: 0 auto
    padding-top: 75px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    max-width: 1400px
    width: 100%
    text-align: center
  +rwdmax(1024)
    padding: 0 80px
  +rwdmax(767)
    padding: 0 40px
    .outline
      padding-top: 0px

.outline-detail
  padding-top: 130px
  display: flex
  align-items: flex-start
  justify-content: space-between
  gap: clamp(80px, 5.2083vw, 100px)
  width: 100%
  +rwdmax(1024)
    gap: 60px
  +rwdmax(992)
    flex-direction: column-reverse
  +rwdmax(767)
    padding-top: 80px

.outline-aside
  max-width: 500px
  width: 35.7143%
  text-align: left
  .tag
    margin-bottom: 10px
    padding: 6px 20px
    display: inline-block
    border-radius: 50px
    background-color: $green
    color: #fff
    font-size: px(14)
    line-height: 1.2
  .title
    font-size: px(48)
    line-height: 1.2
  .dep
    margin-top: 30px
    font-size: px(16)
    line-height: 1.6
  .price
    margin-top: 20px
    display: flex
    align-items: flex-end
    gap: 10px
    font-size: px(20)
    line-height: 1.2
    .delete
      color: $gray
      font-size: px(14)
      text-decoration: line-through
  .collapse
    margin-top: 20px
    max-width: 400px
    width: 100%
  .collapse-target
    p
      padding: 0 10px
      line-height: 1.6
  .detail
    margin-top: 40px
  .detail-price
    display: flex
    align-items: flex-end
    gap: 20px
    line-height: 1.2
    span
      font-size: px(24)
      font-weight: 700
  .detail-other
    margin-top: 20px
    display: flex
    align-items: center
    gap: 30px
  +rwdmax(992)
    max-width: 100%
    width: 100%
  +rwdmax(767)
    .title
      font-size: px(38)


.swiper-group
  position: sticky
  top: 160px
  width: 57.1429%
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
  .swiper-control
    padding: 20px
    display: flex
    align-items: center
    justify-content: center
    gap: 20px
    font-size: px(18)
    font-weight: 700
  .navigation
    cursor: pointer
  .pagination
    .swiper-pagination-total
      color: $gray
  +rwdmax(992)
    position: static
    width: 100%

.info
  margin: 0 auto
  max-width: 1280px
  width: 100%
  .paragraph
    &:not(:last-child)
      margin-bottom: 50px
  .images
    display: flex
    align-items: flex-start
    flex-wrap: wrap
    gap: 20px
    &.-double
      flex-wrap: wrap
      img
        width: calc((100% - 20px) / 2)
    &.-single
      img
        width: 100%
    img
      display: block
  .text
    padding: 0 20px
    font-size: px(16)
    line-height: 1.5
    letter-spacing: .5px
    white-space: break-spaces
    &:not(:first-child)
      margin-top: 30px

.share-group
  margin: 100px auto 0
  justify-content: center
.other-group
  margin: 100px auto 0
  display: flex
  align-items: center
  justify-content: center
  flex-wrap: wrap
  max-width: 1280px
  width: 100%
</style>
