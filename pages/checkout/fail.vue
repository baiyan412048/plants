<script setup>
useHead({
  title: `結帳流程 | 蒔栽`,
  bodyAttrs: {
    class: 'checkout'
  }
})

definePageMeta({
  middleware: 'check-member'
})
</script>

<template>
  <div class="main-wrapper">
    <div class="checkout-wrapper">
      <div class="container">
        <p>付款失敗</p>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.checkout-wrapper
  padding: 120px 60px 100px
  .container
    padding-top: 130px
    margin: 0 auto
    display: flex
    justify-content: center
    gap: 30px
    max-width: 1280px
    text-align: left
  +rwdmax(767)
    padding: 80px 40px 60px
    .container
      padding-top: 80px
</style>
