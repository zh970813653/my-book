<template>
  <div class="category">
    <title-view :label="$t('home.category')" :btn="$t('home.seeAll')" @onClick="showBookList"></title-view>
    <div class="category-list">
      <div class="category-item-wrapper" v-for="(item, index) in data" :key="index" @click="showBookCategory(item)">
        <div class="category-item">
          <div class="content-wrapper">
            <div class="title title-medium">{{categoryText(item.category)}}</div>
            <div class="num sub-title-tiny">{{item.num + ' ' + $t('home.books')}}</div>
          </div>
          <div class="img-wrapper">
            <div class="img-group">
              <img class="img" :src="item.img1">
              <img class="img2" :src="item.img2">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TitleView from './Title'
import { categoryText, getCategoryName } from '../../utils/store'

export default {
  components: {
    TitleView
  },
  props: {
    data: Array
  },
  methods: {
    showBookCategory (item) {
      this.$router.push({
        path: '/store/list',
        query: {
          category: getCategoryName(item.category),
          categoryText: this.categoryText(item.category)
        }
      })
    },
    categoryText (category) {
      return categoryText(category, this)
    },
    showBookList () {
      this.$router.push('/store/list')
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .category {
    .category-list {
      display: flex;
      flex-flow: row wrap;
      width: 100%;
      .category-item-wrapper {
        flex: 0 0 50%;
        width: 50%;
        padding: 0 rem(5) rem(10) rem(5);
        box-sizing: border-box;
        &:nth-child(odd) {
          padding-left: rem(10);
        }
        &:nth-child(even) {
          padding-right: rem(10);
        }
        .category-item {
          display: flex;
          width: 100%;
          background: #eee;
          .img-wrapper {
            flex: 0 0 50%;
            width: 50%;
            padding: rem(20) rem(10);
            box-sizing: border-box;
            .img-group {
              position: relative;
              width: 100%;
              height: rem(60);
              @include left;
              .img {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 100;
                width: rem(45);
                height: rem(60);
              }
              .img2 {
                position: absolute;
                left: rem(30);
                top: rem(7.5);
                z-index: 99;
                width: rem(30);
                height: rem(45);
              }
            }
          }
          .content-wrapper {
            flex: 0 0 50%;
            width: 50%;
            @include columnCenter;
            .title {
              text-align: center;
            }
            .num {
              text-align: center;
              margin-top: rem(5);
            }
          }
        }
      }
    }
  }
</style>
