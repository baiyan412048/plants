<script setup>
import { useDateFormat } from '@vueuse/core'
import { useMember } from '@/stores/member'

// 會員資料 store
const memberStore = useMember()
// 會員資料 method
const { getDetailProfile, logout } = memberStore
const { data } = await getDetailProfile(memberStore.profile.id)
const profile = computed(() => data.value.data)

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
  <div class="order-list">
    <p class="subtitle">訂單列表</p>
    <template v-if="profile?.order?.length">
      <ul>
        <li v-for="(item, key) in profile.order" :key="key" class="item">
          <NuxtLink :to="`/member/center/${item._id}`">
            <!-- <pre>{{ item }}</pre> -->
            <div class="date">
              <p class="sub">訂購日期</p>
              <p>{{ useDateFormat(item.createdAt, 'YYYY-MM-DD').value }}</p>
            </div>
            <div class="product">
              <p class="sub">商品名稱</p>
              <ul>
                <li v-for="(obj, index) in item.products" :key="index">
                  <p>{{ obj.name }}</p>
                </li>
              </ul>
            </div>
            <div class="price">
              <p class="sub">付款金額</p>
              <p>NT ${{ item.price.total.toLocaleString() }}</p>
            </div>
            <div class="payment">
              <p class="sub">付款方式</p>
              <p>{{ payment(item.bill.payment) }}</p>
            </div>
            <div class="state">
              <p class="sub">付款狀態</p>
              <p>{{ item.bill.state ? '付款成功' : '付款失敗' }}</p>
            </div>
            <div class="shipping">
              <p class="sub">配送方式</p>
              <p>{{ shipping(item.shipping.type) }}</p>
            </div>
            <div class="state">
              <p class="sub">配送狀態</p>
              <p>{{ item.shipping.state }}</p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </template>
    <BaseNoResult v-else>
      <p>目前無任何訂單，<NuxtLink to="/product">前往購買</NuxtLink></p>
    </BaseNoResult>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.order-list
  .subtitle
    margin-bottom: 60px
    font-size: px(20)
    font-weight: 700
  .item
    &:not(:last-child)
      margin-bottom: 20px
    a
      padding: 20px
      display: flex
      gap: 20px
      border-radius: 5px
      border: 1px solid $green_fluorescent
      line-height: 1.6
    .sub
      margin-bottom: 8px
      color: rgba($black, .6)
      font-size: px(12)
      line-height: 1.2
    .product
      flex: 1
      width: 100%
</style>
