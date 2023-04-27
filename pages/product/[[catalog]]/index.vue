<script setup>
import Slider from '@vueform/slider'

import { storeToRefs } from 'pinia'
import {
  useProductSetting,
  useProductCatalog,
  useProductOutline
} from '@/stores/product'

// route
const route = useRoute()
const { params } = route

// 單元設定 store
const productSettingStore = useProductSetting()
// 單元設定 method
const { getProductSetting } = productSettingStore
const { data: setting } = await getProductSetting()

// 產品分類 store
const productCatalogStore = useProductCatalog()
// 產品分類 method
const { getProductCatalog } = productCatalogStore
// 產品分類
const { data: catalogs } = await getProductCatalog()
const productCatalog = computed(() => catalogs.value.data)

// 產品 outline store
const productOutlineStore = useProductOutline()
// 產品 outline method
const { getProductOutline } = productOutlineStore
// 產品 active catalog
const { productActiveCatalog } = storeToRefs(productOutlineStore)
// 產品 outline
const { data: outline } = await getProductOutline()
const productOutline = computed(() => outline.value?.data ?? [])

// 單元名稱
const title = ref(setting.value.data[0].name)

// 單元 banner
const banner = reactive({
  desktop: setting.value.data[0].banner.desktop,
  mobile: setting.value.data[0].banner?.mobile,
  color: setting.value.data[0].banner.color
})

// 分類初始值設定
if (params.catalog) {
  productActiveCatalog.catalog = params.catalog
  productActiveCatalog.type = ''
} else {
  productActiveCatalog.catalog = '所有植物'
  productActiveCatalog.type = 'plants'
}

// 所有分類
const allCatalog = reactive([
  {
    name: '所有植物',
    href: '/product'
  },
  ...productCatalog.value.map((obj) => {
    return {
      name: obj.catalog,
      href: `/product/${obj.catalog}`
    }
  })
])

// 頁面麵包屑
const breadcrumbs = reactive([
  {
    name: '首頁',
    href: '/'
  },
  {
    name: title,
    href: '/product'
  },
  {
    name: productActiveCatalog.catalog
  }
])

const priceRange = ref([20, 40])

useHead({
  title: `${title.value} | 蒔栽`,
  bodyAttrs: {
    class: 'product'
  }
})
</script>

<template>
  <div class="main-wrapper">
    <CommonBanner :color="banner.color" :title="title" :image="banner">
      <template #breadcrumbs>
        <CommonBreadcrumbs :breadcrumbs="breadcrumbs" />
      </template>
      <template #catalog>
        <CommonCatalog
          :catalog="allCatalog"
          :active-catalog="productActiveCatalog.catalog"
        />
      </template>
    </CommonBanner>
    <div class="product-wrapper">
      <div class="product-container">
        <div class="product-aside">
          <div class="price-block">
            <div class="placeholder">
              <p class="tag">價格區間</p>
              <p>${{ priceRange[0] }} ~ ${{ priceRange[1] }}</p>
            </div>
            <Slider v-model="priceRange" :tooltips="false" />
          </div>
          <ul class="option-block">
            <li>
              <div class="placeholder">
                <p class="tag">尺寸</p>
                <div class="icon">
                  <Icon name="ri:add-fill" size="28" />
                </div>
              </div>
              <div class="list">
                <ul>
                  <li class="option">
                    <label>
                      <input type="checkbox" />
                      <div class="checkbox"></div>
                      <p>S ( 15 cm 以下 )</p>
                    </label>
                  </li>
                  <li class="option">
                    <label>
                      <input type="checkbox" />
                      <div class="checkbox"></div>
                      <p>S ( 15 cm 以下 )</p>
                    </label>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div class="placeholder">
                <p class="tag">難易度</p>
                <div class="icon">
                  <Icon name="ri:subtract-fill" size="28" />
                </div>
              </div>
              <div class="list">
                <ul>
                  <li class="option">
                    <label>
                      <input type="checkbox" />
                      <div class="checkbox"></div>
                      <p>S ( 15 cm 以下 )</p>
                    </label>
                  </li>
                  <li class="option">
                    <label>
                      <input type="checkbox" />
                      <div class="checkbox"></div>
                      <p>S ( 15 cm 以下 )</p>
                    </label>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div class="product-list">
          <ul>
            <template v-for="(item, key) in productOutline" :key="key">
              <li
                v-if="
                  productActiveCatalog.catalog == '所有植物' ||
                  productActiveCatalog.catalog == item.catalog.catalog
                "
              >
                <ProductCard :index="key" :product="item" />
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>

<style lang="sass">
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.product-wrapper
  padding: 120px 0 100px

.product-container
  padding: 0 60px
  margin: 0 auto
  display: flex
  align-items: flex-start
  gap: 100px
  max-width: calc(1400px + 60px * 2)
  width: 100%

.product-aside
  max-width: 400px
  width: 28.5714%
  .placeholder
    padding: 20px 0
    display: flex
    align-items: center
    justify-content: space-between
  .tag
    display: flex
    align-items: center
    gap: 15px
    &::before
      display: block
      background-color: $green
      width: 5px
      height: 25px
      content: ''

.price-block
  --slider-height: 2px
  --slider-bg: rgba(217, 217, 217, .2)
  --slider-handle-width: 10px
  --slider-handle-height: 10px
  --slider-handle-bg: #{$green}
  --slider-handle-shadow: none

.option-block
  margin-top: 50px
  .placeholder
    border-bottom: 1px solid $gray
  .list
    padding: 10px 0
    border-bottom: 1px solid $gray
  .option
    label
      padding: 10px
      position: relative
      display: flex
      align-items: center
      justify-content: space-between
      gap: 20px
    input
      position: absolute
      opacity: 0
      pointer-events: none
  .checkbox
    border: 2px solid $black
    // border: 2px solid $green
    border-radius: 3px
    width: 20px
    height: 20px

.product-list
  max-width: 900px
  width: 64.2857%
  ul
    display: flex
    flex-wrap: wrap
    gap: 60px
  li
    width: calc((100% - 60px * 2) / 3)
</style>
