<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card :data="random"></flap-card>
    <scroll
    class="wrapper"
    ref="storeHome"
    :listenScroll="listenScroll"
    @scroll="scroll"
    :probeType="probeType"
    :bounce="bounce"
    >
    <ul class="banner-wrapper">
      <li class="banner">
        <img class="img" :src="banner" alt="">
      </li>
      <guess-you-like :data="guessYouLike"></guess-you-like>
      <recommend :data="recommend" class="recommend"></recommend>
      <featured
      :btnText="$t('home.seeAll')"
      :titleText="$t('home.featured')"
      :data="featured"
      class="featured"></featured>
      <div class="category-list-wrapper" v-for="(item,index) in categoryList" :key="index">
         <category-book :data="item"></category-book>
      </div>
      <category :data="categories" class="category"></category>
    </ul>
    </scroll>
  </div>
</template>

<script>
import SearchBar from '@/components/home/SearchBar'
import FlapCard from '@/components/home/FlapCard'
import GuessYouLike from '@/components/home/GuessYouLike'
import Recommend from '@/components/home/Recommend'
import Featured from '@/components/home/Featured'
import CategoryBook from '@/components/home/CategoryBook'
import Category from '@/components/home/Category'
import Scroll from '@/common/scroll'
import { storeHomeMixins } from '@/utils/mixins'
import { home } from '@/api/store'
export default {
  mixins: [storeHomeMixins],
  components: {
    SearchBar,
    Scroll,
    FlapCard,
    GuessYouLike,
    Recommend,
    Featured,
    CategoryBook,
    Category
  },
  created () {
    this.listenScroll = true
    this.probeType = 3
    this.bounce = false
  },
  data () {
    return {
      random: null,
      banner: '',
      guessYouLike: null,
      recommend: null,
      featured: null,
      categoryList: null,
      categories: null
    }
  },
  methods: {
    scroll (pos) {
      const offsetY = pos.y
      this.setOffsetY(offsetY)
    },
    async getHomeLise () {
      const res = await home()
      if (res && res.status === 200) {
        const data = res.data
        this.banner = data.banner
        this.guessYouLike = data.guessYouLike
        this.recommend = data.recommend
        this.featured = data.featured
        this.categoryList = data.categoryList
        this.categories = data.categories
        const randomIndex = Math.random() * data.random.length | 0
        this.random = data.random[randomIndex]
        console.log(this.random)
      }
    }
  },
  mounted () {
    this.getHomeLise()
    setTimeout(() => {
      this.$refs.storeHome.refresh()
    }, 200)
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.store-home{
  width: 100%;
  height: 100%;
}
.wrapper{
  height: 100%;
  overflow: hidden;
  .banner-wrapper{
    padding: rem(10);
    box-sizing: border-box;
    .img{
      width: 100%;
      height: rem(150);
    }
    .recommend{
      margin-top: rem(20);
    }
    .featured{
      margin: rem(20) 0;
    }
    .category{
      margin: rem(20) 0 rem(50) 0;
    }
  }
}
</style>
