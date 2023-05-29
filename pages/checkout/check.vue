<script setup>
import { useOrder } from '@/stores/order'
import { usePayment } from '@/stores/payment'
import { useCart } from '@/stores/cart'

const route = useRoute()
const { query } = route

// 購物車 store
const cartStore = useCart()
// 購物車 method
const { resetCartList } = cartStore

// 訂單 store
const orderStore = useOrder()
// 訂單 method
const { postMemberOrder } = orderStore

// 付款 store
const paymentStore = usePayment()
// 訂單 method
const { postPaymentConfirm } = paymentStore

// 確認付款狀態
const { data } = await postPaymentConfirm({
  transactionId: query.transactionId,
  amount: paymentStore.amount
})
const confirm = computed(() => data.value.data)
// post order info
const postData = {
  ...paymentStore.order
}
// 付款成功
if (confirm.value.returnCode == '0000') {
  postData.bill.state = true
  const { data: order } = await postMemberOrder(postData)
  resetCartList()
  navigateTo(`/checkout/success?orderId=${order.value.data._id}`)
} else {
  // 失敗
  navigateTo('/checkout/fail')
}
</script>

<template>
  <div>
    <p class="title">確認付款中，請勿關閉網頁</p>
  </div>
</template>

<style lang="sass" scoped>
.title
  font-size: px(32)
  font-weight: 700
  font-family: $serif
  text-align: center
</style>
