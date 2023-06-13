<script setup>
import { storeToRefs } from 'pinia'
import { useNewsSetting, useNewsCatalog, useNewsOutline } from '@/stores/news'

// route
const route = useRoute()
const { params } = route

// 單元設定 store
const newsSettingStore = useNewsSetting()
// 單元設定 method
const { getNewsSetting } = newsSettingStore

// 最新消息分類 store
const newsCatalogStore = useNewsCatalog()
// 最新消息分類 method
const { getNewsCatalog } = newsCatalogStore

// 最新消息 outline store
const newsOutlineStore = useNewsOutline()
// 最新消息 outline method
const { getNewsOutline } = newsOutlineStore
// 最新消息 active catalog
const { newsActiveCatalog } = storeToRefs(newsOutlineStore)

// get data
const [{ data: setting }, { data: catalog }, { data: outline }] =
  await Promise.all([getNewsSetting(), getNewsCatalog(), getNewsOutline()])

// 最新消息分類 data
const newsCatalog = computed(() => catalog.value.data)

// 最新消息 outline data
const newsOutline = computed(() => outline.value?.data ?? [])

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
  newsActiveCatalog.value = params.catalog
} else {
  newsActiveCatalog.value = '全部類別'
}

// 所有分類
const allCatalog = reactive([
  {
    name: '全部類別',
    href: '/news'
  },
  ...newsCatalog.value.map((obj) => {
    return {
      name: obj.catalog,
      href: `/news/${obj.catalog}`
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
    href: '/news'
  },
  {
    name: newsActiveCatalog.value
  }
])

useHead({
  title: `${title.value} | 蒔栽`,
  bodyAttrs: {
    class: 'news'
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
          :active-catalog="newsActiveCatalog"
        />
      </template>
    </CommonBanner>
    <div class="news-wrapper">
      <div class="news-list">
        <template v-if="newsOutline.length">
          <ul>
            <template v-for="(item, key) in newsOutline" :key="key">
              <li
                v-if="
                  newsActiveCatalog == '全部類別' ||
                  newsActiveCatalog == item.catalog.catalog
                "
              >
                <NewsCard :index="key" :news="item" />
              </li>
            </template></ul
        ></template>
        <BaseNoResult v-else>
          <p>尚未新增最新消息</p>
        </BaseNoResult>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.news-wrapper
  padding: 120px 0 100px
  +rwdmax(767)
    padding: 80px 0 60px

.news-list
  padding: 0 60px
  ul
    margin: 0 auto
    display: flex
    justify-content: center
    flex-wrap: wrap
    gap: 100px
    max-width: 1550px
    width: 100%
  li
    width: calc((100% - 100px * 2) / 3)
  +rwdmax(1024)
    padding: 0 40px
  +rwdmax(992)
    li
      width: calc((100% - clamp(40px, 5.2083vw, 100px)) / 2)
  +rwdmax(767)
    li
      width: 100%
</style>
