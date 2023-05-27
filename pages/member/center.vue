<script setup>
import { useMember } from '@/stores/member'

// 會員資料 store
const memberStore = useMember()
// 會員資料 method
const { toLogout } = memberStore

const logout = () => {
  toLogout()
  // 訊息通知
  addToast({
    title: '已成功登出',
    state: 'success'
  })
  // 導向登入頁
  navigateTo('/')
}

useHead({
  title: '會員中心 | 蒔栽',
  bodyAttrs: {
    class: 'member'
  }
})

definePageMeta({
  middleware: 'check-member'
})
</script>

<template>
  <div class="main-wrapper">
    <div class="member-center">
      <div class="outline">
        <p class="title">會員中心</p>
      </div>
      <div class="container">
        <aside class="aside">
          <div class="wrapper">
            <p class="title">歡迎回來 {{ memberStore.profile.name }}</p>
            <ul class="link">
              <li>
                <NuxtLink to="/member/center">會員資訊</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/member/center/favorite">我的最愛</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/member/center/order">訂單列表</NuxtLink>
              </li>
            </ul>
            <BaseButton :type="'button'" :text="'登出'" @to-click="logout" />
          </div>
        </aside>
        <div class="content">
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.member-center
  padding: 120px 60px 100px
  &::before
    position: absolute
    top: 0
    left: 0
    z-index: -1
    display: block
    background-image: linear-gradient(rgba($yellow, .2), rgba($yellow, 0))
    width: 100%
    height: 600px
    pointer-events: none
    content: ''
  .outline
    padding-top: 130px
    text-align: center
    .title
      font-size: px(60)
      font-family: $serif
      font-weight: 700
  .container
    margin: 130px auto 0
    display: flex
    align-items: flex-start
    justify-content: center
    gap: 30px
    max-width: 1000px
    width: 100%
  .aside
    flex-shrink: 0
    width: 200px
    .wrapper
    .link
      margin: 20px 0
      display: inline-block
      li
        padding: 20px 0
        &:not(:last-child)
          border-bottom: 1px solid $gray
  .content
    flex: 1
    width: 100%
</style>
