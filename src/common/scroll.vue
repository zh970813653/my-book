<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'BSscroll',
  props: {
    // 根据参数实时派发滚动事件
    probeType: {
      type: Number,
      default: 1
    },
    // 是否开启原生的默认点击行为
    click: {
      type: Boolean,
      default: true
    },
    // 当事件派发后是否阻止浏览器默认行为
    preventDefault: {
      type: Boolean,
      default: true
    },
    // 是否监听滚动
    listenScroll: {
      type: Boolean,
      default: false
    },
    // 是否开启弹回
    bounce: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    }
  },
  mounted () {
    this._initScroll()
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) return
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        preventDefault: this.preventDefault,
        click: this.click,
        bounce: this.bounce
      })
      if (this.listenScroll) {
        const me = this
        this.scroll.on('scroll', pos => {
          // me.scroll.maxScrollY:滚动到底部的距离
          me.$emit('scroll', pos, me.scroll.maxScrollY)
          // console.log(me.scroll.maxScrollY);
        })
      }
    },
    // 启用 better-scroll, 默认 开启
    enable () {
      this.$refs.wrapper && this.scroll.enable()
    },
    // 禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。
    disable () {
      this.$refs.wrapper && this.scroll.disable()
    },
    // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
    refresh () {
      this.$refs.wrapper && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    scrollBy () {
      this.scroll && this.scroll.scrollBy.apply(this.scroll, arguments)
    },
    // 滚动到最底部
    scrollToMaxY () {
      this.scroll.scrollTo(0, this.scroll.maxScrollY, 500)
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, 200)
    }
  }
}
</script>

<style>
</style>
