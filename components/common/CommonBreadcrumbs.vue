<script setup>
const props = defineProps({
  breadcrumbs: {
    type: Object,
    default() {
      return {}
    }
  }
})
</script>

<template>
  <ul class="common-breadcrumbs">
    <li v-for="(obj, index) in props.breadcrumbs" :key="index">
      <NuxtLink v-if="obj.href" :to="obj.href">{{ obj.name }}</NuxtLink>
      <p v-else>{{ obj.name }}</p>
    </li>
  </ul>
</template>

<style lang="sass">
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.common-breadcrumbs
  padding: 8px 20px
  display: flex
  align-items: center
  border-radius: 500px
  background-color: #fff
  font-size: px(14)
  line-height: 1.2
  li
    display: flex
    align-items: center
    &:not(:last-child)
      &::after
        margin: 0 10px
        display: block
        border-radius: 500px
        background-color: $gray
        width: 4px
        height: 4px
        content: ''
  a
    color: $gray
    transition: color .2s
    +hover
      color: $black
  p
    color: $black
    cursor: default
</style>
