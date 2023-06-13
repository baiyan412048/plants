<script setup></script>

<template>
  <div class="loading-block">
    <p>載入中</p>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.loading-block
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  min-height: 400px
  font-size: px(24)
  letter-spacing: 1px
</style>
