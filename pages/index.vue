<script setup>
import { useProductOutline } from '@/stores/product'

import { Pagination, Autoplay, EffectFade } from 'swiper'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'

const modules = [Pagination, Autoplay, EffectFade]

// 產品 detail store
const productOutlineStore = useProductOutline()
// 產品 detail method
const { getProductOutline } = productOutlineStore

// 產品 detail
const { data: product } = await getProductOutline()
const productList = computed(() => product.value.data)

// 單元 banner
const banner = reactive({
  desktop: 'https://i.imgur.com/VpOclab.jpg',
  mobile: 'https://i.imgur.com/VpOclab.jpg',
  color: 'black'
})

useHead({
  title: '蒔栽 | 享受種植的美好'
})
</script>

<template>
  <div class="main-wrapper">
    <CommonBanner :color="banner.color" :title="'蒔栽'" :image="banner" />
    <div class="outline">
      <nuxt-img src="/background.svg" loading="lazy" />
      <p class="title">歡迎來到蒔栽</p>
      <i class="arrow"></i>
      <p class="text">
        蒔栽想把種植植物的各種美好分享給大家，<br />
        就像好友之間訴說著彼此的種植經驗、以及對於美好生活的想像。<br />
        經歷過工作與生活的衝撞，植物讓兩者產生平衡，<br />
        透過養護植物，也時時提醒著看照自己的心情，<br />
        慢下腳步感受情緒，活力有朝氣的過每一天。
      </p>
    </div>
    <div class="product">
      <p class="title">熱門商品</p>
      <Swiper
        :slides-per-view="4"
        :space-between="50"
        :modules="modules"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false
        }"
        :speed="800"
      >
        <SwiperSlide v-for="(item, key) in productList" :key="key">
          <ProductCard :index="key" :product="item" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.main-wrapper
  padding-bottom: 100px

.outline
  padding: 80px 60px
  position: relative
  text-align: center
  img
    position: absolute
    z-index: -1
    bottom: 0
    left: 50%
    transform: translate3d(-50%, 0, 0)
  .title
    position: relative
    color: $black
    font-size: px(32)
    font-family: $serif
    font-weight: 700
  .arrow
    margin: 30px auto
    display: flex
    align-items: center
    justify-content: center
    width: 20px
    height: 12px
    animation: arrow 3s ease infinite
    &::before
      display: block
      width: 0
      height: 0
      border-style: solid
      border-width: 6px 6px 0 6px
      border-color: $black transparent transparent transparent
      content: ''
  .text
    line-height: 1.6

.product
  padding: 50px 60px
  margin: 0 auto
  max-width: calc(1280px + 60px * 2)
  width: 100%
  .title
    margin-bottom: 30px
    font-size: px(28)
    font-family: $serif
    font-weight: 700
    text-align: center

@keyframes arrow
  0%
    transform: translateY(-.4rem)
  50%
    transform: translateY(.4rem)
  100%
    transform: translateY(-.4rem)
</style>
