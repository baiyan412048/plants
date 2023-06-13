<script setup>
import { useMember } from '@/stores/member'

// 會員資料 store
const memberStore = useMember()
// 會員資料 method
const { getDetailProfile } = memberStore
const { data, refresh } = await getDetailProfile(memberStore.profile.id)
const profile = computed(() => data.value.data)
</script>

<template>
  <div class="favorite-list">
    <p class="subtitle">我的最愛</p>
    <template v-if="profile?.favorite?.length">
      <ul>
        <template v-for="(item, key) in profile.favorite" :key="key">
          <li>
            <ProductCard :index="key" :product="item" :favorite="true" />
          </li>
        </template>
      </ul>
    </template>
    <BaseNoResult v-else>
      <p>目前沒有任何商品加到我的最愛</p>
    </BaseNoResult>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.favorite-list
  .subtitle
    margin-bottom: 60px
    font-size: px(20)
    font-weight: 700
  ul
    display: flex
    flex-wrap: wrap
    gap: 60px
  li
    width: calc((100% - 60px * 2) / 3)
  +rwdmax(768)
    ul
      gap: 40px
    li
      width: calc((100% - 40px * 2) / 3)
  +rwdmax(767)
    .subtitle
      margin-bottom: 20px
    li
      width: 100%
</style>
