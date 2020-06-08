<template>
  <div class="ebook-slide-bookmark">
    <div class="ebook-slide-bookmark-title">{{$t('book.bookmark')}} : {{bookmark?bookmark.length:0}}</div>
    <scroll class="ebook-slide-bookmark-wrapper">
      <ul class="ebook-slide-bookmark-list">
        <li
        class="ebook-slide-bookmark-item"
        v-for="(item,index) in bookmark"
        :key="index"
        @click="displayBookmark(item.cfi)"
        >
          <div class="ebook-slide-item-icon">
            <div class="icon-bookmark"></div>
          </div>
          <div class="ebook-slide-bookmark-item-text">{{item.text}}</div>
        </li>
      </ul>
    </scroll>
  </div>
</template>
<script>
import Scroll from '@/common/scroll'
import { ebookMixins } from '@/utils/mixins'
import { getBookmark } from '@/utils/localStorage'

export default {
  mixins: [ebookMixins],
  components: {
    Scroll
  },
  data () {
    return {
      bookmark: null
    }
  },
  methods: {
    displayBookmark (cfi) {
      // console.log(this.currentBook)

      this.currentBook.rendition.display(cfi)
      this.hideTitleAndMenu()
    }
  },
  mounted () {
    this.bookmark = getBookmark(this.fileName)
    console.log(this.bookmark)
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.ebook-slide-bookmark {
  width: 100%;
  height: 100%;
  .ebook-slide-bookmark-title {
    height: rem(40);
    border-bottom: rem(1) solid #7d7d7d;
    font-size: rem(16);
    display: flex;
    align-items: center;
    padding-left: rem(10);
    box-sizing: border-box;
  }
  .ebook-slide-bookmark-wrapper {
    .ebook-slide-bookmark-list {
      padding: 0 rem(20);
      .ebook-slide-bookmark-item {
        border-bottom: rem(1) solid #7d7d7d;
        padding: rem(10) 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        height: rem(60);
        .ebook-slide-item-icon {
          flex: 0 0 rem(30);
          font-size: rem(14);
          height: 100%;
          @include center
        }
        .ebook-slide-bookmark-item-text {
          font-size: rem(14);
          flex: 1;
          @include ellipsis2(3)
        }
      }
    }
  }
}
</style>
