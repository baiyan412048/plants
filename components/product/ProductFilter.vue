<script setup>
const props = defineProps({
  format: {
    type: String,
    default() {
      return ''
    }
  },
  filter: {
    type: Object,
    default() {
      return {}
    }
  }
})

const emit = defineEmits(['updateFilter'])
</script>

<template>
  <ul>
    <li v-for="(item, key) in props.filter" :key="key" class="option">
      <label>
        <input
          type="checkbox"
          @change="$emit('updateFilter', $event.target.checked, item)"
        />
        <div class="checkbox">
          <Icon name="Checked" size="14" />
        </div>
        <p>{{ item[props.format] }}</p>
      </label>
    </li>
  </ul>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.option
  label
    padding: 10px
    position: relative
    display: flex
    align-items: center
    justify-content: space-between
    gap: 20px
    cursor: pointer
  input
    position: absolute
    opacity: 0
    pointer-events: none
    &:checked + .checkbox
      border: 2px solid $green
      svg
        display: block

.checkbox
  display: flex
  align-items: center
  justify-content: center
  border: 2px solid $black
  border-radius: 3px
  width: 20px
  height: 20px
  transition: border .2s
  svg
    display: none
</style>
