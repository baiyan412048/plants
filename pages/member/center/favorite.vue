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
    <template v-if="profile?.favorite.length">
      <ul>
        <template v-for="(item, key) in profile.favorite" :key="key">
          <li
            v-if="
              (productActiveCatalog.catalog == '所有植物' ||
                productActiveCatalog.catalog == item.catalog.catalog) &&
              priceRange[0] <= item.price &&
              priceRange[1] >= item.price
            "
          >
            <ProductCard :index="key" :product="item" />
          </li>
        </template>
      </ul>
    </template>
    <div v-else class="no-result">
      <p>目前沒有任何商品加到我的最愛</p>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.favorite-list
  ul
    display: flex
    flex-wrap: wrap
    gap: 60px
  li
    width: calc((100% - 60px * 2) / 3)
  .no-result
    padding: 30px
    flex: 1
    display: flex
    align-items: center
    justify-content: center
    border-radius: 8px
    border: 1px solid $green_fluorescent
    max-width: 1000px
    width: 100%
    min-height: 100%
</style>
