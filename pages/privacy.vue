<script setup>
// 單元名稱
const title = ref('網站聲明')

// 單元 banner
const banner = reactive({
  desktop:
    'https://images.unsplash.com/photo-1683085809775-d9ac53fcbe21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
  mobile:
    'https://images.unsplash.com/photo-1683085809775-d9ac53fcbe21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
  color: 'white'
})

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
  title: '網站聲明 | 蒔栽',
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
    </CommonBanner>
    <div class="privacy-wrapper">
      <div class="privacy-container">
        <p>
          此網站僅做學術練習用途，請勿於網站上輸入私密資訊。<br />網站所有圖片的來源於
          <a href="https://unsplash.com/">Unsplash</a><br />所有文章皆使用
          <a href="https://chat.openai.com/">ChatGPT</a>
          生成<br />部分圖片素材源自於
          <a
            href="https://www.freepik.com/free-vector/different-potted-houseplants-flat-vector-illustrations-set-indoor-flowers-plants-flowerpots-vases-alocasia-begonia-pots-isolated-white-background-interior-urban-jungle-concept_26921673.htm#query=indoor%20plants&position=9&from_view=search&track=ais"
            >Freepik by pch.vector</a
          ><br />網站上的字型皆使用
          <a href="https://fonts.google.com/">Google font</a><br />( Noto Sans
          Japanese & Noto Serif Japanese )
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.privacy-wrapper
  padding: 120px 0 100px

.privacy-container
  padding: 0 60px
  margin: 0 auto
  display: flex
  align-items: flex-start
  gap: 100px
  max-width: calc(1400px + 60px * 2)
  width: 100%
  text-align: center
  p
    position: relative
    margin: 0 auto
    line-height: 1.6
  a
    text-decoration: underline
</style>
