<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input
          class="slide-contents-search-input"
          @click="showSearchPage"
          @keyup.enter.exact="search"
          type="text"
          :placeholder="$t('book.searchHint')"
          v-model="searchText"
        />
      </div>
      <div
        class="slide-contents-search-cancel"
        v-if="searchVisible"
        @click="hideSearchPage"
      >{{$t('book.cancel')}}</div>
    </div>
    <div class="slider-contents-book-wrapper" v-show="!searchVisible">
      <div class="slider-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img" alt />
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">
          <span class="slide-content-book-title-text">{{ metadata && metadata.title }}</span>
        </div>
        <div class="slide-contents-book-author">{{ metadata && metadata.creator }}</div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress+'%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText ()}}</div>
      </div>
    </div>
    <scroll v-show="!searchVisible" class="slide-contents-wrapper" ref="scroll">
      <ul class="slide-contents-list">
        <li class="slide-contents-item" v-for="(item,index) in navigation" :key="index">
          <span
            class="slide-contents-item-label"
            @click="displayContent(item.href)"
            :class="{'selected':section===index}"
            :style="contentItemStyle(item)"
          >{{item.label}}</span>
          <span class="slide-contents-item-page">{{item}}</span>
        </li>
      </ul>
    </scroll>
    <scroll class="slider-search-wrapper">
      <ul class="slider-search-list">
        <li
          class="slider-search-item"
          v-for="(item,index) in searchList"
          :key="index"
          v-html="item.excerpt"
          @click="displayContent(item.cfi,true)"
        ></li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import { ebookMixins } from '@/utils/mixins'
import Scroll from '@/common/scroll'
import { rem } from '@/utils/utils'

export default {
  mixins: [ebookMixins],
  components: {
    Scroll
  },
  data () {
    return {
      searchVisible: false,
      searchList: null,
      searchText: ''
    }
  },
  methods: {
    async search () {
      await this.currentBook.ready
      // this.setBookAvailable(true)

      const res = await this.doSearch(this.searchText)
      // this.setBookAvailable(false)

      this.searchList = res
      this.searchList.map(item => {
        item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`)
        return item
      })

      console.log(res)
    },
    doSearch (q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map(section =>
          section
            .load(this.currentBook.load.bind(this.currentBook))
            .then(section.find.bind(section, q))
            .finally(section.unload.bind(section))
        )
      ).then(results => Promise.resolve([].concat.apply([], results)))
    },
    async displayContent (target, highlight = false) {
      await this.display(target)
      this.hideTitleAndMenu()
      if (highlight) {
        // this.currentBook.rendition.annotations:用来管理高亮的元素
        this.currentBook.rendition.annotations.highlight(target)
      }
    },
    showSearchPage () {
      this.searchVisible = true
    },
    hideSearchPage () {
      this.searchVisible = false
      this.searchText = ''
      this.searchList = []
    },
    contentItemStyle (item) {
      return {
        marginLeft: `${rem(item.level * 15)}rem`
      }
    }
  }
  // watch: {
  //   async currentBook () {
  //     await this.currentBook.ready
  //     const res = await this.doSearch('added')
  //     console.log(res)
  //   }
  // }
}
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global.scss";
.ebook-slide-contents {
  width: 100%;
  height: 100%;
  font-size: 0;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: rem(36);
    margin: rem(20) 0 rem(10) 0;
    padding: 0 rem(15);
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      flex: 1;
      @include center;
      .slide-contents-search-icon {
        flex: 0 0 rem(28);
        @include center;
        font-size: rem(12);
      }
      .slide-contents-search-input {
        width: 100%;
        flex: 1;
        height: rem(32);
        font-size: rem(14);
        border: none;
        background: transparent;
        outline: none;
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 rem(50);
      font-size: rem(14);
      @include right;
    }
  }
  .slider-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: rem(90);
    padding: rem(10) rem(15) rem(20) rem(15);
    box-sizing: border-box;
    .slider-contents-book-img-wrapper {
      flex: 0 0 rem(45);
      .slide-contents-book-img {
        width: rem(45);
        height: rem(60);
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 1;
      padding: 0 rem(10);
      box-sizing: border-box;
      .slide-contents-book-title {
        font-size: rem(14);
        // width: rem(153.75);
        line-height: rem(16);
        @include center;
        .slide-content-book-title-text{
        @include ellipsis2(3);

        }
      }
      .slide-contents-book-author {
        font-size: rem(12);
        width: rem(153.75);
        margin-top: rem(5);
        @include ellipsis;
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 0 0 rem(70);
      .slide-contents-book-progress {
        .progress {
          font-size: rem(14);
        }
        .progress-text {
          font-size: rem(12);
        }
      }
      .slide-contents-book-time {
        font-size: rem(12);
        margin-top: rem(5);
      }
    }
  }
  .slide-contents-wrapper {
    overflow: hidden;
    // position: ab;
    // margin-top: rem(156);
    // margin-bottom: rem(100);
    height: rem(608);
    .slide-contents-list {
      padding: 0 rem(15);
      box-sizing: border-box;
      .slide-contents-item {
        padding: rem(20) 0;
        box-sizing: border-box;
        display: flex;
        .slide-contents-item-label {
          font-size: rem(14);
          flex: 1;
          // line-height: rem(16);
          @include ellipsis;
        }
        .slide-contents-item-page {
        }
      }
    }
  }
  .slider-search-wrapper {
    width: 100%;
    height: 0;
    padding-bottom: 220%;
    overflow: hidden;
    .slider-search-list {
      width: 100%;
      padding: 0 rem(15);
      box-sizing: border-box;
      .slider-search-item {
        font-size: rem(14);
        // line-height: ;
        padding: rem(20) 0;
        box-sizing: border-box;
      }
    }
  }
}
</style>
