<template>
  <div class="cover-title-wrapper">
    <div class="cover-title-left-wrapper">
      <img class="cover-img" :src="cover">
    </div>
    <div class="cover-title-right-wrapper">
      <div class="detail-cover-title-wrapper">
        <div class="cover-title-text">{{title}}</div>
      </div>
      <div class="cover-author-wrapper">
        <div class="cover-author-text">{{author}}</div>
      </div>
      <div class="detail-cover-description-wrapper">
        <div class="detail-cover-description-text">{{desc}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    cover: String,
    title: String,
    author: String,
    desc: String
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .cover-title-wrapper {
    display: flex;
    width: 100%;
    padding: rem(10) 0;
    border-bottom: rem(1) solid #eee;
    box-sizing: border-box;
    .cover-title-left-wrapper {
      flex: 0 0 rem(103);
      padding: rem(10) 0 rem(10) rem(15);
      box-sizing: border-box;
      @include top;
      .cover-img {
        width: rem(103);
        height: rem(146);
      }
    }
    .cover-title-right-wrapper {
      flex: 1;
      padding: rem(10) rem(15);
      box-sizing: border-box;
      .detail-cover-title-wrapper {
        .cover-title-text {
          font-size: rem(24);
          line-height: rem(26);
          font-weight: bold;
          color: #333;
        }
      }
      .cover-author-wrapper {
        margin-top: rem(10);
        .cover-author-text {
          font-size: rem(14);
          line-height: rem(16);
          color: $color-blue;
        }
      }
      .detail-cover-description-wrapper {
        margin-top: rem(10);
        .detail-cover-description-text {
          font-size: rem(14);
          line-height: rem(16);
          color: #666;
          word-break: keep-all;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          overflow-wrap: break-word;
        }
      }
    }
  }
</style>
