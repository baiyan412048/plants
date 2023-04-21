<script setup>
import { useArticleSetting, useArticleCatalog } from '@/stores/article'

// 單元設定
const articleSettingStore = useArticleSetting()
const { getArticleSetting } = articleSettingStore
const { data: articleSetting } = await getArticleSetting()

// 文章分類
const articleCatalogStore = useArticleCatalog()
const { getArticleCatalog } = articleCatalogStore
const { data: articleCatalog } = await getArticleCatalog()

const articleData = computed(() => {
  return {
    setting: articleSetting.value.data[0].name,
    catalog: articleCatalog.value.data
  }
})
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="wrapper">
        <div class="links">
          <div>
            <NuxtLink class="b" to="/news">最新消息</NuxtLink>
            <ul>
              <li>
                <NuxtLink to="/">營業日期</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">實體店面</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">線上購物</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">展覽介紹</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">優惠資訊</NuxtLink>
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
            <NuxtLink class="b" to="/news">最新消息</NuxtLink>
            <ul>
              <li>
                <NuxtLink to="/">營業日期</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">實體店面</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">線上購物</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">展覽介紹</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">優惠資訊</NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <NuxtLink class="b" to="/news">最新消息</NuxtLink>
            <ul>
              <li>
                <NuxtLink to="/">營業日期</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">實體店面</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">線上購物</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">展覽介紹</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">優惠資訊</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="info">
          <NuxtLink class="info-logo" to="/">
            <img src="/LOGO.svg" alt="" />
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
            <NuxtLink to="/">請參閱</NuxtLink>
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
</style>
