<template>
  <nav class="navbar">
    <div class="container">
      <NuxtLink class="logo" to="/">
        <img src="/LOGO.svg" alt="" />
      </NuxtLink>
      <ul class="list">
        <li>
          <NuxtLink to="/news">最新消息</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/article">文章專欄</NuxtLink>
        </li>
        <li>
          <p>產品</p>
        </li>
      </ul>
      <div class="member">
        <span>登入</span>
        <span>購物車</span>
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

  .logo
    display: block

  .list
    margin: 0 auto
    display: flex
    align-items: center
    gap: 20px

  .member
    display: flex
    align-items: center
    font-size: px(14)
    font-weight: 700
    gap: 10px
</style>
