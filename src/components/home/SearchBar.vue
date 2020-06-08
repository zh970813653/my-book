<template>
  <div>
    <div class="search-bar" :class="{'hide-shadow':!shadowVisible}">
      <div class="search-bar-title-container">
        <div class="title-icon-back-wrapper" @click="back">
          <div class="icon-back icon"></div>
        </div>
        <transition name="title-move">
          <div class="search-bar-title-wrapper" v-if="titleVisible">
            <div class="title-text-wrapper">
              <div class="icon-text title">{{$t('home.title')}}</div>
            </div>
            <div class="title-icon-shake-wrapper" @click="showFlapCard">
              <div class="icon-shake icon"></div>
            </div>
          </div>
        </transition>
      </div>

      <div class="search-bar-input-wrapper" :class="{'hide-search':!titleVisible}">
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input
          type="text"
          :placeholder="$t('home.hint')"
          v-model="searchText"
          @click="showHotSearch"
          />
        </div>
      </div>
    </div>
    <transition name="hot-search-move">
      <hot-search-list v-show="hotSearchVisible" ref="hotSearch"></hot-search-list>
    </transition>

  </div>
</template>

<script>
import { storeHomeMixins } from '@/utils/mixins'
import HotSearchList from './HotSearchList'
export default {
  mixins: [storeHomeMixins],
  components: {
    HotSearchList
  },
  data () {
    return {
      searchText: '',
      titleVisible: true,
      shadowVisible: false,
      hotSearchVisible: false
    }
  },
  methods: {
    showFlapCard () {
      this.setFlapCardVisible(true)
    },
    back () {
      if (this.offsetY > 0) {
        this.showShadow()
      } else {
        this.hideShadow()
      }
      this.hideHotSearch()
      this.showTitle()
    },
    showHotSearch () {
      this.hotSearchVisible = true
      this.hideTitle()
      this.hideShadow()
      this.$nextTick(() => {
        this.$refs.hotSearch.reset()
      })
    },
    hideHotSearch () {
      this.hotSearchVisible = false
      if (this.offsetY > 0) {
        this.hideTitle()
        this.showShadow()
      } else {
        this.showShadow()
        this.hideShadow()
      }
    },
    hideTitle () {
      this.titleVisible = false
    },
    showTitle () {
      this.titleVisible = true
    },
    hideShadow () {
      this.shadowVisible = false
    },
    showShadow () {
      this.shadowVisible = true
    }
  },
  watch: {
    offsetY (offsetY) {
      // offsetY = +offsetY
      const y = Math.abs(offsetY)
      if (y > 0) {
        this.hideTitle()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()
      }
    },
    hotSearchOffsetY (offsetY) {
      if (offsetY > 0) {
        this.showShadow()
      } else {
        this.hideShadow()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.search-bar {
  width: 100%;
  display: flex;
  box-shadow: 0 rem(2) rem(2) 0 rgba(0, 0, 0, 0.1);
  flex-direction: column;
  &.hide-shadow {
    box-shadow: none;
  }
  .search-bar-title-container {
    height: rem(42);
    width: 100%;
    display: flex;
    padding: 0 rem(15);
    align-items: center;
    box-sizing: border-box;

  }
  .search-bar-title-wrapper {
    display: flex;
    width: 100%;
    align-items: center;
    .title-text-wrapper {
      flex: 1;
      @include center;
    }
    .title-icon-shake-wrapper {
      @include right;
    }
  }

  .search-bar-input-wrapper {
    width: 100%;
    height: rem(52);
    padding: rem(10);
    box-sizing: border-box;
    position: relative;
    top: 0;
    left: 0;
    transition: all 0.3s ease;
    &.hide-search {
      top: rem(-47);
      left: rem(40);
      height: rem(0);
      width: 90%;
      transition: all 0.3s ease;
    }
    // top: rem(-42);
    .search-bar-input {
      width: 100%;
      border-radius: rem(20);
      background: #f4f4f4;
      padding: rem(5) rem(15);
      box-sizing: border-box;
      @include left;
      border: rem(1) solid #eee;

      .icon-search {
        color: #999;
      }
      input {
        width: 100%;
        height: rem(22);
        outline: none;
        border: none;
        background: transparent;
        text-indent: rem(10);
        font-size: rem(12);
        color: #666;
        // &::-webkit-input-placeholder{
        //   background: #666;
        // }
      }
    }
  }
}
.title-move-enter,
.title-move-leave-to {
  opacity: 0;
  transform: translate3d(0, rem(10), 0);
}
.title-move-enter-active,
.title-move-leave-active {
  transition: all 0.2s ease;
}
.hot-search-move-enter,
.hot-search-move-leave-to {
  opacity: 0;
  // transform: translate3d(0, rem(10), 0);
}
.hot-search-move-enter-active,
.hot-search-move-leave-active {
  transition: all 0.4s ease;
}
</style>
