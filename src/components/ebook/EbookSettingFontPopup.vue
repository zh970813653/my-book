<template>
  <popup-up>
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">{{$t('book.selectFont')}}</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div class="ebook-popup-item"
        v-for="(item,index) in fontFamilyList"
        :key="index"
        @click="selectFontFalimy(item)"
        >
          <div class="ebook-popup-item-text" :class="{'selected':isSelected(item)}">{{item.font}}</div>
          <div class="ebook-popup-item-check" v-if="isSelected(item)">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </popup-up>
</template>

<script>
import { ebookMixins } from '@/utils/mixins'
import { FONT_FAMILY } from '@/utils/book'
import PopupUp from '@/common/popupUp'
import { saveFontFamily, saveFontSize } from '@/utils/localStorage'
export default {
  mixins: [ebookMixins],
  components: {
    PopupUp
  },
  data () {
    return {
      fontFamilyList: FONT_FAMILY
    }
  },
  methods: {
    selectFontFalimy (item) {
      saveFontFamily(this.fileName, item.font)
      saveFontSize()
      this.setDefaultFontFamily(item.font)

      this.setFontFamilyVisible(false)
      // 设置字体
      console.log(item.font)
      if (item.font === 'Default') {
        this.currentBook.rendition.themes.font('Times New Roman')
      } else {
        this.currentBook.rendition.themes.font(item.font)
      }
    },
    isSelected (item) {
      return this.defaultFontFamily === item.font
    },
    hide () {
      this.setFontFamilyVisible(false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.ebook-popup-list {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  background: white;
  box-shadow: 0 rem(-4) rem(6) rgba(0, 0, 0, 0.15);
  .ebook-popup-title {
    position: relative;
    padding: rem(15);
    border-bottom: rem(1) solid #b8b9bb;
    box-sizing: border-box;
    text-align: center;
    @include center;
    .ebook-popup-title-icon {
      position: absolute;
      left: rem(15);
      top: 0;
      height: 100%;
      font-size: rem(20);
      @include center;
      font-weight: bold;
    }
    .ebook-popup-title-text {
      font-size: rem(14);
      font-weight: bold;
    }
  }
  .ebook-popup-list-wrapper {
    .ebook-popup-item {
      display: flex;
      padding: rem(15);
      .ebook-popup-item-text {
        flex: 1;
        font-size: rem(14);
        text-align: left;
        &.selected {
          color: #346cd9;
          font-weight: bold;
        }
      }
      .ebook-popup-item-check {
        flex: 1;
        font-size: rem(14);
        text-align: right;
        font-weight: bold;
        color: #346cd9;
      }
    }
  }
}
</style>
