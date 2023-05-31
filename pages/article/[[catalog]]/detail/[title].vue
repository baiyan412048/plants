<script setup>
import { useDateFormat } from '@vueuse/core'
import { useArticleSetting, useArticleDetail } from '@/stores/article'

const route = useRoute()
const { params } = route

// 單元設定 store
const articleSettingStore = useArticleSetting()
// 單元設定 method
const { getArticleSetting } = articleSettingStore
const { data: setting } = await getArticleSetting()

// 文章 detail store
const articleDetailStore = useArticleDetail()
// 文章 detail method
const { getArticleDetail } = articleDetailStore
// 文章 detail
const { data: detail } = await getArticleDetail(params.catalog, params.title)
const contents = computed(() => detail.value.data.contents)
// 相同分類所有文章 detail
const { data: allDetail } = await getArticleDetail(params.catalog)

// 取得其他 detail
const otherDetail = computed(() => {
  // 抓取除了自己以外的文章
  const target = allDetail.value.data.filter(
    (obj) => obj.outline.title !== params.title
  )

  const n = target.length

  // 只有一則，則直接回傳
  if (n == 1) return target
  // 沒有其他文章，則回傳空陣列
  if (n == 0) return []

  const [num1, num2] = useGetRandomNumbers(n, 2)

  return [target[num1], target[num2]]
})

// 頁面麵包屑
const breadcrumbs = reactive([
  {
    name: '首頁',
    href: '/'
  },
  {
    name: setting.value.data[0].name,
    href: '/article'
  },
  {
    name: params.catalog,
    href: `/article/${params.catalog}`
  },
  {
    name: params.title
  }
])

useHead({
  title: `${params.title} | 蒔栽`,
  bodyAttrs: {
    class: 'article'
  }
})
</script>

<template>
  <div class="main-wrapper">
    <div class="article-wrapper">
      <div class="article-detail">
        <div class="outline">
          <CommonBreadcrumbs :breadcrumbs="breadcrumbs" />
          <p class="date">
            {{ useDateFormat(detail.value?.updatedAt, 'YYYY.MM.DD').value }}
          </p>
          <p class="title">{{ params.title }}</p>
          <CommonShareGroup />
        </div>
        <div class="hr"></div>
        <div class="content">
          <div
            v-for="(paragraph, key) in contents"
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
        <div v-if="otherDetail.length" class="other-group">
          <CommonOtherDetail
            v-for="(item, key) in otherDetail"
            :key="key"
            :item="item.outline"
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

.article-wrapper
  padding: 120px 0 100px
  position: relative
  z-index: 0
  &::before
    position: absolute
    top: 0
    left: 0
    z-index: -1
    display: block
    background-image: linear-gradient(rgba($green_light, .2), rgba($green_light, 0))
    width: 100%
    height: 600px
    pointer-events: none
    content: ''

.article-detail
  padding: 0 120px
  .outline
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    padding-top: 130px
    text-align: center
  .date
    margin-top: 50px
    color: $green_dark
    font-size: px(20)
    font-weight: 700
    line-height: 1.2
  .title
    margin-top: 20px
    font-size: px(32)
    line-height: 1.5
  .share-group
    margin-top: 100px

  .hr
    margin: 100px auto
    background-color: $green_dark
    border-radius: 500px
    width: 6px
    height: 6px
  .content
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
  .other-group
    margin: 100px auto 0
    display: flex
    align-items: center
    justify-content: center
    max-width: 1280px
    width: 100%
</style>
