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
  },
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

const collapseState = ref(props.open ? true : false)
</script>

<template>
  <li>
    <div class="placeholder" @click="collapseState = !collapseState">
      <p class="tag">{{ props.name }}</p>
      <div class="icon">
        <Icon v-if="!collapseState" name="ri:add-fill" size="28" />
        <Icon v-else name="ri:subtract-fill" size="28" />
      </div>
    </div>
    <div v-show="collapseState" class="list">
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
    </div>
  </li>
</template>
