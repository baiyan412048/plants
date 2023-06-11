<script setup>
import Slider from '@vueform/slider'

import { storeToRefs } from 'pinia'
import {
  useProductSetting,
  useProductCatalog,
  useProductFilter,
  useProductOutline
} from '@/stores/product'

// route
const route = useRoute()
const { params } = route

// 單元設定 store
const productSettingStore = useProductSetting()
// 單元設定 method
const { getProductSetting } = productSettingStore

// 產品分類 store
const productCatalogStore = useProductCatalog()
// 產品分類 method
const { getProductCatalog } = productCatalogStore

// 產品篩選 store
const productFilterStore = useProductFilter()
// 產品篩選 method
const { getProductSize, getProductDiff, getProductEnv } = productFilterStore

// 產品 outline store
const productOutlineStore = useProductOutline()
// 產品 outline method
const { getProductOutline } = productOutlineStore
// 產品 active catalog
const { productActiveCatalog } = storeToRefs(productOutlineStore)

// get data
const [
  { data: setting },
  { data: catalog },
  { data: size },
  { data: diff },
  { data: env },
  { data: outline }
] = await Promise.all([
  getProductSetting(),
  getProductCatalog(),
  getProductSize(),
  getProductDiff(),
  getProductEnv(),
  getProductOutline()
])

// 產品分類 data
const productCatalog = computed(() => catalog.value.data)

// 產品篩選 - 尺寸 data
const productSize = computed(() => size.value.data)
// 尺寸篩選儲存
const filterSize = ref([])
// 更新尺寸篩選
const updateFilterSize = (selected, target) => {
  if (!selected) {
    filterSize.value.splice(filterSize.value.indexOf(target.size), 1)
    return
  }
  filterSize.value.push(target.size)
}
// 產品篩選 - 難易度 data
const productDiff = computed(() => diff.value.data)
// 難易度篩選儲存
const filterDiff = ref([])
// 更新難易度篩選
const updateFilterDiff = (selected, target) => {
  if (!selected) {
    filterDiff.value.splice(filterDiff.value.indexOf(target.diff), 1)
    return
  }
  filterDiff.value.push(target.diff)
}
// 產品篩選 - 環境 data
const productEnv = computed(() => env.value.data)
// 環境篩選儲存
const filterEnv = ref([])
// 更新環境篩選
const updateFilterEnv = (selected, target) => {
  if (!selected) {
    filterEnv.value.splice(filterEnv.value.indexOf(target.env), 1)
    return
  }
  filterEnv.value.push(target.env)
}

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
  productActiveCatalog.value.catalog = params.catalog
  productActiveCatalog.value.type = productCatalog.value.find((obj) => {
    if (params.catalog == obj.catalog) {
      return obj
    }
  }).type
} else {
  productActiveCatalog.value.catalog = '所有植物'
  productActiveCatalog.value.type = 'plants'
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
    name: productActiveCatalog.value.catalog
  }
])

// 篩選後產品 outline
const filterProductOutline = computed(() => {
  let product = outline.value?.data
  // 篩選產品分類
  product = product.filter((obj) => {
    if (
      productActiveCatalog.value.catalog == '所有植物' ||
      productActiveCatalog.value.catalog == obj.catalog.catalog
    ) {
      return obj
    }
  })
  // 篩選產品尺寸
  if (filterSize.value.length) {
    product = product.filter((obj) => {
      if (filterSize.value.includes(obj.size.size)) {
        return obj
      }
    })
  }
  // 篩選產品難易度
  if (filterDiff.value.length) {
    product = product.filter((obj) => {
      if (filterDiff.value.includes(obj.diff.diff)) {
        return obj
      }
    })
  }
  // 篩選產品環境
  if (filterEnv.value.length) {
    product = product.filter((obj) => {
      if (filterEnv.value.includes(obj.env.env)) {
        return obj
      }
    })
  }

  return product
})

// 價錢範圍
// 篩選後的商品價錢最小最大值
const priceRangeTemp = computed(() => {
  const price = filterProductOutline.value
    .map((obj) => obj.price)
    .sort((a, b) => a - b)
  return [price[0], price[price.length - 1]]
})

const priceRange = ref([priceRangeTemp.value[0], priceRangeTemp.value[1]])

useHead({
  title: `${productActiveCatalog.value.catalog} | 蒔栽`,
  bodyAttrs: {
    class: 'member'
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
        <aside class="product-aside">
          <div
            v-if="priceRangeTemp[0] !== priceRangeTemp[1]"
            class="price-block"
          >
            <div class="placeholder">
              <p class="tag">價格區間</p>
              <p>
                <span>${{ priceRange[0] }}</span>
                ~
                <span>${{ priceRange[1] }}</span>
              </p>
            </div>
            <div class="price-slider">
              <Slider
                v-model="priceRange"
                :min="priceRangeTemp[0]"
                :max="priceRangeTemp[1]"
                :tooltips="false"
              />
              <p class="range">
                <span>${{ priceRangeTemp[0].toLocaleString() }}</span>
                <span>${{ priceRangeTemp[1].toLocaleString() }}</span>
              </p>
            </div>
          </div>
          <div class="filter-block">
            <CommonCollapse :open="true" :name="'尺寸'">
              <template #target>
                <ProductFilter
                  :format="'size'"
                  :filter="productSize"
                  @update-filter="updateFilterSize"
                />
              </template>
            </CommonCollapse>
            <CommonCollapse
              v-if="productActiveCatalog.type == 'plants'"
              :name="'難易度'"
            >
              <template #target>
                <ProductFilter
                  :format="'diff'"
                  :filter="productDiff"
                  @update-filter="updateFilterDiff"
                />
              </template>
            </CommonCollapse>
            <CommonCollapse
              v-if="productActiveCatalog.type == 'plants'"
              :name="'環境'"
            >
              <template #target>
                <ProductFilter
                  :format="'env'"
                  :filter="productEnv"
                  @update-filter="updateFilterEnv"
                />
              </template>
            </CommonCollapse>
          </div>
        </aside>
        <div class="product-list">
          <template v-if="filterProductOutline.length">
            <ul>
              <template v-for="(item, key) in filterProductOutline" :key="key">
                <li
                  v-if="
                    priceRange[0] <= item.price && priceRange[1] >= item.price
                  "
                >
                  <ProductCard :index="key" :product="item" />
                </li>
              </template>
            </ul>
          </template>
          <BaseNoResult v-else>
            <p>此分類無商品</p>
          </BaseNoResult>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@vueform/slider/themes/default.css"></style>

<style lang="sass" scoped>
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
  position: sticky
  top: 160px
  max-width: 400px
  width: 28.5714%

.price-block
  .placeholder
    padding: 20px 0
    display: flex
    align-items: center
    justify-content: space-between
    cursor: pointer
    span
      border-bottom: 1px solid $black

.price-slider
  --slider-height: 2px
  --slider-bg: rgba(217, 217, 217, .2)
  --slider-handle-width: 10px
  --slider-handle-height: 10px
  --slider-handle-bg: #{$green}
  --slider-handle-shadow: none
  .slider-target
    margin: 0 auto
    width: calc(100% - 10px)
  .range
    margin-top: 10px
    display: flex
    align-items: center
    justify-content: space-between
    gap: 20px
    color: $gray
    font-size: px(14)
    line-height: 1.2

.filter-block
  &:not(:first-child)
    margin-top: 50px

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
