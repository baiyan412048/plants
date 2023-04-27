<script setup>
import { Pagination, Autoplay, EffectFade } from 'swiper'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'

const modules = [Pagination, Autoplay, EffectFade]

const title = ref('購物車')

// 頁面麵包屑
const breadcrumbs = reactive([
  {
    name: '首頁',
    href: '/'
  },
  {
    name: title.value
  }
])

useHead({
  title: `${title.value} | 蒔栽`,
  bodyAttrs: {
    class: 'cart'
  }
})
</script>

<template>
  <div class="main-wrapper">
    <div class="cart-wrapper">
      <div class="outline">
        <CommonBreadcrumbs :breadcrumbs="breadcrumbs" />
      </div>
      <div class="discount">
        <div class="tip">
          <p>優惠資訊</p>
          <div class="disable">
            <span>今日不要再顯示</span>
            <Icon name="mdi:close" />
          </div>
        </div>
        <Swiper
          :modules="modules"
          :autoplay="{
            delay: 2500,
            disableOnInteraction: false
          }"
          :speed="800"
          :effect="'fade'"
          :fade-effect="{
            crossFade: true
          }"
        >
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1682241229580-e72acdf0eb6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1681767892373-f1af9a264226?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.unsplash.com/photo-1682240429814-c6a38c31d93c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="info">
        <div class="info-list">
          <ul>
            <li>
              <div class="photo">
                <img
                  src="https://images.unsplash.com/photo-1597305877032-0668b3c6413a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                  alt=""
                />
              </div>
              <div class="content">
                <p>龜背芋</p>
                <p>觀葉植物</p>
                <div></div>
              </div>
              <div class="price"></div>
            </li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class="info-aside">
          <div class="block">
            <p>
              <span>小計</span>
              <span>$3,400</span>
            </p>
            <p>
              <span>運費</span>
              <span>$100</span>
            </p>
          </div>
          <div class="block">
            <p>
              <span>總計</span>
              <span>$3,500</span>
            </p>
          </div>
          <div class="block">
            <button type="button">會員登入</button>
            <button type="button">前往結帳</button>
          </div>
        </div>
      </div>
      <div class="may-like">
        <p>也許你會喜歡</p>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.cart-wrapper
  padding: 120px 0 100px
  margin: 0 auto
  max-width: 1280px
  &::before
    position: absolute
    top: 0
    left: 0
    z-index: -1
    display: block
    background-image: linear-gradient(rgba($green_fluorescent, .2), rgba($green_fluorescent, 0))
    width: 100%
    height: 600px
    pointer-events: none
    content: ''
  .outline
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    padding-top: 130px
    text-align: center
  .discount
    margin: 100px auto 0
    max-width: 1000px
    width: 100%
    .tip
      display: flex
      align-items: center
      justify-content: space-between
      &>p
        font-size: px(20)
        font-weight: 700
        letter-spacing: .8px
        line-height: 1.2
    .disable
      padding: 5px 14px
      display: flex
      align-items: center
      gap: 10px
      border-radius: 500px
      background-color: $yellow
      font-size: px(12)
      font-weight: 700
      line-height: 1.2
      cursor: pointer
      svg
        width: 20px
        height: 20px
    .swiper
      margin-top: 10px
    .swiper-slide
      position: relative
      aspect-ratio: 16/9
      img
        position: absolute
        top: 0
        left: 0
        border-radius: 8px
        width: 100%
        height: 100%
        object-fit: cover
  .info
    padding-top: 200px
    margin: 100px auto 0
    display: flex
    align-items: flex-start
    gap: 30px
    max-width: 1280px
    width: 100%
  .info-list
    flex: 1
    width: 100%
    li
      padding: 30px 20px
      display: flex
      align-items: flex-start
      gap: 30px
      &:not(:last-child)
        border-bottom: 1px solid $green_fluorescent
    .photo
      position: relative
      width: 120px
      height: 120px
      img
        position: absolute
        top: 0
        left: 0
        border-radius: 8px
        width: 100%
        height: 100%
        object-fit: cover
    .content
      flex: 1
      width: 100%
    .price
      flex-shrink: 0
  .info-aside
    padding: 20px
    position: sticky
    top: 0
    flex-shrink: 0
    border: 1px solid $green_fluorescent
    border-radius: 8px
    max-width: 400px
    width: 100%
    .block
      padding: 20px 10px
      &:not(:last-child)
        border-bottom: 1px solid $green_fluorescent
    p
      display: flex
      align-items: center
      justify-content: space-between
      font-size: px(18)
      line-height: 1.2
      letter-spacing: .8px
      &:not(:last-child)
        margin-bottom: 20px
  .may-like
    margin: 100px auto 0
    max-width: 1280px
    width: 100%
    font-size: px(24)
    line-height: 1.2
    letter-spacing: .8px
</style>
