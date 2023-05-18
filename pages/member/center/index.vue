<script setup>
import { useDateFormat } from '@vueuse/core'
import { useMember } from '@/stores/member'
import { useToast } from '@/stores/toast'

// 會員資料 store
const memberStore = useMember()
// 會員資料 method
const { getDetailProfile, putDetailProfile } = memberStore
const { data, refresh } = await getDetailProfile(memberStore.profile.id)
const profile = computed(() => data.value.data)

const profileTemp = reactive({
  name: profile.value.name,
  email: profile.value.email,
  phone: profile.value.phone,
  address: profile.value.address,
  birthday: useDateFormat(profile.value.birthday, 'YYYY-MM-DD').value
})

// 通知 store
const toastStore = useToast()
// 通知 method
const { addToast } = toastStore

const submitForm = async () => {
  const postData = { id: profile.value._id, ...profileTemp }

  await putDetailProfile(postData)
  // 訊息通知
  addToast({
    title: '修改成功',
    state: 'success'
  })
  await refresh()
}
</script>

<template>
  <div class="profile-detail">
    <p class="subtitle">會員資訊</p>
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
        <BaseButton :to="'/member/changePassword'" :text="'更換密碼'" />
        <BaseButton :type="'submit'" :text="'儲存修改'" />
      </div>
    </form>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.profile-detail
  .subtitle
    margin-bottom: 60px
    font-size: px(20)
    font-weight: 700

  .form
    margin: 0 auto
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
