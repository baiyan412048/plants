<script setup>
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {}
    }
  }
})
</script>

<template>
  <div class="toast-item">
    <div class="mark" :class="props.item.state">
      <Icon v-if="props.item.state == 'success'" name="Success" size="24" />
      <Icon v-if="props.item.state == 'notice'" name="Notice" size="24" />
      <Icon v-if="props.item.state == 'error'" name="Error" size="24" />
    </div>
    <div class="content">
      <p class="title">{{ props.item.title }}</p>
      <p v-if="props.item.text" class="text">{{ props.item.text }}</p>
    </div>
    <div class="button-group">
      <template v-if="props.item?.button?.length">
        <template v-for="(button, key) in props.item.button" :key="key">
          <NuxtLink v-if="button.type == 'a'" class="button" :to="button.to">{{
            button.text
          }}</NuxtLink>
        </template>
      </template>
      <div v-else class="close">
        <Icon name="ri:close-fill" size="24" />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.toast-item
  padding: 10px 15px
  display: flex
  align-items: center
  gap: 10px
  border-radius: 10px
  background-color: rgba(#fff, .8)
  box-shadow: 0px 0 20px -5px rgb($black, .5)
  backdrop-filter: blur(5px)
  width: 300px
  height: 80px
  overflow: hidden
  .mark
    position: relative
    z-index: 1
    display: flex
    align-items: center
    justify-content: center
    width: 30px
    height: 30px
    --bk-color: #{red($green_fluorescent), green($green_fluorescent), blue($green_fluorescent)}
    &.error
      --bk-color: #{red($red), green($red), blue($red)}
    &.notice
      --bk-color: #{red($yellow), green($yellow), blue($yellow)}
    &::before
      position: absolute
      z-index: -1
      top: 50%
      left: 50%
      transform: translate3d(-50%, -50%, 0) scale(8)
      display: block
      background: radial-gradient(50% 50% at 50% 50%, rgba(var(--bk-color), 0.12) 0%, rgba(var(--bk-color), 0) 100%)
      width: 100%
      height: 100%
      pointer-events: none
      content: ''
  .content
    flex: 1
    width: 100%
  .title
    font-weight: 700
  .text
    margin-top: 4px
    font-size: px(14)
  .button-group
    flex-shrink: 0
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    gap: 10px
  .button
    font-size: px(14)
    font-weight: 700
    text-decoration: underline
    cursor: pointer
  .close
    display: flex
    align-items: center
    justify-content: center
    border-radius: 5px
    width: 30px
    height: 30px
    cursor: pointer
    transition: background-color .2s
    +hover
      background-color: rgba(#fff, .4)
</style>
