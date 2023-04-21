<script setup>
const props = defineProps({
  item: {
    type: String,
    default() {
      return ''
    }
  }
})

const item = computed(() => props.item.outline)
</script>

<template>
  <NuxtLink
    class="common-others"
    :to="`/article/${item.catalog.catalog}/detail/${item.title}`"
  >
    <div class="group">
      <p class="date">
        {{ useDateFormat(item.updatedAt, 'YYYY.MM.DD').value }}
      </p>
      <span class="tag">{{ item.catalog.catalog }}</span>
    </div>
    <p class="title">{{ item.title }}</p>
  </NuxtLink>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.common-others
  padding: 60px 80px
  position: relative
  z-index: 1
  display: block
  max-width: 480px
  width: 50%
  &:nth-child(2)
    &::before
      position: absolute
      top: 50%
      left: 0
      transform: translate3d(-50%, -50%, 0)
      display: block
      background-color: $green_light
      width: 2px
      height: 115px
      content: ''
  &::after
    position: absolute
    top: 60px
    left: 50%
    z-index: -1
    transform: translate3d(-50%, 0, 0)
    display: block
    color: $pink
    font-size: px(100)
    font-weight: 700
    opacity: 0
    transition: opacity .4s
    content: 'OTHER'
  +hover
    &::after
      opacity: .3

  .group
    display: flex
    align-items: center
    justify-content: center
    gap: 20px
  .date
    font-size: px(14)
    font-weight: 700
    line-height: 1.2
  .tag
    display: block
    padding: 10px 20px
    border-radius: 500px
    background-color: $green_light
    font-size: px(14)
    font-weight: 700
    line-height: 1.2
  .title
    margin-top: 10px
    font-size: px(24)
    line-height: 1.5
    letter-spacing: 1px
    text-align: center
</style>
