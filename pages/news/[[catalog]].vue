<script setup>
import { storeToRefs } from 'pinia'
import { useNewsListStore } from '@/stores/news'

useHead({
  bodyAttrs: {
    class: 'news'
  }
})

const route = useRoute()
const { catalog } = route.params

const newsStore = useNewsListStore()
const { getNewsOutlineData } = newsStore
const { newsActiveCatalog, newsOutlines } = storeToRefs(newsStore)

if (catalog) {
  newsActiveCatalog.value = catalog
}

onMounted(async () => {
  await getNewsOutlineData()
})
</script>

<template>
  <div>
    <div class="news-list">
      <ul>
        <li
          v-for="(item, key) in newsOutlines"
          v-show="
            newsActiveCatalog == '全部類別' ||
            newsActiveCatalog == item['catalog']['catalog']
          "
          :key="key"
        >
          <NewsCard :index="key" :news="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style leng="sass" src="@/assets/page/news.sass"></style>
