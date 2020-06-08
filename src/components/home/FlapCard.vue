<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <!-- 中间的翻转动画 -->
    <div class="flap-card-bg" :class="{'animation':runFlapCardAnimation}" v-show="runFlapCardAnimation">
      <div
        class="flap-card"
        v-for="(item,index) in flapCardList"
        :key="index"
        :style="{zIndex:item.zIndex}"
      >
        <div class="flap-card-circle">
          <div class="flap-card-semi-circle left" :style="semiCircleStyle(item,'left')" ref="left"></div>
          <div
            class="flap-card-semi-circle right"
            :style="semiCircleStyle(item,'right')"
            ref="right"
          ></div>
        </div>
      </div>
      <!-- 烟花小球动画 -->
      <div class="point-wrapper">
        <div
          class="point"
          v-for="(item,index) in pointList"
          :key="index"
          :class="{'animation':runPointAnimation}"
        ></div>
      </div>
    </div>
    <div
      class="book-card"
      :class="{'animation': runBookCardAnimation}"
      v-show="runBookCardAnimation"
    >
      <div class="book-card-wrapper">
        <div class="img-wrapper">
          <img class="img" :src="data ? data.cover : ''" />
        </div>
        <div class="content-wrapper">
          <div class="content-title">{{data ? data.title : ''}}</div>
          <div class="content-author sub-title-medium">{{data ? data.author : ''}}</div>
          <div class="content-category">{{categoryText()}}</div>
        </div>
        <div class="read-btn" @click.stop="showBookDetail(data)">{{$t('home.readNow')}}</div>
      </div>
    </div>
    <!-- 关闭按钮 -->
    <div class="close-btn-wrapper" @click="close">
      <span class="icon-close"></span>
    </div>
  </div>
</template>

<script>
import { storeHomeMixins } from '@/utils/mixins'
import { flapCardList, categoryText } from '@/utils/store'
// import
export default {
  mixins: [storeHomeMixins],
  props: {
    data: Object
  },
  data () {
    return {
      flapCardList,
      front: 0,
      back: 1,
      intervalTime: 25,
      runFlapCardAnimation: false,
      pointList: null,
      runPointAnimation: false,
      runBookCardAnimation: false
    }
  },
  created () {
    this.pointList = []
    for (let i = 1; i < 19; i++) {
      this.pointList.push(`point${i}`)
    }
  },
  methods: {
    categoryText () {
      if (this.data) {
        return categoryText(this.data.category, this)
      } else {
        return ''
      }
    },
    // 创建小球动画
    startPointAnimation () {
      this.runPointAnimation = true
      setTimeout(() => {
        this.runPointAnimation = false
      }, 750)
    },
    rotate (index, type) {
      const item = this.flapCardList[index]
      // 当type是正面的时候
      const dom =
        type === 'front' ? this.$refs.right[index] : this.$refs.left[index]
      dom.style.transform = `rotateY(${item.rotateDegree}deg)`
      dom.style.backgroundColor = `rgb(${item.r},${item._g},${item.b})`
    },
    next () {
      const frontFlapCrad = this.flapCardList[this.front]
      const backFlapCard = this.flapCardList[this.back]
      frontFlapCrad.rotateDegree = 0
      frontFlapCrad._g = frontFlapCrad.g
      backFlapCard.rotateDegree = 0
      backFlapCard._g = backFlapCard.g
      this.rotate(this.front, 'front')
      this.rotate(this.back, 'back')
      this.front++
      this.back++
      const len = this.flapCardList.length
      if (this.front >= len) {
        this.front = 0
      }
      if (this.back >= len) {
        this.back = 0
      }
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - ((index - this.front + len) % len)
      })
      this.prepare()
    },
    flapCardRotate () {
      const frontFlapCrad = this.flapCardList[this.front]
      const backFlapCard = this.flapCardList[this.back]
      frontFlapCrad.rotateDegree += 10
      frontFlapCrad._g -= 5
      backFlapCard.rotateDegree -= 10
      if (backFlapCard.rotateDegree < 90) {
        backFlapCard._g += 5
      }
      // 第一个临界点
      if (
        frontFlapCrad.rotateDegree === 90 &&
        backFlapCard.rotateDegree === 90
      ) {
        backFlapCard.zIndex += 2
      }
      this.rotate(this.front, 'front')
      this.rotate(this.back, 'back')
      // 第二个临界点
      if (
        frontFlapCrad.rotateDegree === 180 &&
        backFlapCard.rotateDegree === 0
      ) {
        this.next()
      }
    },
    // 让左边半圆和右边半圆重叠
    prepare () {
      const backFlapCard = this.flapCardList[this.back]
      backFlapCard.rotateDegree = 180
      backFlapCard._g = backFlapCard.g - 5 * 9
      this.rotate(this.back, 'back')
    },
    // 重置动画
    reset () {
      this.front = 0
      this.back = 1
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - index
        item._g = item.g
        item.rotateDegree = 0
        this.rotate(index, 'front')
        this.rotate(index, 'back')
      })
      this.runBookCardAnimation = false
      this.runFlapCardAnimation = false
      this.runPointAnimation = false
    },
    // 创建翻转卡片的动画
    startFlapCardAnimation () {
      this.prepare()
      this.task = setInterval(() => {
        this.flapCardRotate()
      }, this.intervalTime)
    },
    // 清除翻转动画
    stopAnimation () {
      if (this.task) {
        clearInterval(this.task)
      }
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      if (this.timeout2) {
        clearInterval(this.timeout2)
      }
      this.reset()
    },
    semiCircleStyle (item, dir) {
      return {
        backgroundColor: `rgb(${item.r},${item.g},${item.b})`,
        backgroundSize: item.backgroundSize,
        backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight
      }
    },
    close () {
      this.stopAnimation()
      this.setFlapCardVisible(false)
    },
    runAnimation () {
      this.runFlapCardAnimation = true
      this.timeout = setTimeout(() => {
        this.startFlapCardAnimation()
        this.startPointAnimation()
      }, 300)
      this.timeout2 = setTimeout(() => {
        this.runFlapCardAnimation = false
        this.runBookCardAnimation = true
      }, 2500)
    }
  },
  watch: {
    flapCardVisible (v) {
      if (v) {
        this.runAnimation()
      }
    }
    // data () {
    //   this.categoryText()
    // }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
@import "../../assets/styles/flapCard.scss";
.flap-card-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  @include center;
  .flap-card-bg {
    position: relative;
    width: rem(64);
    height: rem(64);
    border-radius: rem(5);
    background: white;
    transform: scale(0);
    opacity: 0;
    &.animation {
      animation: flap-card-move 0.3s ease-in both;
    }
    @keyframes flap-card-move {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1.2);
        opacity: 1;
      }
      75% {
        transform: scale(0.8);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    .point-wrapper {
      z-index: 1200;
      @include absCenter;
      .point {
        border-radius: 50%;
        @include absCenter;
        &.animation {
          @for $i from 1 to length($moves) {
            &:nth-child(#{$i}) {
              @include move($i);
            }
          }
        }
      }
    }
    .flap-card {
      width: rem(48);
      height: rem(48);
      @include absCenter;
      .flap-card-circle {
        width: 100%;
        height: 100%;
        display: flex;
        // @include absCenter;
        .flap-card-semi-circle {
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
          background-repeat: no-repeat;
          backface-visibility: hidden; //转动到背面的时候隐藏
          &.left {
            border-radius: rem(24) 0 0 rem(24);
            background-position: center right;
            transform-origin: right;
          }
          &.right {
            border-radius: rem(0) rem(24) rem(24) rem(0);
            background-position: center left;
            transform-origin: left;
          }
        }
      }
    }
  }
     .book-card {
      position: relative;
      width: 65%;
      max-width: rem(400);
      box-sizing: border-box;
      border-radius: rem(15);
      background: white;
      &.animation {
        animation: scale .3s ease-in both;
        @keyframes scale {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      }
      .book-card-wrapper {
        width: 100%;
        height: 100%;
        margin-bottom: rem(30);
        @include columnTop;
        .img-wrapper {
          width: 100%;
          margin-top: rem(20);
          @include center;
          .img {
            width: rem(90);
            height: rem(130);
          }
        }
        .content-wrapper {
          padding: 0 rem(20);
          margin-top: rem(20);
          .content-title {
            color: #333;
            font-weight: bold;
            font-size: rem(18);
            line-height: rem(20);
            max-height: rem(40);
            text-align: center;
            @include ellipsis2(2)
          }
          .content-author {
            margin-top: rem(10);
            text-align: center;
          }
          .content-category {
            color: #999;
            font-size: rem(14);
            margin-top: rem(10);
            text-align: center;
          }
        }
        .read-btn {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 1100;
          width: 100%;
          border-radius: 0 0 rem(15) rem(15);
          padding: rem(15) 0;
          text-align: center;
          color: white;
          font-size: rem(14);
          background: $color-blue;
        }
      }
    }
  .close-btn-wrapper {
    position: absolute;
    left: 0;
    bottom: rem(30);
    z-index: 1000;
    width: 100%;
    @include center;
    .icon-close {
      width: rem(45);
      height: rem(45);
      border-radius: 50%;
      background: #333;
      font-size: rem(25);
      color: white;
      @include center;
    }
  }
}
</style>
