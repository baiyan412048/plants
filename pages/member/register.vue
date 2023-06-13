<script setup>
import { useMember } from '@/stores/member'
import { useToast } from '@/stores/toast'

// 會員資料 store
const memberStore = useMember()
// 會員資料 method
const { toRegister } = memberStore

// 通知 store
const toastStore = useToast()
// 通知 method
const { addToast } = toastStore

const profileTemp = reactive({
  name: '',
  email: '',
  password: '',
  phone: '',
  city: '',
  zone: '',
  address: '',
  birthday: ''
})

// 縣市列表
const cityList = [
  '台北市',
  '基隆市',
  '新北市',
  '宜蘭縣',
  '桃園市',
  '新竹市',
  '新竹縣',
  '苗栗縣',
  '台中市',
  '彰化縣',
  '南投縣',
  '嘉義市',
  '嘉義縣',
  '雲林縣',
  '台南市',
  '高雄市',
  '澎湖縣',
  '金門縣',
  '屏東縣',
  '台東縣',
  '花蓮縣',
  '連江縣'
]

const submitForm = async () => {
  const postData = { ...profileTemp }
  postData.birthday = useDateFormat(postData.birthday, 'YYYY-MM-DD').value
  const { error } = await toRegister(postData)
  if (error.value?.data) {
    addToast({
      title: '已有相同帳號',
      text: error.value?.data,
      state: 'error'
    })
    return
  }
  // 訊息通知
  addToast({
    title: '註冊成功',
    state: 'success'
  })
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
        <div class="half">
          <label for="city">縣市</label>
          <select v-model="profileTemp.city" name="city">
            <option value="" selected disabled hidden>請選擇縣市</option>
            <option v-for="(item, key) in cityList" :key="key" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="half">
          <label for="zone">區碼</label>
          <input
            id="zone"
            v-model="profileTemp.zone"
            type="text"
            placeholder="請輸入區碼"
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
    input,
    select
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
  +rwdmax(1024)
    adding: 120px 40px 200px
  +rwdmax(767)
    adding: 80px 40px 100px
    .outline
      padding-top: 80px
    .form
      .half
        width: 100%
</style>
