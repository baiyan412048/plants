<script setup>
import { useMember } from '@/stores/member'

// 會員資料 store
const memberStore = useMember()
// 會員資料 method
const { toRegister } = memberStore

const profileTemp = reactive({
  name: '陳聖元',
  email: 'A0980381643@gmail.com',
  password: 'aaaa0000',
  phone: '0980381643',
  address: '台中市潭子區潭興路二段339巷10號',
  birthday: '1995-02-14'
})

const submitForm = () => {
  const postData = { ...profileTemp }
  toRegister(postData)
  navigateTo('/member/login')
}

useHead({
  title: '註冊會員 | 蒔栽',
  bodyAttrs: {
    class: 'member'
  }
})
</script>

<template>
  <div class="main-wrapper">
    <div class="login-wrapper">
      <div class="outline">
        <p class="title">註冊會員</p>
      </div>
      <form class="form" @submit.prevent="submitForm">
        <div class="half">
          <label for="name">姓名</label>
          <input
            id="name"
            v-model="profileTemp.name"
            type="text"
            placeholder="請輸入姓名"
            required
          />
        </div>
        <div class="half">
          <label for="email">電子郵件</label>
          <input
            id="email"
            v-model="profileTemp.email"
            type="email"
            placeholder="請輸入電子郵件"
            required
          />
        </div>
        <div class="half">
          <label for="password">密碼</label>
          <input
            id="password"
            v-model="profileTemp.password"
            type="password"
            placeholder="請輸入密碼"
            required
          />
        </div>
        <div class="half">
          <label for="confirm_password">確認密碼</label>
          <input
            id="confirm_password"
            type="password"
            placeholder="請輸入確認密碼"
            required
          />
        </div>
        <div class="half">
          <label for="phone">手機</label>
          <input
            id="phone"
            v-model="profileTemp.phone"
            type="tel"
            placeholder="請輸入手機"
            pattern="[0-9]+"
            required
          />
        </div>
        <div class="half">
          <label for="birthday">生日</label>
          <input
            id="birthday"
            v-model="profileTemp.birthday"
            type="date"
            placeholder="請輸入生日"
            required
          />
        </div>
        <div class="full">
          <label for="address">地址</label>
          <input
            id="address"
            v-model="profileTemp.address"
            type="text"
            placeholder="請輸入地址"
            required
          />
        </div>
        <div class="button-group">
          <BaseButton :type="'submit'" :text="'確認註冊'" />
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.login-wrapper
  padding: 120px 60px 200px
  position: relative
  z-index: 0
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
      font-size: px(32)
      font-family: $serif
      font-weight: 700
      line-height: 1.2
  .form
    margin: 60px auto 0
    display: flex
    align-items: center
    flex-wrap: wrap
    gap: 20px
    max-width: 800px
    width: 100%
    .half
      width: calc((100% - 20px) / 2)
    .full
      width: 100%
    label,
    input
      display: block
    label
      margin-bottom: 10px
      font-size: px(16)
      line-height: 1.2
    input
      padding: 10px
      border-radius: 8px
      border: 1px solid $gray
      width: 100%
      font-size: px(14)
      font-family: $sans
      &::placeholder
        letter-spacing: normal
      &[type="password"]
        letter-spacing: 3px
    .button-group
      margin: 50px auto 0
      display: flex
      align-items: center
      justify-content: center
      gap: 20px
</style>
