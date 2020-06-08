<template>
  <pop-right :popAttribute="popAttribute">
    <div class="slide-content-wrapper" v-show="menuVisible&&settingVisible===3">
      <div class="content" v-if="settingVisible === 3">
        <div class="content-page-wrapper" v-if="bookAvailable">
          <div class="content-page">
            <component :is="currentTab===1?content:bookmark"></component>
          </div>
          <div class="content-page-tab">
            <div
              class="content-page-tab-item"
              :class="{'selected':currentTab===1}"
              @click="selectTab(1)"
            >{{$t('book.navigation')}}</div>
            <div
              class="content-page-tab-item"
              :class="{'selected':currentTab===2}"
              @click="selectTab(2)"
            >{{$t('book.bookmark')}}
            </div>
          </div>
        </div>
        <div class="content-empyt" v-else>
          <ebook-loading></ebook-loading>
        </div>
      </div>
      <div class="content-bg" @click="hideTitleAndMenu"></div>
    </div>
  </pop-right>
</template>

<script>
import { ebookMixins } from '@/utils/mixins'
import popRight from '@/common/popupUp'
import EbookContents from './EbookSlideContents'
import EbookBookmark from './EbookSlideBookmark'
import EbookLoading from './EbookLoading'
export default {
  mixins: [ebookMixins],
  components: {
    popRight,
    EbookLoading
  },
  data () {
    return {
      currentTab: 1,
      content: EbookContents,
      bookmark: EbookBookmark
    }
  },
  created () {
    this.popAttribute = 'popright'
  },
  methods: {
    selectTab (tab) {
      this.currentTab = tab
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.slide-content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 300;
  display: flex;
  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;
    .content-page-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .content-page {
        flex: 1;
        width: 100%;
        overflow: hidden;
      }
      .content-page-tab {
        display: flex;
        flex: 0 0 rem(48);
        width: 100%;
        height: rem(48);
        &-item {
          flex: 1;
          font-size: rem(12);
          @include center;

        }
      }
    }
    .content-empyt{
      width: 100%;
      height: 100%;
      @include center
    }
  }
  .content-bg {
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
  }
}
</style>
