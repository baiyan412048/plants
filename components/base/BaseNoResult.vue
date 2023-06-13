<script setup></script>

<template>
  <div class="no-result">
    <slot />
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.no-result
  margin: 0 auto
  padding: 60px 30px
  flex: 1
  display: flex
  align-items: center
  justify-content: center
  border-radius: 8px
  border: 1px solid $green_fluorescent
  max-width: 1000px
  width: 100%
  min-height: 100%
</style>
