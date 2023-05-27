<script setup>
import { useMember } from '@/stores/member'
import { useCart } from '@/stores/cart'
import { usePayment } from '@/stores/payment'

// 會員資料 store
const memberStore = useMember()
// 會員資料 method
const { getDetailProfile } = memberStore
const { data: profile } = await getDetailProfile(memberStore.profile.id)
const memberProfile = computed(() => profile.value.data)

// 購物車 store
const cartStore = useCart()

// 付款 store
const paymentStore = usePayment()
// 訂單 method
const { postPaymentRequest } = paymentStore

// 付款方式
const payment = ref('linepay')
// 帳單資訊
const billInfo = reactive({
  name: '',
  phone: '',
  email: ''
})
// 同會員資訊
const billSameAsMember = () => {
  billInfo.name = memberProfile.value.name
  billInfo.phone = `0${memberProfile.value.phone}` // type number 開頭不能為0，需再加回去
  billInfo.email = memberProfile.value.email
}
// 配送方式
const shippingType = ref('delivery')
// 貨運資訊
const shippingInfo = reactive({
  name: '',
  phone: '',
  email: '',
  city: '',
  zone: '',
  address: '',
  remark: ''
})
const shippingSameAsMember = () => {
  shippingInfo.name = memberProfile.value.name
  shippingInfo.phone = `0${memberProfile.value.phone}` // type number 開頭不能為0，需再加回去
  shippingInfo.email = memberProfile.value.email
  shippingInfo.city = memberProfile.value.city
  shippingInfo.zone = memberProfile.value.zone
  shippingInfo.address = memberProfile.value.address
}
// 縣市列表
const cityList = [
  '台北市',
  '基隆市',
  '新北市',
  '宜蘭縣',
  '桃園市',
  '新竹市',
  '新竹縣',
  '苗栗縣',
  '台中市',
  '彰化縣',
  '南投縣',
  '嘉義市',
  '嘉義縣',
  '雲林縣',
  '台南市',
  '高雄市',
  '澎湖縣',
  '金門縣',
  '屏東縣',
  '台東縣',
  '花蓮縣',
  '連江縣'
]

const submitForm = async () => {
  const runtimeConfig = useRuntimeConfig()
  const { baseUrl: BASE_URL } = runtimeConfig.public

  // 購物車商品整理
  const productTemp = cartStore.cartList.map((obj) => {
    const product = {
      name: obj.title,
      imageUrl: obj.image,
      quantity: obj.count,
      price: obj.price,
      target: obj.id
    }

    if (obj?.originalPrice) {
      product.originalPrice = obj?.originalPrice
    }

    return product
  })

  // 購物車加購品整理
  const purchaseTemp = []
  cartStore.cartList.forEach((obj) => {
    purchaseTemp.push(
      ...obj.purchase.map((item) => {
        const purchase = {
          name: item.title,
          imageUrl: item.image,
          quantity: 1,
          price: item.price,
          target: item._id
        }

        if (item?.originalPrice) {
          purchase.originalPrice = item?.originalPrice
        }

        return purchase
      })
    )
  })

  const postData = {
    // 商品
    products: productTemp.map((obj) => {
      return {
        name: obj.name,
        imageUrl: obj.imageUrl,
        quantity: obj.quantity,
        price: obj.price
      }
    }),
    redirectUrls: {
      confirmUrl: `${BASE_URL}/checkout/check`,
      cancelUrl: `${BASE_URL}/checkout/fail`
    }
  }
  // 若有加購品則添加 purchase
  if (purchaseTemp.length) {
    postData.purchase = purchaseTemp.map((obj) => {
      return {
        name: obj.name,
        imageUrl: obj.imageUrl,
        quantity: 1,
        price: obj.price
      }
    })
  }

  // 結帳流程
  const { data } = await postPaymentRequest(postData)
  const request = computed(() => data.value.data)
  console.log(request, 'request postPaymentRequest')
  // 成功
  // if (true) {
  if (request.value.returnCode == '0000') {
    // 更新訂單資訊
    paymentStore.order.memberId = memberProfile.value._id
    paymentStore.order.bill = {
      ...billInfo,
      payment: payment.value
    }
    paymentStore.order.shipping = {
      type: shippingType.value,
      ...shippingInfo
    }
    paymentStore.order.price = {
      total: cartStore.totalPrice,
      fee: cartStore.fee
    }
    paymentStore.order.products = productTemp
    paymentStore.order.purchase = purchaseTemp
    // 更新付款金額
    paymentStore.amount = request.value.amount
    // 跳轉到付款畫面
    // navigateTo('/checkout/check')
    navigateTo(request.value.info.paymentUrl.web, {
      external: true
    })
    return
  }
  // // 失敗
  // navigateTo('/checkout/fail')
}

useHead({
  title: `結帳流程 | 蒔栽`,
  bodyAttrs: {
    class: 'checkout'
  }
})

definePageMeta({
  middleware: 'check-member'
})
</script>

<template>
  <div class="main-wrapper">
    <div class="checkout-wrapper">
      <pre>{{ cartStore.cartList }}</pre>
      <div class="container">
        <form class="form" @submit.prevent="submitForm">
          <input id="submit" type="submit" />
          <p class="title">結帳資訊</p>
          <div class="block">
            <div>
              <p class="tip">帳單資訊</p>
              <button type="button" @click.prevent="billSameAsMember">
                同會員資訊
              </button>
            </div>
            <div class="group">
              <div class="half">
                <label for="bill_name">姓名</label>
                <input
                  id="bill_name"
                  v-model="billInfo.name"
                  type="text"
                  placeholder="請輸入姓名"
                  required
                />
              </div>
              <div class="half">
                <label for="bill_phone">聯絡電話</label>
                <input
                  id="bill_phone"
                  v-model="billInfo.phone"
                  type="tel"
                  placeholder="請輸入電話"
                  required
                />
              </div>
              <div class="full">
                <label for="bill_email">電子郵件</label>
                <input
                  id="bill_email"
                  v-model="billInfo.email"
                  type="email"
                  placeholder="請輸入電子郵件"
                  required
                />
              </div>
            </div>
            <div class="group">
              <div class="full">
                <p>付款方式</p>
                <ul class="radio-group">
                  <li class="radio-item">
                    <label>
                      <input
                        v-model="payment"
                        type="radio"
                        name="payment"
                        value="linepay"
                      />
                      <div class="wrap">
                        <p>LINE PAY</p>
                        <div class="checkbox"></div>
                      </div>
                    </label>
                  </li>
                  <li class="radio-item">
                    <label>
                      <input
                        v-model="payment"
                        type="radio"
                        name="payment"
                        value="shop"
                      />
                      <div class="wrap">
                        <p>來店付款</p>
                        <div class="checkbox"></div>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="block">
            <div>
              <p class="tip">配送方式</p>
              <button type="button" @click.prevent="shippingSameAsMember">
                同會員資訊
              </button>
            </div>
            <div class="group">
              <div class="full">
                <ul class="radio-group">
                  <li class="radio-item">
                    <label>
                      <input
                        v-model="shippingType"
                        type="radio"
                        name="shipping"
                        value="delivery"
                      />
                      <div class="wrap">
                        <p>貨運宅配</p>
                        <div class="checkbox"></div>
                      </div>
                    </label>
                  </li>
                  <li class="radio-item">
                    <label>
                      <input
                        v-model="shippingType"
                        type="radio"
                        name="shipping"
                        value="selfPickUp"
                      />
                      <div class="wrap">
                        <p>來店自取</p>
                        <div class="checkbox"></div>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div class="group">
              <div class="half">
                <label for="shipping_name">姓名</label>
                <input
                  id="shipping_name"
                  v-model="shippingInfo.name"
                  type="text"
                  placeholder="請輸入姓名"
                  required
                />
              </div>
              <div class="half">
                <label for="shipping_phone">聯絡電話</label>
                <input
                  id="shipping_phone"
                  v-model="shippingInfo.phone"
                  type="tel"
                  placeholder="請輸入電話"
                  required
                />
              </div>
              <div class="full">
                <label for="shipping_name">電子郵件</label>
                <input
                  id="shipping_name"
                  v-model="shippingInfo.email"
                  type="email"
                  placeholder="請輸入電子郵件"
                  required
                />
              </div>
              <template v-if="shippingType == 'delivery'">
                <div class="half">
                  <label for="city">縣市</label>
                  <select v-model="shippingInfo.city" name="city">
                    <option value="" selected disabled hidden>
                      請選擇縣市
                    </option>
                    <option
                      v-for="(item, key) in cityList"
                      :key="key"
                      :value="item"
                    >
                      {{ item }}
                    </option>
                  </select>
                </div>
                <div class="half">
                  <label for="zone">區碼</label>
                  <input
                    id="zone"
                    v-model="shippingInfo.zone"
                    type="text"
                    placeholder="請輸入區碼"
                    required
                  />
                </div>
                <div class="full">
                  <label for="address">地址</label>
                  <input
                    id="address"
                    v-model="shippingInfo.address"
                    type="text"
                    placeholder="請輸入完整地址"
                    required
                  />
                </div>
              </template>
              <div class="full">
                <label for="remark">訂單備註</label>
                <textarea
                  id="remark"
                  v-model="shippingInfo.remark"
                  rows="4"
                  placeholder="有任何問題歡迎於此備註"
                ></textarea>
              </div>
            </div>
          </div>
        </form>
        <div class="aside">
          <div class="list">
            <ul>
              <li v-for="(item, key) in cartStore.cartList" :key="key">
                <CartItem :item="item" :in-checkout="true" />
              </li>
            </ul>
          </div>
          <div class="block">
            <p>
              <span>小計</span>
              <span>NT ${{ cartStore.subtotalPrice.toLocaleString() }}</span>
            </p>
            <p>
              <span>運費</span>
              <span>NT ${{ cartStore.fee.toLocaleString() }}</span>
            </p>
          </div>
          <div class="block">
            <p>
              <span>總計</span>
              <span>NT ${{ cartStore.totalPrice.toLocaleString() }}</span>
            </p>
          </div>
          <div class="block button-group">
            <!-- <BaseButton :to="'/checkout/success'" :text="'確認購買'" /> -->
            <BaseButton
              :type="'label'"
              :for="'submit'"
              :text="'確認購買'"
              @to-click="submitForm"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.checkout-wrapper
  padding: 120px 60px 100px
  .container
    padding-top: 130px
    margin: 0 auto
    display: flex
    gap: 30px
    max-width: 1280px
  .form
    position: relative
    width: 50%
    input[type="submit"]
      position: absolute
      opacity: 0
      pointer-events: none
    .title
      margin-bottom: 60px
      font-size: px(28)
      font-family: $serif
      font-weight: 700
      line-height: 1.2
    .block
      &:not(:last-child)
        padding-bottom: 30px
        margin-bottom: 30px
        border-bottom: 1px solid $gray
    .tip
      margin-bottom: 20px
      font-size: px(18)
      line-height: 1.2
    .group
      display: flex
      flex-wrap: wrap
      gap: 20px
      &:not(:last-child)
        margin-bottom: 20px
    .half
      width: calc((100% - 20px) / 2)
    .full
      width: 100%
    .half,
    .full
      label,
      input
        display: block
        width: 100%
      label,
      p
        margin-bottom: 6px
        font-size: px(14)
        line-height: 1.2
      input,
      textarea,
      select
        padding: 10px
        border-radius: 5px
        border: 1px solid $gray
        width: 100%
        font-size: px(14)
        font-family: $sans
        width: 100%
    .radio-group
      display: flex
      align-items: center
      justify-content: center
      gap: 20px
      li
        width: 100%
    .radio-item
      label
        position: relative
      input
        position: absolute
        top: 0
        left: 0
        opacity: 0
        pointer-events: none
        &:checked + .wrap
          border: 1px solid rgba($gray, 0)
          outline: 2px solid rgba($green, 1)
          .checkbox
            border: 1px solid rgba($green, 1)
            &::before
              opacity: 1
      .wrap
        padding: 15px 10px
        display: flex
        align-items: center
        justify-content: space-between
        gap: 20px
        border-radius: 5px
        border: 1px solid $gray
        outline: 2px solid rgba($green, 0)
        transition: border .2s, outline .2s
        cursor: pointer
      p
        margin-bottom: 0
        flex-shrink: 0
      .checkbox
        display: flex
        align-items: center
        justify-content: center
        border-radius: 50px
        border: 1px solid rgba($black, .6)
        width: 16px
        height: 16px
        transition: border .2s
        &::before
          display: block
          border-radius: 50px
          background-color: rgba($green, 1)
          width: 8px
          height: 8px
          opacity: 0
          transition: opacity .2s
          content: ''
  .aside
    padding: 20px
    align-self: flex-start
    position: sticky
    top: 160px
    flex-shrink: 0
    border: 1px solid $green_fluorescent
    border-radius: 5px
    width: 50%
    .list
      li
        &:not(:last-child)
          border-bottom: 1px solid $green_fluorescent
    .block
      padding: 20px 10px
      border-top: 1px solid $green_fluorescent
    p
      display: flex
      align-items: center
      justify-content: space-between
      font-size: px(18)
      line-height: 1.2
      letter-spacing: .8px
      &:not(:last-child)
        margin-bottom: 20px
  .button-group
    display: flex
    align-items: center
    gap: 20px
</style>
