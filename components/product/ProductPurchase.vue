<script setup>
const props = defineProps({
  purchase: {
    type: Object,
    default() {
      return {}
    }
  }
})

const emit = defineEmits(['togglePurchase'])
</script>

<template>
  <div class="product-purchase" @click.prevent="$emit('togglePurchase')">
    <div class="photo">
      <img :src="props.purchase.image" alt="" />
    </div>
    <div class="content">
      <p class="title">{{ props.purchase.title }}</p>
      <p class="dep">{{ props.purchase.dep }}</p>
      <p class="price">NT ${{ props.purchase.price.toLocaleString() }}</p>
    </div>
    <div class="checkbox" :class="{ selected: props.purchase.selected }">
      <Icon v-if="props.purchase.selected" name="ri:check-fill" size="20" />
      <Icon v-else name="ri:add-fill" size="20" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.product-purchase
  padding: 20px
  display: flex
  align-items: center
  gap: 20px
  cursor: pointer
  &:not(:last-child)
    border-bottom: 1px solid $gray
  .photo
    align-self: flex-start
    flex-shrink: 0
    position: relative
    width: 80px
    height: 80px
    img
      position: absolute
      top: 0
      left: 0
      border-radius: 8px
      width: 100%
      height: 100%
      object-fit: cover
  .content
    line-height: 1.6
  .title
    margin-bottom: 5px
  .dep
    margin-bottom: 5px
    color: $gray
    font-size: px(14)
    line-height: 1.4
    white-space: pre-wrap
  .checkbox
    margin-left: auto
    display: flex
    align-items: center
    justify-content: center
    border: 1px solid $gray
    border-radius: 5px
    width: 30px
    height: 30px
    &.selected
      border: none
      background-color: $green
      svg
        filter: brightness(0) invert(1)
</style>
