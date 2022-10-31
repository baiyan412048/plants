<template>
  <div class="news-wrapper">
    <div class="outline">
      <h1>最新消息</h1>
    </div>
    <div class="catalog-group">
      <ul>
        <li>All</li>
      </ul>
    </div>
    <div class="news-list">
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script leng="ts" setup>
useHead({
  bodyAttrs: {
    class: 'news'
  }
})
</script>

<style leng="sass" src="@/assets/page/news.sass" scoped></style>
