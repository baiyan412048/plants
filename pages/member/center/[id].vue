<script setup>
import { useOrder } from '@/stores/order'

const route = useRoute()
const { params } = route

const router = useRouter()

const orderStore = useOrder()
const { getMemberOrder } = orderStore
const { data } = await getMemberOrder(params.id)
const order = computed(() => data.value.data)

const payment = (value) => {
  if (value == 'linepay') return 'Line pay'
  if (value == 'shop') return '來店付款'
}

const shipping = (value) => {
  if (value == 'delivery') return '貨運宅配'
  if (value == 'selfPickUp') return '來店自取'
}
</script>

<template>
  <div class="order-detail">
    <!-- <pre>{{ order }}</pre> -->
    <div class="header">
      <div class="back" @click="router.back">
        <Icon name="ri:arrow-left-line" size="20" />
      </div>
      <div class="date">
        <p class="sub">訂購日期</p>
        <p>{{ useDateFormat(order.createdAt, 'YYYY-MM-DD').value }}</p>
      </div>
      <div class="state">
        <p class="sub">付款狀態</p>
        <p>{{ order.bill.state ? '付款成功' : '付款失敗' }}</p>
      </div>
      <div class="state">
        <p class="sub">配送方式</p>
        <p>{{ shipping(order.shipping.type) }}</p>
      </div>
      <div class="state">
        <p class="sub">配送狀態</p>
        <p>{{ order.shipping.state }}</p>
      </div>
    </div>
    <div class="block bill">
      <ul>
        <li><span>姓名 :</span> {{ order.bill.name }}</li>
        <li><span>手機 :</span> {{ `0${order.bill.phone}` }}</li>
        <li><span>電子郵件 :</span> {{ order.bill.email }}</li>
        <li><span>付款方式 :</span> {{ payment(order.bill.payment) }}</li>
        <li>
          <span>付款狀態 :</span
          >{{ order.bill.state ? '付款成功' : '付款失敗' }}
        </li>
      </ul>
    </div>
    <div class="block shipping">
      <ul>
        <li><span>姓名 :</span>{{ order.shipping.name }}</li>
        <li><span>手機 :</span>{{ `0${order.shipping.phone}` }}</li>
        <li><span>電子郵件 :</span>{{ order.shipping.email }}</li>
        <li>
          <span>地址 :</span>{{ order.shipping.zone }} -
          {{ order.shipping.address }}
        </li>
        <li><span>備註 :</span>{{ order.shipping.remark }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.order-detail
  .header
    margin-bottom: 20px
    padding: 20px
    position: relative
    display: flex
    justify-content: center
    gap: 20px
    border-radius: 8px
    background-color: $green
    color: #fff
    text-align: center
    .back
      position: absolute
      top: 0
      left: 0
      transform: translate3d(-50%, -50%, 0)
      display: flex
      align-items: center
      justify-content: center
      box-shadow: 0px 0 20px -5px rgb($black, .5)
      border-radius: 500px
      background-color: #fff
      width: 30px
      height: 30px
      cursor: pointer
      svg
        color: $black
    .sub
      margin-bottom: 8px
      font-size: px(12)
      line-height: 1.2
  .block
    padding: 20px
    border-radius: 8px
    border: 1px solid $green
    line-height: 1.6
    &:not(:last-child)
      margin-bottom: 20px
    li
      &:not(:last-child)
        margin-bottom: 10px
    span
      display: block
      font-size: px(12)
</style>
