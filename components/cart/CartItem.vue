<script setup>
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {}
    }
  },
  inCheckoutPage: {
    type: Boolean,
    default() {
      return false
    }
  }
})

const emit = defineEmits(['plus', 'minus', 'removeItem', 'removePurchase'])

const onPlus = () => {
  emit('plus', props.item)
}
const onMinus = () => {
  emit('minus', props.item)
}
</script>

<template>
  <div class="cart-item">
    <div class="product">
      <div class="photo">
        <nuxt-img :src="props.item.image" loading="lazy" />
      </div>
      <div class="content">
        <p class="title">{{ props.item.title }}</p>
        <p class="catalog">{{ props.item.catalog }}</p>
        <div v-if="props.inCheckoutPage" class="number">
          數量: {{ props.item.count }}
        </div>
        <div v-else class="control">
          <CommonProductCount
            :value="props.item.count"
            :stock="props.item.stock"
            @plus="onPlus"
            @minus="onMinus"
          />
          <div class="delete" @click="$emit('removeItem', props.item.id)">
            <Icon name="Delete" size="20" />
          </div>
        </div>
      </div>
      <p class="price">
        NT ${{
          (parseInt(props.item.price) * props.item.count).toLocaleString()
        }}
      </p>
    </div>
    <div v-if="props.item.purchase.length" class="purchase">
      <p class="tip">加購品項</p>
      <div
        v-for="(purchase, key) in props.item.purchase"
        :key="key"
        class="item"
      >
        <div
          v-if="!props.inCheckoutPage"
          class="delete"
          @click="$emit('removePurchase', props.item.id, purchase._id)"
        >
          <Icon name="Delete" size="20" />
        </div>
        <div class="photo">
          <nuxt-img :src="purchase.image" loading="lazy" />
        </div>
        <div class="content">
          <p class="title">{{ purchase.title }}</p>
          <p class="dep">{{ purchase.dep }}</p>
        </div>
        <p class="price">NT ${{ purchase.price.toLocaleString() }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.cart-item
  .delete
    display: flex
    align-items: center
    justify-content: center
    border-radius: 5px
    border: 1px solid $gray
    width: 30px
    height: 30px
    cursor: pointer
  .product
    padding: 30px 20px
    display: flex
    align-items: center
    gap: 30px
    .photo
      position: relative
      width: 120px
      height: 120px
      img
        position: absolute
        top: 0
        left: 0
        border-radius: 8px
        width: 100%
        height: 100%
        object-fit: cover
    .content
      flex: 1
      width: 100%
    .title
      font-size: px(24)
      line-height: 1.2
    .catalog
      margin-top: 10px
      color: $gray
      line-height: 1.2
    .control
      margin-top: 30px
      display: flex
      align-items: center
      gap: 30px
    .number
      margin-top: 30px
      line-height: 1.2
    .price
      font-size: px(20)
      line-height: 1.2
      flex-shrink: 0
  .purchase
    padding: 10px 20px
    .tip
      line-height: 1.2
    .item
      padding: 20px 0
      display: flex
      align-items: center
      gap: 30px
    .photo
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
      flex: 1
      width: 100%
    .title
      font-size: px(20)
      line-height: 1.2
    .dep
      margin-top: 10px
      color: $gray
      font-size: px(14)
      line-height: 1.2
      white-space: pre-wrap
    .price
      line-height: 1.2
      flex-shrink: 0
  +rwdmax(767)
    .product
      padding: 10px
      flex-wrap: wrap
      align-items: flex-start
      gap: 20px
      .photo
        margin-right: 100px
        width: 80px
        height: 80px
    .purchase
      padding: 10px
      .item
        position: relative
        gap: 20px
      .delete
        position: absolute
        top: 10px
        left: -10px
        z-index: 1
        background-color: #fff
</style>
