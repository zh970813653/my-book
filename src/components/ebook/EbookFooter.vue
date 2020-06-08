<template>
  <div class="ebook-footer">
    <span class="ebook-footer-text">{{this.progress + '%'}}</span>
    <!-- <span class="ebook-footer-text">{{this.paginate}}</span> -->
  </div>
</template>

<script type="text/ecmascript-6">
import { ebookMixins } from '@/utils/mixins'

export default {
  mixins: [ebookMixins]
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: rem(48);
    padding: 0 rem(15);
    box-sizing: border-box;
    @include right;
    .ebook-footer-text {
      font-size: rem(12);
      color: #6d7178;
    }
  }
</style>
