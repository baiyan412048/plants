<script setup>
const props = defineProps({
  type: {
    type: String,
    default() {
      return 'a'
    }
  },
  to: {
    type: String,
    default() {
      return 'javascript:;'
    }
  },
  text: {
    type: String,
    default() {
      return ''
    }
  }
})

const emit = defineEmits(['toClick'])
</script>

<template>
  <NuxtLink v-if="props.type == 'a'" class="base-button" :to="props.to">{{
    props.text
  }}</NuxtLink>
  <button
    v-else-if="props.type == 'submit'"
    class="base-button"
    type="submit"
    @click="$emit('toClick')"
  >
    {{ props.text }}
  </button>
  <button v-else class="base-button" type="button" @click="$emit('toClick')">
    {{ props.text }}
  </button>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.base-button
  padding: 0 20px
  display: flex
  align-items: center
  justify-content: center
  border: none
  border-radius: 8px
  background-color: $green
  height: 40px
  color: #fff
  font-size: px(14)
  font-family: $sans
  line-height: 1.2
  text-align: center
  cursor: pointer
  +hover
    outline: 3px solid $green_light
</style>
