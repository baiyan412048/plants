<script setup></script>

<template>
  <div class="share-group">
    <span>SHARE</span>
    <ul>
      <li>
        <a href="javascript:;">
          <Icon name="ri:facebook-fill" />
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <Icon name="ri:instagram-line" />
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <Icon name="ri:line-fill" />
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="sass" scoped>
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
