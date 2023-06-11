<script setup>
import { storeToRefs } from 'pinia'
import { useFAQSetting, useFAQCatalog, useFAQDetail } from '@/stores/faq'

// route
const route = useRoute()
const { params } = route

// 單元設定 store
const faqSettingStore = useFAQSetting()
// 單元設定 method
const { getFAQSetting } = faqSettingStore

// 常見問題分類 store
const faqCatalogStore = useFAQCatalog()
// 常見問題分類 method
const { getFAQCatalog } = faqCatalogStore
// 常見問題分類 data
const faqCatalog = computed(() => catalog.value.data)

// 常見問題 detail store
const faqDetailStore = useFAQDetail()
// 常見問題 detail method
const { getFAQDetail } = faqDetailStore
// 常見問題 active catalog
const { faqActiveCatalog } = storeToRefs(faqDetailStore)
// 常見問題 detail
const faqDetail = computed(() => detail.value.data)

// get data
const [{ data: setting }, { data: catalog }, { data: detail }] =
  await Promise.all([getFAQSetting(), getFAQCatalog(), getFAQDetail()])

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
  faqActiveCatalog.value = params.catalog
} else {
  faqActiveCatalog.value = '商品相關'
}

// 所有分類
const allCatalog = reactive([
  ...faqCatalog.value.map((obj) => {
    return {
      name: obj.catalog,
      href: `/faq/${obj.catalog}`
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
    name: title
  }
])

useHead({
  title: `${title.value} | 蒔栽`,
  bodyAttrs: {
    class: 'privacy'
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
          :active-catalog="faqActiveCatalog"
        />
      </template>
    </CommonBanner>
    <div class="faq-wrapper">
      <div class="faq-container">
        <ul>
          <template v-for="(item, key) in faqDetail" :key="key">
            <li v-if="faqActiveCatalog == item.catalog.catalog">
              <CommonCollapse :open="true" :name="item.title">
                <template #target>
                  <p class="content">{{ item.content }}</p>
                </template>
              </CommonCollapse>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.faq-wrapper
  padding: 120px 0 100px

.faq-container
  padding: 0 60px
  margin: 0 auto
  max-width: calc(1400px + 60px * 2)
  width: 100%
  ul
    margin: 0 auto
    max-width: 850px
    width: 100%
  .content
    padding: 0 20px
    line-height: 1.6
</style>
