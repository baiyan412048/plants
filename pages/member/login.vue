<script setup>
import { useMember } from '@/stores/member'
import { useToast } from '@/stores/toast'

// 重新導向
const redirectTo = useState('redirectTo')

// 會員資料 store
const memberStore = useMember()
// 會員資料 method
const { toLogin } = memberStore

// 通知 store
const toastStore = useToast()
// 通知 method
const { addToast } = toastStore

const email = ref('A0980381643@gmail.com')
const password = ref('aaaa0000')

const notice = ref('')

const submitForm = async () => {
  const { error } = await toLogin(email.value, password.value)

  if (error.value?.data) {
    notice.value = error.value?.data
    // 訊息通知
    addToast({
      title: '登入失敗',
      text: error.value?.data,
      state: 'error'
    })
    return
  }

  // 清空錯誤提示訊息
  notice.value = ''

  // 訊息通知
  addToast({
    title: '登入成功',
    state: 'success'
  })
  // 導向前一頁 || 會員中心
  navigateTo(redirectTo.value ?? '/member/center')
}

useHead({
  title: '登入會員 | 蒔栽',
  bodyAttrs: {
    class: 'member'
  }
})

definePageMeta({
  middleware: 'logged-in-redirect'
})
</script>

<template>
  <div class="main-wrapper">
    <div class="login-wrapper">
      <div class="outline">
        <p class="title">登入會員</p>
      </div>
      <form class="form" @submit.prevent="submitForm">
        <div class="full">
          <label for="account">帳號</label>
          <input
            id="account"
            v-model="email"
            type="email"
            placeholder="請輸入電子郵件"
            required
          />
        </div>
        <div class="full">
          <label for="password">密碼</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="請輸入密碼"
            required
          />
        </div>
        <p class="notice">{{ notice }}</p>
        <div class="button-group">
          <BaseButton :type="'a'" :to="'/member/register'" :text="'註冊'" />
          <BaseButton :type="'submit'" :text="'登入'" />
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
    max-width: 500px
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
    .forget
      margin-top: -10px
      padding: 0 10px
      display: block
      width: 100%
      color: rgba($black, .7)
      font-size: px(14)
      line-height: 1.2
      text-decoration: underline
    .notice
      width: 100%
      color: $red
      font-size: px(14)
      line-height: 1.2
      text-align: center
    .button-group
      margin: 50px auto 0
      display: flex
      align-items: center
      justify-content: center
      gap: 20px
</style>
