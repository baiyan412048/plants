<script setup></script>

<template>
  <div class="toast-group">
    <slot />
  </div>
</template>

<style lang="sass" scoped>
.toast-group
  padding: 40px 20px
  position: fixed
  top: 0
  right: 0
  z-index: 10
  display: flex
  flex-direction: column
  gap: 20px
  pointer-events: none
</style>
