<script setup>
import { useOrder } from '@/stores/order'
import { useMember } from '@/stores/member'

const route = useRoute()
const { query } = route

if (!query.orderId) {
  navigateTo('/product')
}

// 會員資料 store
const memberStore = useMember()
// 會員資料 method
const { getDetailProfile } = memberStore
const { data: profile } = await getDetailProfile(memberStore.profile.id)

// 訂單 store
const orderStore = useOrder()
// 訂單 method
const { getMemberOrder } = orderStore
const { data } = await getMemberOrder(query.orderId)
const order = computed(() => data.value.data)

// if (!profile.value.data.order.includes(query.orderId)) {
//   navigateTo('/product')
// }

const payment = (value) => {
  if (value == 'linepay') return 'Line pay'
  if (value == 'shop') return '來店付款'
}

const shipping = (value) => {
  if (value == 'delivery') return '貨運宅配'
  if (value == 'selfPickUp') return '來店自取'
}

useHead({
  title: `結帳流程 | 蒔栽`,
  bodyAttrs: {
    class: 'checkout'
  }
})

definePageMeta({
  middleware: ['check-member']
})
</script>

<template>
  <div class="main-wrapper">
    <div class="checkout-wrapper">
      <div class="container">
        <p class="title">已成功送出訂單</p>
        <div class="group">
          <div class="block bill">
            <p class="tip">帳單資訊</p>
            <ul>
              <li><span>姓名 :</span> {{ order.bill.name }}</li>
              <li><span>手機 :</span> {{ `0${order.bill.phone}` }}</li>
              <li><span>電子郵件 :</span> {{ order.bill.email }}</li>
              <li><span>付款方式 :</span> {{ payment(order.bill.payment) }}</li>
              <li>
                <span>付款狀態 :</span
                >{{ order.bill.state ? '付款成功' : '尚未付款' }}
              </li>
            </ul>
          </div>
          <div class="block shipping">
            <p class="tip">配送資訊</p>
            <ul>
              <li><span>姓名 :</span>{{ order.shipping.name }}</li>
              <li><span>手機 :</span>{{ `0${order.shipping.phone}` }}</li>
              <li><span>電子郵件 :</span>{{ order.shipping.email }}</li>
              <li>
                <span>地址 :</span>{{ order.shipping.zone }} -
                {{ order.shipping.address }}
              </li>
              <li>
                <span>配送方式 :</span> {{ shipping(order.shipping.type) }}
              </li>
              <li><span>備註 :</span>{{ order.shipping.remark }}</li>
            </ul>
          </div>
        </div>
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
  &::before
    position: absolute
    top: 0
    left: 0
    z-index: -1
    display: block
    background-image: linear-gradient(rgba($green_light, .2), rgba($green_light, 0))
    width: 100%
    height: 600px
    pointer-events: none
    content: ''
  .container
    padding-top: 130px
    margin: 0 auto
    max-width: 900px
    .title
      margin-bottom: 60px
      font-size: px(32)
      font-weight: 700
      font-family: $serif
      text-align: center
    .group
      display: flex
      gap: 30px
    .block
      padding: 20px
      border-radius: 8px
      border: 1px solid $green
      line-height: 1.6
      width: 50%
      .tip
        margin-bottom: 10px
        font-size: px(18)
      li
        &:not(:last-child)
          margin-bottom: 10px
      span
        display: block
        font-size: px(12)
  +rwdmax(767)
    padding: 80px 40px 60px
    .container
      padding-top: 60px
      .group
        flex-direction: column
      .block
        width: 100%
</style>
