<script setup>
import { useNewsSetting, useNewsCatalog } from '@/stores/news'
import { useArticleSetting, useArticleCatalog } from '@/stores/article'
import { useProductSetting, useProductCatalog } from '@/stores/product'
import { useFAQSetting, useFAQCatalog } from '@/stores/faq'

// 最新消息單元設定 store
const newsSettingStore = useNewsSetting()
// 最新消息單元設定 method
const { getNewsSetting } = newsSettingStore

// 最新消息分類 store
const newsCatalogStore = useNewsCatalog()
// 最新消息分類 method
const { getNewsCatalog } = newsCatalogStore

// 文章單元設定 store
const articleSettingStore = useArticleSetting()
// 文章單元設定 method
const { getArticleSetting } = articleSettingStore

// 文章分類 store
const articleCatalogStore = useArticleCatalog()
// 文章分類 method
const { getArticleCatalog } = articleCatalogStore

// 產品單元設定 store
const productSettingStore = useProductSetting()
// 產品單元設定 method
const { getProductSetting } = productSettingStore

// 產品分類 store
const productCatalogStore = useProductCatalog()
// 產品分類 method
const { getProductCatalog } = productCatalogStore

// 常見問題單元設定 store
const faqSettingStore = useFAQSetting()
// 常見問題單元設定 method
const { getFAQSetting } = faqSettingStore

// 常見問題分類 store
const faqCatalogStore = useFAQCatalog()
// 常見問題分類 method
const { getFAQCatalog } = faqCatalogStore

// get data
const [
  { data: newsSetting },
  { data: newsCatalog },
  { data: articleSetting },
  { data: articleCatalog },
  { data: productSetting },
  { data: productCatalog },
  { data: faqSetting },
  { data: faqCatalog }
] = await Promise.all([
  getNewsSetting(),
  getNewsCatalog(),
  getArticleSetting(),
  getArticleCatalog(),
  getProductSetting(),
  getProductCatalog(),
  getFAQSetting(),
  getFAQCatalog()
])

// 最新消息 data
const newsData = computed(() => {
  return {
    setting: newsSetting.value.data[0].name,
    catalog: newsCatalog.value.data
  }
})

// 文章專欄 data
const articleData = computed(() => {
  return {
    setting: articleSetting.value.data[0].name,
    catalog: articleCatalog.value.data
  }
})

// 產品 data
const productData = computed(() => {
  return {
    setting: productSetting.value.data[0].name,
    catalog: productCatalog.value.data
  }
})

// 常見問題 data
const faqData = computed(() => {
  return {
    setting: faqSetting.value.data[0].name,
    catalog: faqCatalog.value.data
  }
})
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="wrapper">
        <div class="links">
          <div>
            <NuxtLink class="b" to="/news">{{ newsData.setting }}</NuxtLink>
            <ul>
              <li v-for="(catalog, key) in newsData.catalog" :key="key">
                <NuxtLink :to="`/news/${catalog.catalog}`">{{
                  catalog.catalog
                }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <NuxtLink class="b" to="/article">{{
              articleData.setting
            }}</NuxtLink>
            <ul>
              <li v-for="(catalog, key) in articleData.catalog" :key="key">
                <NuxtLink :to="`/article/${catalog.catalog}`">{{
                  catalog.catalog
                }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <NuxtLink class="b" to="/article">{{
              productData.setting
            }}</NuxtLink>
            <ul>
              <li v-for="(catalog, key) in productData.catalog" :key="key">
                <NuxtLink :to="`/article/${catalog.catalog}`">{{
                  catalog.catalog
                }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <NuxtLink class="b" to="/faq">{{ faqData.setting }}</NuxtLink>
            <ul>
              <li v-for="(catalog, key) in faqData.catalog" :key="key">
                <NuxtLink :to="`/faq/${catalog.catalog}`">{{
                  catalog.catalog
                }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="info">
          <NuxtLink class="info-logo" to="/">
            <nuxt-img src="/LOGO.svg" loading="lazy" />
          </NuxtLink>
          <div class="info-content">
            <p>TEL : 04 - 8888 - 8888</p>
            <p>FAX : 04 - 8888 - 8888</p>
            <p>loveing.nature@plants.com</p>
          </div>
        </div>
      </div>
      <div class="wrapper bottom">
        <div class="statement">
          <p>
            此網站僅做學術練習用途，請勿於網站上輸入私密資訊。<br />所有圖片及文章來源皆來自於網路，詳細資訊
            <NuxtLink to="/privacy">請參閱</NuxtLink>
          </p>
          <p>Website by <NuxtLink to="/">Baiyan</NuxtLink></p>
        </div>
        <ul class="social-media">
          <li>
            <NuxtLink to="/"><Icon name="bi:youtube" /></NuxtLink>
          </li>
          <li>
            <NuxtLink to="/"><Icon name="ri:facebook-fill" /></NuxtLink>
          </li>
          <li>
            <NuxtLink to="/"><Icon name="bi:instagram" /></NuxtLink>
          </li>
          <li>
            <NuxtLink to="/"><Icon name="bi:line" /></NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

footer.footer
  padding: 150px 60px 100px
  background-color: $green_light
  border-radius: 30px 30px 0 0
  .wrapper
    display: flex
    justify-content: space-between
    &.bottom
      margin-top: 40px
      align-items: flex-end
  .links
    display: flex
    align-items: flex-start
    gap: 40px
    font-size: px(14)
    line-height: 1.5
    .b
      display: block
      margin-bottom: 15px
      font-size: px(16)
      font-weight: 700
    li
      &:not(:last-child)
        margin-bottom: 5px
  .info
    display: flex
    flex-direction: column
    align-items: flex-end
    gap: 40px
  .info-logo
    display: flex
    justify-content: flex-end
    width: 120px
    img
      width: 100%
  .info-content
    display: flex
    flex-direction: column
    justify-content: flex-end
    gap: 5px
    line-height: 1.2
    text-align: right
  .statement
    display: flex
    align-items: flex-end
    font-size: px(14)
    font-weight: 700
    line-height: 1.5
  .social-media
    display: flex
    align-items: center
    gap: 20px
    a
      display: flex
      align-items: center
      justify-content: center
      width: 40px
      height: 40px
      font-size: px(26)
  +rwdmax(1024)
    padding: 100px 40px 80px
  +rwdmax(768)
    padding: 80px 40px 60px
    .wrapper
      flex-direction: column-reverse
      align-items: center
      justify-content: center
      text-align: center
      &.bottom
        flex-direction: column-reverse
        align-items: center
        justify-content: center
        text-align: center
    .info
      align-items: center
    .info-content
      margin-bottom: 20px
      text-align: center
    .statement
      flex-direction: column
      align-items: center
    .social-media
      display: none
  +rwdmax(767)
    padding: 60px 20px 40px
    .links
      gap: 30px
    .info-logo
      width: 80px
</style>
