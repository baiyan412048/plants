<script setup>
const props = defineProps({
  catalog: {
    type: Array,
    default() {
      return []
    }
  },
  activeCatalog: {
    type: String,
    default() {
      return '全部類別'
    }
  }
})
</script>

<template>
  <ul class="common-catalog">
    <li
      v-for="(obj, index) in props.catalog"
      :key="index"
      :class="{ active: obj.name == props.activeCatalog }"
    >
      <NuxtLink v-if="obj.href" :to="obj.href">{{ obj.name }}</NuxtLink>
      <p v-else>{{ obj.name }}</p>
    </li>
  </ul>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.common-catalog
  margin-top: 60px
  display: flex
  align-items: center
  gap: 30px
  li
    position: relative
    z-index: 0
    cursor: pointer
    &::before
      position: absolute
      left: 50%
      bottom: -5px
      z-index: -1
      transform: translate3d(-50%, 0, 0)
      display: block
      border-radius: 2px
      background-color: $yellow
      width: 0
      height: 10px
      transition: width .2s
      content: ''
    &.active
      &::before
        width: 100%
    +hover
      &::before
        width: 100%
  a
    padding: 0 10px
</style>
