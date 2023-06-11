<script setup>
import { useToast } from '@/stores/toast'

// 通知 store
const toastStore = useToast()
// 通知 method
const { addToast } = toastStore

const copyUrl = ref('')

const shareWeb = (type) => {
  const share = {
    baseUrl: encodeURIComponent(document.URL),
    targetUrl: ''
  }

  switch (type) {
    case 'facebook':
      share.targetUrl = 'https://www.facebook.com/sharer/sharer.php?u='
      break
    case 'line':
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        share.targetUrl = 'http://line.naver.jp/R/msg/text/?'
      } else {
        share.targetUrl = 'https://lineit.line.me/share/ui?url='
      }
      break
    case 'url':
      navigator.clipboard.writeText(copyUrl).then(() => {
        // 訊息通知
        addToast({
          title: '已成功複製網址',
          state: 'success'
        })
      })

      return
    default:
      // 無以上 type 則直接 return
      return
  }

  share.baseUrl = share.baseUrl
    .replace('?', '%3F')
    .replace(new RegExp('&', 'g'), '%26')

  if (type == 'line') {
    // line 需帶入原始網址
    window.open(`${share.targetUrl}${encodeURIComponent(document.URL)}`)
  } else {
    window.open(`${share.targetUrl}${share.baseUrl}&quote=${share.baseUrl}`)
  }
}

onMounted(() => {
  copyUrl.value = window.location.href
})
</script>

<template>
  <div class="share-group">
    <input v-model="copyUrl" type="hidden" readonly />
    <span>SHARE</span>
    <ul>
      <li>
        <a href="javascript:;" @click.prevent="shareWeb('facebook')">
          <Icon name="ri:facebook-fill" />
        </a>
      </li>
      <li>
        <a href="javascript:;" @click.prevent="shareWeb('line')">
          <Icon name="ri:line-fill" />
        </a>
      </li>
      <li>
        <a href="javascript:;" @click.prevent="shareWeb('url')">
          <Icon name="ri:external-link-line" />
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="sass">
@import '@/assets/base/_variable.sass'
@import '@/assets/base/_mixin.sass'
@import '@/assets/base/_function.sass'

.share-group
  display: flex
  align-items: center
  gap: 10px
  span
    position: relative
    display: block
    font-size: px(14)
    font-weight: 700
    line-height: 1.2
    letter-spacing: 1%
    cursor: default
    &::after
      position: absolute
      bottom: 0
      left: 0
      z-index: -1
      background-color: $yellow
      width: 100%
      height: 5px
      display: block
      content: ''
  ul
    display: flex
    align-items: center
  a
    display: flex
    align-items: center
    justify-content: center
    width: 60px
    height: 60px
    svg
      path
        transition: fill .4s
    +hover
      svg
        path
          fill: $green_dark
</style>
