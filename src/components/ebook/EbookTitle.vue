<template>
  <fade-slider-down>
    <div class="title-wrapper" v-show="menuVisible">
      <div class="left">
        <span class="icon-back" @click="back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-shelf"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"></span>
        </div>
      </div>
    </div>
  </fade-slider-down>
</template>

<script>
import { ebookMixins } from '@/utils/mixins'
import FadeSliderDown from '@/common/fadeSliderDown'
export default {
  components: {
    FadeSliderDown
  },
  mixins: [
    ebookMixins
  ],
  methods: {
    back () {}
  }
}
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global";

.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 101;
  display: flex;
  width: 100%;
  height: rem(48);
  background: white;
  box-shadow: 0 rem(8) rem(8) rgba(0, 0, 0, 0.15);
  font-size: rem(20);
  z-index: 160;
  .left {
    flex: 0 0 rem(60);
    // padding-right: rem(5);
    @include center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 rem(40);
      @include center;
      .icon-shelf,
      .icon-cart,
      .icon-more {
        font-size: rem(22);
      }
    }
  }
}
</style>
