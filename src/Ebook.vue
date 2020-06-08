<template>
   <div class="ebook">
    <title-bar :showTitleAndMenu="showTitleAndMenu"></title-bar>
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleTitleAndMenu"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <menu-bar
      ref="menuBar"
      :showTitleAndMenu="showTitleAndMenu"
      :fontSizeList="fontSizeList"
      :defaultFontSize="defaultFontSize"
      @setFontSize="setFontSize"
      :themesList="themesList"
      :defaultThemes="defaultThemes"
      @setThemes="setThemes"
      :bookAvailable="bookAvailable"
      @onProgressChange="onProgressChange"
      @jumpTo="jumpTo"
      :navigation="navigation"
    ></menu-bar>
  </div>
</template>

<script>
import Epub from 'epubjs'
import TitleBar from '@/components/titleBar'
import MenuBar from '@/components/menuBar'
const DOWNLOAD_URL = '../public/超级时间整理术.epub'
export default {
  components: {
    TitleBar,
    MenuBar
  },
  data () {
    return {
      showTitleAndMenu: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ],
      defaultFontSize: 16,
      themesList: [
        {
          name: 'default',
          style: {
            body: {
              color: '#000',
              background: '#fff'
            }
          }
        },
        {
          name: 'eye',
          style: {
            body: {
              color: '#000',
              background: '#ceeeba'
            }
          }
        },
        {
          name: 'night',
          style: {
            body: {
              color: '#fff',
              background: '#000'
            }
          }
        },
        {
          name: 'gold',
          style: {
            body: {
              color: '#000',
              background: 'rgba(241,236,226)'
            }
          }
        }
      ],
      // 图书是否属于可用状态
      bookAvailable: false,
      defaultThemes: 0
    }
  },
  methods: {
    // 根据链接跳转到指定的位置
    jumpTo (href) {
      this.rendition.display(href)
      this.hideTitleAndMenu()
    },
    hideTitleAndMenu () {
      // 隐藏标题栏和菜单栏
      this.showTitleAndMenu = false
      // 隐藏菜单栏的弹出设置栏
      // this.$refs.menuBar.hideSetting()
      // 隐藏目录
      // this.$refs.
    },
    // progress,进度条的数值(0-100)
    onProgressChange (progress) {
      const percentage = progress / 100 // 变成百分比
      console.log(percentage)

      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      this.rendition.display(location) // 如果等于0 显示第一页
    },
    // 电子书的解析和渲染
    showEpub () {
      // 生成book
      this.book = new Epub(DOWNLOAD_URL)
      console.log(this.book)
      // 生成Rendition 通过book对象的renderTo生成
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      // 通过Rendtion.display渲染电子书
      this.rendition.display()
      // 获取Themes对象可以用于设置字体的大小
      this.themes = this.rendition.themes
      // 默认字体
      this.setFontSize(this.defaultFontSize)
      // 主题切换
      // this.themes.register(name,style) 主题切换的名称以及样式
      // this.themes.select(name) 通过主题的名称快速的切换主题
      this.registerThems()
      this.setThemes(this.defaultThemes)
      // 进度条功能 获取locations对象
      // 通过epubjs的钩子函数来实现
      this.book.ready.then(() => {
      // ready:当电子书解析完成之后生成locations对象
        return this.book.locations.generate()
      }).then(result => {
        this.navigation = this.book.navigation
        console.log(this.navigation)
        this.locations = this.book.locations
        this.bookAvailable = true
      })
    },
    setThemes (index) {
      this.themes.select(this.themesList[index].name)
      this.defaultThemes = index
    },
    registerThems () {
      this.themesList.forEach(themes => {
        this.themes.register(themes.name, themes.style)
      })
    },
    prevPage () {
      // Renditio.prev 返回上一页
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    nextPage () {
      // Renditio.next 返回下一页
      if (this.rendition) {
        this.rendition.next()
      }
    },
    // 点击显示与隐藏
    toggleTitleAndMenu () {
      this.showTitleAndMenu = !this.showTitleAndMenu
      if (!this.showTitleAndMenu) {
        this.$refs.menuBar.hideSetting()
      }
    },
    setFontSize (fontSize) {
      console.log(fontSize)
      this.defaultFontSize = fontSize
      if (this.themes) {
        this.themes.fontSize(fontSize + 'px')
      }
    }
  },
  mounted () {
    this.showEpub()
  }
}
</script>

<style lang="scss" scoped>
@import "./assets/styles/global.scss";
.ebook {
  position: relative;
  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      display: flex;
      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 2;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }
}
</style>
