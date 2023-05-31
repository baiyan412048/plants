<script setup>
const props = defineProps({
  color: {
    type: String,
    default() {
      return 'black'
    }
  },
  title: {
    type: String,
    default() {
      return ''
    }
  },
  image: {
    type: Object,
    default() {
      return {}
    }
  }
})

const fontColor = ref(props.color)
</script>

<template>
  <section class="common-banner" :class="fontColor">
    <picture>
      <source :srcset="props.image.mobile" media="(max-width: 767px)" />
      <nuxt-img :src="props.image.desktop" loading="lazy" />
    </picture>
    <div class="container">
      <slot name="breadcrumbs"></slot>
      <h1 class="title">{{ props.title }}</h1>
      <slot name="catalog"></slot>
    </div>
  </section>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.common-banner
  position: relative
  z-index: 0
  width: 100%
  height: 600px
  &.black
    color: $black
  &.white
    color: #fff
  picture
    border-radius: 0 0 30px 30px
    overflow: hidden
    img
      position: absolute
      z-index: -1
      top: 0
      left: 0
      width: 100%
      height: 100%
      object-fit: cover
      border-radius: 0 0 30px 30px
  .container
    padding: 160px 60px 60px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    width: 100%
    height: 100%
    .title
      margin-top: auto
      font-size: px(60)
      font-family: $serif
      font-weight: 700
</style>
