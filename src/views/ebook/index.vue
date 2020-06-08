<template>
  <div class="ebook" ref="ebook">
    <ebook-header></ebook-header>
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
    <ebook-book-mark></ebook-book-mark>
    <ebook-footer></ebook-footer>
  </div>
</template>

<script>
import EbookReader from '@/components/ebook/EbookReader'
import EbookTitle from '@/components/ebook/EbookTitle'
import EbookMenu from '@/components/ebook/EbookMenu'
import EbookBookMark from '@/components/ebook/EbookBookMark'
import EbookHeader from '@/components/ebook/EbookHeader'
import EbookFooter from '@/components/ebook/EbookFooter'
import { ebookMixins } from '@/utils/mixins'
import { getReadTime, saveReadTime } from '@/utils/localStorage'
export default {
  mixins: [ebookMixins],
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu,
    EbookBookMark,
    EbookHeader,
    EbookFooter
  },
  methods: {
    startLoopReanTime () {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      this.tast = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    },
    move (v) {
      this.$refs.ebook.style.top = v + 'px'
    },
    restore () {
      this.$refs.ebook.style.top = 0 + 'px'
      this.$refs.ebook.style.transition = 'all .2s linear'
      setTimeout(() => {
        this.$refs.ebook.style.transition = null
      }, 200)
    }
  },
  watch: {
    offsetY (v) {
      if (!this.menuVisible && this.bookAvailable) {
        if (v > 0) {
          this.move(v)
        } else if (v === 0) {
          this.restore()
        }
      }
    }
  },
  mounted () {
    this.startLoopReanTime()
  },
  beforeDestroy () {
    if (this.tast) {
      clearInterval(this.tast)
    }
  }
}
// http://172.19.136.169:3000//#/ebook/MedicineAndPublicHealth|2018_Book_FragilityFractureNursing
</script>

<style lang="scss" scoped>
.ebook{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>
