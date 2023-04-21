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
    <NuxtLink to="/">
      <div class="photo">
        <div class="inner">
          <p>Detail</p>
          <img src="~/assets/image/news/list_01_450x300.jpg" alt="" />
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
