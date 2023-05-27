<script setup>
import { useOrder } from '@/stores/order'

const route = useRoute()
const { query } = route

// 訂單 store
const orderStore = useOrder()
// 訂單 method
const { getMemberOrder } = orderStore

const { data } = await getMemberOrder(query.orderId)
const order = computed(() => data.value.data)

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
        <p>已成功付款</p>
        <pre>{{ order }}</pre>
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
    gap: 30px
    max-width: 1280px
</style>
