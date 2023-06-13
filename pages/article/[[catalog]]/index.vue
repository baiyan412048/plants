<script setup>
import { storeToRefs } from 'pinia'
import {
  useArticleSetting,
  useArticleCatalog,
  useArticleOutline
} from '@/stores/article'

// route
const route = useRoute()
const { params } = route

// 單元設定 store
const articleSettingStore = useArticleSetting()
// 單元設定 method
const { getArticleSetting } = articleSettingStore

// 文章分類 store
const articleCatalogStore = useArticleCatalog()
// 文章分類 method
const { getArticleCatalog } = articleCatalogStore

// 文章 outline store
const articleOutlineStore = useArticleOutline()
// 文章 outline method
const { getArticleOutline } = articleOutlineStore
// 文章 active catalog
const { articleActiveCatalog } = storeToRefs(articleOutlineStore)

// get data
const [{ data: setting }, { data: catalog }, { data: outline }] =
  await Promise.all([
    getArticleSetting(),
    getArticleCatalog(),
    getArticleOutline()
  ])

// 文章分類 data
const articleCatalog = computed(() => catalog.value.data)

// 文章 outline data
const articleOutline = computed(() => outline.value.data)

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
  articleActiveCatalog.value = params.catalog
} else {
  articleActiveCatalog.value = '全部類別'
}

// 所有分類
const allCatalog = reactive([
  {
    name: '全部類別',
    href: '/article'
  },
  ...articleCatalog.value.map((obj) => {
    return {
      name: obj.catalog,
      href: `/article/${obj.catalog}`
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
    href: '/article'
  },
  {
    name: articleActiveCatalog.value
  }
])

useHead({
  title: `${title.value} | 蒔栽`,
  bodyAttrs: {
    class: 'article'
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
          :active-catalog="articleActiveCatalog"
        />
      </template>
    </CommonBanner>
    <div class="article-wrapper">
      <div class="article-list">
        <ul>
          <template v-for="(item, key) in articleOutline" :key="key">
            <li
              v-if="
                articleActiveCatalog == '全部類別' ||
                articleActiveCatalog == item.catalog.catalog
              "
            >
              <ArticleCard :index="key" :article="item" />
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.article-wrapper
  padding: 120px 0 100px
  +rwdmax(767)
    padding: 80px 0 60px

.article-list
  padding: 0 60px
  ul
    margin: 0 auto
    display: flex
    justify-content: center
    flex-wrap: wrap
    // gap: 100px
    gap: clamp(40px, 5.2083vw, 100px)
    max-width: 1550px
    width: 100%
  li
    width: calc((100% - clamp(40px, 5.2083vw, 100px) * 2) / 3)
  +rwdmax(1024)
    padding: 0 40px
  +rwdmax(992)
    li
      width: calc((100% - clamp(40px, 5.2083vw, 100px)) / 2)
  +rwdmax(767)
    li
      width: 100%
</style>
