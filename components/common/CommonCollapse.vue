<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default() {
      return false
    }
  },
  name: {
    type: String,
    default() {
      return ''
    }
  }
})

const collapseState = ref(false)

onMounted(() => {
  collapseState.value = props.open && !useDeviceDetector() ? true : false
})
</script>

<template>
  <div class="common-collapse">
    <div class="collapse-block" @click="collapseState = !collapseState">
      <p class="tag">{{ props.name }}</p>
      <div class="icon">
        <Icon v-if="!collapseState" name="ri:add-fill" size="28" />
        <Icon v-else name="ri:subtract-fill" size="28" />
      </div>
    </div>
    <div v-show="collapseState" class="collapse-target">
      <slot name="target"></slot>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.collapse-block
  padding: 20px 0
  display: flex
  align-items: center
  justify-content: space-between
  border-bottom: 1px solid $gray
  cursor: pointer
  .tag
    display: flex
    align-items: center
    gap: 15px
    &::before
      display: block
      background-color: $green
      width: 5px
      height: 25px
      content: ''
.collapse-target
  padding: 10px 0
  border-bottom: 1px solid $gray
</style>
