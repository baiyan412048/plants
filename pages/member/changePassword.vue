<script setup>
import { useMember } from '@/stores/member'

// 會員資料 store
const memberStore = useMember()
// 會員資料 method
const { getDetailProfile, putDetailProfile, toLogout } = memberStore
const { data, refresh } = await getDetailProfile(memberStore.profile.id)
const profile = computed(() => data.value.data)

// 密碼儲存
const password = reactive({
  old: '',
  new: '',
  confirm: ''
})

// 錯誤訊息
const errorMessage = ref('')

const submitForm = async () => {
  if (profile.value.password !== password.old) {
    errorMessage.value = '舊密碼輸入錯誤'
    return
  }

  if (password.new !== password.confirm) {
    errorMessage.value = '確認新密碼與新密碼不同'
    return
  }

  const postData = { id: profile.value._id, password: password.new }

  await putDetailProfile(postData)
  // 登出
  toLogout()
  // 導回登入畫面
  navigateTo('/member/login')
}
</script>

<template>
  <div class="main-wrapper">
    <div class="forget-wrapper">
      <div class="outline">
        <p class="title">更換密碼</p>
      </div>
      <form class="form" @submit.prevent="submitForm">
        <div class="full">
          <label for="oldPassword">舊密碼</label>
          <input
            id="oldPassword"
            v-model="password.old"
            type="password"
            placeholder="請輸入姓名"
            required
          />
        </div>
        <div class="full">
          <label for="newPassword">新密碼</label>
          <input
            id="newPassword"
            v-model="password.new"
            type="password"
            placeholder="請輸入電子郵件"
            required
          />
        </div>
        <div class="full">
          <label for="confirmPassword">新密碼確認</label>
          <input
            id="confirmPassword"
            v-model="password.confirm"
            type="password"
            placeholder="請輸入密碼"
            required
          />
        </div>
        <p v-if="errorMessage !== ''" class="error">{{ errorMessage }}</p>
        <div class="button-group">
          <BaseButton :type="'submit'" :text="'更換密碼'" />
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.forget-wrapper
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
    max-width: 400px
    width: 100%
    gap: 20px
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
  .error
    width: 100%
    color: $red
    font-size: px(14)
    text-align: center
</style>
