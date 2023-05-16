<script setup>
import { useMember } from '@/stores/member'
import { useToast } from '@/stores/toast'

const props = defineProps({
  product: {
    type: Object,
    default() {
      return {}
    }
  },
  favorite: {
    type: Boolean,
    default() {
      return false
    }
  }
})

// 會員資料 store
const memberStore = useMember()
// 會員資料 method
const { addFavoriteProduct } = memberStore

// 通知 store
const toastStore = useToast()
// 會員資料 method
const { addToast } = toastStore

const onAddFavoriteProduct = async (product) => {
  const postData = {
    id: memberStore.profile.id,
    productId: props.product._id
  }

  const { data, error } = await addFavoriteProduct(postData)
  if (error.value?.data) {
    // 訊息通知
    addToast({
      title: '尚未登入會員',
      text: '請先登入會員',
      state: 'notice',
      button: [
        {
          type: 'a',
          to: '/member/login',
          text: '登入會員'
        }
      ]
    })
    return
  }
  // 訊息通知
  addToast({
    title: '已成功加入我的最愛',
    state: 'success'
  })
}

// 自動產生最新產品標籤
const newItemTagState = computed(() => {
  const target = new Date(props.product.updatedAt)
  const today = new Date()
  today.setMonth(today.getMonth() - 1)

  if (target > today) return true
  else return false
})
</script>

<template>
  <div class="product-card">
    <NuxtLink
      :to="`/product/${props.product.catalog.catalog}/detail/${props.product.title}`"
    >
      <div class="photo">
        <div class="inner">
          <p>Detail</p>
          <img :src="props.product.image" alt="" />
        </div>
        <div v-if="newItemTagState" class="tag">NEW</div>
      </div>
      <div class="content">
        <div class="info">
          <p class="title">{{ props.product.title }}</p>
          <div class="favorite" @click.prevent="onAddFavoriteProduct">
            <Icon v-if="!props.favorite" name="FavoriteLine" size="20" />
            <Icon v-else name="FavoriteFill" size="20" />
          </div>
        </div>
        <div class="detail">
          <p v-if="props.product.stock <= 0" class="stock">SOLD OUT</p>
          <div class="price">
            <p v-if="props.product?.discount?.length" class="delete">
              NT ${{ props.product.price.toLocaleString() }}
            </p>
            <p class="">NT ${{ props.product.price.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.product-card
  +hover
    .photo
      .inner
        &::after
          opacity: 1
      p
        opacity: 1
  .photo
    position: relative
    .inner
      position: relative
      border-radius: 8px
      overflow: hidden
      &::after
        position: absolute
        top: 0
        left: 0
        z-index: 1
        display: block
        background-color: rgba($green_light, .7)
        width: 100%
        height: 100%
        opacity: 0
        transition: opacity .4s
        content: ''
      &::before
        display: block
        padding-bottom: 100%
        content: ''
    img
      position: absolute
      top: 0
      left: 0
      border-radius: 8px
      width: 100%
      height: 100%
      object-fit: cover
    p
      +posCenter
      z-index: 2
      color: $green_dark
      font-size: px(20)
      font-weight: 700
      opacity: 0
      transition: opacity .4s
  .tag
    padding: 5px 10px
    position: absolute
    bottom: 30px
    left: 0px
    z-index: 3
    display: block
    border-radius: 0 5px 5px 0
    background-color: $green
    color: #fff
    font-size: px(14)
    font-weight: 700
    line-height: 1.2
  .content
    padding: 10px
  .info
    margin-bottom: 10px
    display: flex
    align-items: center
    justify-content: space-between
  .title
    font-size: px(20)
    line-height: 1.2
  .favorite
    display: flex
    align-items: center
    justify-content: center
    width: 30px
    height: 30px
    mask-image: linear-gradient($red, $red)
  .detail
    display: flex
    align-items: flex-end
    justify-content: space-between
  .stock
    color: $red
    font-size: px(12)
    line-height: 1.2
  .price
    display: flex
    align-items: flex-end
    gap: 10px
    font-size: px(20)
    .delete
      color: $gray
      font-size: px(14)
      text-decoration: line-through
</style>
