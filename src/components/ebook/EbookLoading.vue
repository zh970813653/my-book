<template>
  <div class="ebook-loading">
    <div class="ebook-loading-wrapper">
      <div class="ebook-loading-item" v-for="(item,index) in data" :key="index">
        <div class="ebook-loading-line-wrapper" v-for="(subItem,subIndex) in item" :key="subIndex">
          <div class="ebook-loading-line" ref="line"></div>
          <div class="ebook-loading-mask" ref="mask"></div>
        </div>
      </div>
      <div class="ebook-lading-center"></div>
    </div>
  </div>
</template>

<script>
import { rem } from '@/utils/utils.js'
export default {
  data () {
    return {
      data: [
        [{}, {}, {}],
        [{}, {}, {}]
      ],
      maskWidth: [
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 }
      ],
      lineWidth: [
        { value: 16 },
        { value: 16 },
        { value: 16 },
        { value: 16 },
        { value: 16 },
        { value: 16 }
      ],
      add: true,
      end: false
    }
  },
  mounted () {
    this.task = setInterval(() => {
      this.$refs.mask.forEach((item, index) => {
        const mask = this.$refs.mask[index]
        const line = this.$refs.line[index]
        const maskWidth = this.maskWidth[index]
        const lineWidth = this.lineWidth[index]
        if (index === 0) {
          if (this.add && maskWidth.value < 16) {
            maskWidth.value++
            lineWidth.value--
          } else if (!this.add && lineWidth.value < 16) {
            maskWidth.value--
            lineWidth.value++
          }
        } else {
          if (this.add && maskWidth.value < 16) {
            const preMaskWidth = this.maskWidth[index - 1]
            if (preMaskWidth.value >= 8) {
              maskWidth.value++
              lineWidth.value--
            }
          } else if (!this.add && lineWidth.value < 16) {
            const preLineWidth = this.lineWidth[index - 1]
            if (preLineWidth.value >= 8) {
              maskWidth.value--
              lineWidth.value++
            }
          }
        }

        mask.style.width = `${rem(maskWidth.value)}rem`
        mask.style.flex = `0 0${rem(maskWidth.value)}rem`
        line.style.width = `${rem(lineWidth.value)}rem`
        line.style.flex = `0 0${rem(lineWidth.value)}rem`
        if (index === this.maskWidth.length - 1) {
          if (this.add) {
            if (maskWidth.value === 16) {
              this.end = true
            }
          } else {
            if (maskWidth.value === 0) {
              this.end = true
            }
          }
        }
        if (this.end) {
          this.add = !this.add
          this.end = false
        }
      })
    }, 20)
  }
}
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.ebook-loading {
  position: relative;
  width: rem(63);
  height: rem(40);
  background: transparent;
  z-index: 400;
  border: rem(3) solid #d7d7d7;
  border-radius: rem(3);
  .ebook-loading-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    .ebook-loading-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: rem(7) 0;
      box-sizing: border-box;
      .ebook-loading-line-wrapper {
        flex: 1;
        padding: 0 rem(7);
        box-sizing: border-box;
        @include left;
        .ebook-loading-line {
          flex: 0 0 rem(16);
          width: rem(16);
          height: rem(2);
          background: #d7d7d7;
        }
        .ebook-loading-mask {
          flex: 0 0 0;
          width: 0;
          height: rem(2);
        }
      }
    }
    .ebook-lading-center {
      position: absolute;
      left: 50%;
      top: 0;
      width: rem(2);
      height: 100%;
      background: #d7d7d7;
    }
  }
}
</style>
