<script setup>
import { useToast } from '@/stores/toast'
// 通知 store
const toastStore = useToast()
</script>

<template>
  <div id="__layout">
    <NuxtLoadingIndicator />
    <BaseNavbar />
    <main>
      <BaseToastGroup>
        <BaseToastItem
          v-for="(item, key) in toastStore.toastBag"
          :key="key"
          :item="item"
        />
      </BaseToastGroup>
      <NuxtPage />
    </main>
    <BaseFooter />
  </div>
</template>
