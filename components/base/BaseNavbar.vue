<script setup>
import { useMember } from '@/stores/member'
import { useToast } from '@/stores/toast'

// 會員資料 store
const memberStore = useMember()
// 會員資料 method
const { toLogout } = memberStore

// 通知 store
const toastStore = useToast()
// 通知 method
const { addToast } = toastStore

const logout = () => {
  toLogout()
  // 訊息通知
  addToast({
    title: '已成功登出',
    state: 'success'
  })
  // 導向前一頁 || 會員中心
  navigateTo(redirectTo.value ?? '/member/center')
}
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <NuxtLink class="logo" to="/">
        <nuxt-img src="/LOGO.svg" loading="lazy" />
      </NuxtLink>
      <ul class="list">
        <li>
          <NuxtLink to="/news">最新消息</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/article">文章專欄</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/product">植物觀園</NuxtLink>
        </li>
      </ul>
      <div class="member">
        <template v-if="memberStore.loginState">
          <NuxtLink to="/member/center">會員中心</NuxtLink>
          <div @click="logout">登出</div>
        </template>
        <NuxtLink v-else to="/member/login">登入會員</NuxtLink>
        <NuxtLink to="/cart">購物車</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

nav.navbar
  padding: 40px
  position: fixed
  z-index: 5
  top: 0
  left: 0
  width: 100%
  pointer-events: none
  .container
    margin: 0 auto
    padding: 0 40px
    display: flex
    align-items: center
    justify-content: space-between
    border-radius: 10px
    background-color: #fff
    box-shadow: 0px 15px 20px -5px rgb($black, .1)
    max-width: 900px
    width: 100%
    height: 80px
    pointer-events: auto
  .logo
    display: block
    width: 150px
    img
      width: 80px
  .list
    margin: 0 auto
    display: flex
    align-items: center
    gap: 20px
  .member
    display: flex
    align-items: center
    justify-content: flex-end
    font-size: px(14)
    font-weight: 700
    gap: 10px
    width: 150px
    div
      cursor: pointer
</style>
