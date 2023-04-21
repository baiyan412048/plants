<script setup>
useHead({
  bodyAttrs: {
    class: 'news'
  }
})

const title = ref('最新消息')

const image = ref({
  desktop: '~/assets/image/article/banner_1920x600.jpg',
  mobile: ''
})

const breadcrumbs = reactive([
  {
    name: '首頁',
    href: '/'
  },
  {
    name: '最新消息',
    href: '/news'
  },
  {
    name: '全部類別'
  }
])

const allCatalog = reactive([
  {
    name: '全部類別',
    href: '/news'
  },
  {
    name: '營業日期',
    href: '/news/營業日期'
  },
  {
    name: '實體店面',
    href: '/news/實體店面'
  },
  {
    name: '線上購物',
    href: '/news/線上購物'
  },
  {
    name: '展覽介紹',
    href: '/news/展覽介紹'
  },
  {
    name: '優惠資訊',
    href: '/news/優惠資訊'
  }
])
</script>

<template>
  <div class="main-wrapper">
    <CommonBanner :title="title" :image="image">
      <template #breadcrumbs>
        <CommonBreadcrumbs :breadcrumbs="breadcrumbs" />
      </template>
      <template #catalog>
        <CommonCatalog :catalog="allCatalog" />
      </template>
    </CommonBanner>
    <div class="news-wrapper">
      <NuxtPage />
    </div>
  </div>
</template>

<style leng="sass" src="@/assets/page/news.sass"></style>
