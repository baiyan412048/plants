<script setup>
const props = defineProps({
  value: {
    type: Number,
    default() {
      return 1
    }
  },
  stock: {
    type: Number,
    default() {
      return 1
    }
  }
})

const emit = defineEmits(['plus', 'minus'])

const min = ref(1)
const max = ref(props.stock)

const input = (event) => {
  if (event.target.value <= min.value) {
    event.target.value = min.value
  }
  if (event.target.value >= max.value) {
    event.target.value = max.value
  }
}
</script>

<template>
  <div class="count-group">
    <div
      class="block"
      :class="props.value == 1 ? 'disabled' : ''"
      @click.prevent="$emit('minus')"
    >
      <Icon name="ri:subtract-fill" size="20" />
    </div>
    <input
      class="number"
      type="number"
      :value="props.value"
      :min="min"
      :max="max"
      @input.prevent="input"
    />
    <div
      class="block"
      :class="props.value == props.stock ? 'disabled' : ''"
      @click.prevent="$emit('plus')"
    >
      <Icon name="ri:add-fill" size="20" />
    </div>
  </div>
</template>

<style lang="sass">
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.count-group
  display: flex
  align-items: center
  gap: 10px
  .block
    display: flex
    align-items: center
    justify-content: center
    border-radius: 5px
    border: 1px solid $gray
    background: none
    width: 30px
    height: 30px
    cursor: pointer
    &.disabled
      background-color: $gray
      opacity: .7
      pointer-events: none
      cursor: not-allowed
  .number
    border-radius: 5px
    border: 1px solid $gray
    width: 60px
    height: 30px
    font-size: px(16)
    font-family: $sans
    line-height: 1.6
    text-align: center
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button
      -webkit-appearance: none
      margin: 0
    &[type=number]
      -moz-appearance: textfield
</style>
