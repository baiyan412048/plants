<script setup>
import { useDateFormat } from '@vueuse/core'

const props = defineProps({
  news: {
    type: Object,
    default() {
      return {}
    }
  }
})
</script>

<template>
  <div class="news-card">
    <NuxtLink
      :to="`/news/${props.news.catalog.catalog}/detail/${props.news.title}`"
    >
      <div class="photo">
        <div class="inner">
          <p>Detail</p>
          <nuxt-img :src="props.news.image" loading="lazy" />
        </div>
        <span class="tag">{{ props.news.catalog.catalog }}</span>
      </div>
      <div class="content">
        <p class="date">
          {{ useDateFormat(props.news.updatedAt, 'YYYY.MM.DD').value }}
        </p>
        <p class="title">{{ props.news.title }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.news-card
  +hover
    .photo
      .inner
        &::after
          opacity: 1
      p
        opacity: 1
  .photo
    position: relative
    .inner
      position: relative
      border-radius: 8px
      overflow: hidden
      &::after
        position: absolute
        top: 0
        left: 0
        z-index: 1
        display: block
        background-color: rgba($green_light, .7)
        width: 100%
        height: 100%
        opacity: 0
        transition: opacity .4s
        content: ''
      &::before
        display: block
        padding-bottom: 66.6667%
        content: ''
    img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      object-fit: cover
      border-radius: 8px
    p
      +posCenter
      z-index: 2
      color: $green_dark
      font-size: px(20)
      font-weight: 700
      opacity: 0
      transition: opacity .4s
  .tag
    position: absolute
    bottom: -20px
    right: 15px
    transform: translateZ(0)
    z-index: 3
    display: block
    padding: 10px 20px
    border-radius: 500px
    background-color: $green_light
    font-size: px(14)
    font-weight: 700
    line-height: 1.2
  .content
    margin-top: 20px
    padding: 0 20px
  .date
    margin-bottom: 15px
    font-size: px(14)
    font-weight: 700
    line-height: 1.2
  .title
    font-size: px(24)
    line-height: 1.5
    letter-spacing: 1px
</style>
