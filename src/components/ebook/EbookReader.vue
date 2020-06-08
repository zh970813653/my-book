<template>
  <div class="ebook-reader">
    <div class="read" id="read"></div>
    <div
      class="ebook-read-mask"
      @click="onMaskClick"
      @touchmove="move"
      @touchend="moveEnd"
      @mousedown.left="onMouseEnter"
      @mousemove.left="onMouseMove"
      @mouseup.left="onMouseEnd"
    ></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import { ebookMixins } from '@/utils/mixins'
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  saveTheme,
  getLocation
} from '@/utils/localStorage'
import { flatten } from '@/utils/book'
global.ePub = Epub
export default {
  mixins: [ebookMixins],
  methods: {
    onMouseEnter (e) {
      // 定义鼠标进入的状态
      this.mouseState = 1
      this.mouseTime = e.timeStamp
      e.preventDefault()
      e.stopPropagation()
    },
    onMouseMove (e) {
      if (this.mouseState === 1) {
        this.mouseState = 2
      } else if (this.mouseState === 2) {
        let offsetY = 0
        if (this.firstOffestY) {
          offsetY = e.clientY - this.firstOffestY
          this.setOffsetY(offsetY)
        } else {
          this.firstOffestY = e.clientY
        }
      }
      e.preventDefault()
      e.stopPropagation()
    },
    onMouseEnd (e) {
      if (this.mouseState === 2) {
        this.setOffsetY(0)
        this.firstOffestY = 0
        this.mouseState = 3
      } else {
        this.mouseState = 4
      }
      const time = e.timeStamp - this.mouseTime
      console.log(time)
      if (time < 200) {
        this.mouseState = 4
      }

      e.preventDefault()
      e.stopPropagation()
    },
    move (e) {
      let offsetY = 0
      if (this.firstOffestY) {
        offsetY = e.changedTouches[0].clientY - this.firstOffestY
        this.setOffsetY(offsetY)
      } else {
        this.firstOffestY = e.changedTouches[0].clientY
      }
      e.preventDefault()
      e.stopPropagation()
      // console.log(offsetY)?
    },
    moveEnd (e) {
      this.setOffsetY(0)
      this.firstOffestY = 0
    },
    onMaskClick (e) {
      if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
        return
      }
      const offsetX = e.offsetX
      const width = window.innerWidth
      if (offsetX > 0 && offsetX < width * 0.3) {
        this.prevPage()
      } else if (offsetX > 0 && offsetX > width * 0.7) {
        this.nextPage()
      } else {
        this.toggleTitleAndMenu()
      }
    },
    // 返回上一页
    prevPage () {
      this.rendition &&
        this.rendition.prev().then(() => {
          this.refreshLocation()
        })
      this.hideTitleAndMenu()
    },
    // 返回下一页
    nextPage () {
      this.rendition &&
        this.rendition.next().then(() => {
          this.refreshLocation()
        })
      this.hideTitleAndMenu()
    },
    toggleTitleAndMenu () {
      this.setMenuVisible(!this.menuVisible)
      if (!this.menuVisible) {
        this.setSettingVisible(-1)
      }
      this.setFontFamilyVisible(false)
    },

    initFontSize () {
      const fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(fontSize + 'px')
        this.setDefaultFontSize(fontSize)
      }
    },
    initFontFamily () {
      const font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },

    initRendition () {
      // 生成Rendition 通过book对象的renderTo生成
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight
      })
      const location = getLocation(this.fileName)
      // 通过Rendtion.display渲染电子书
      this.display(location, () => {
        this.initFontSize()
        this.initFontFamily()
        this.initTheme()
        this.setGlobalStyle()
        this.refreshLocation()
      })

      // 表示当阅读器渲染完成以后可以获取到资源文件的时候,调用此方法
      this.rendition.hooks.content.register(contents => {
        console.log(contents)

        Promise.all([
          // 表示可以手动去添加样式文件
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/cabin.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`
          )
        ]).then(() => {
          console.log('加载完成')
        })
      })
    },
    initTheme () {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themesList[0].name
        saveTheme(this.fileName, defaultTheme)
      }
      this.setDefaultTheme(defaultTheme)

      this.themesList.forEach(item => {
        this.rendition.themes.register(item.name, item.style)
      })
      this.rendition.themes.select(defaultTheme)
    },
    initGestrue () {
      // 通过rendition的on方法可以将事件绑定到ifram里面
      this.rendition.on('touchstart', event => {
        this.toushstartX = event.changedTouches[0].clientX
        // 手指停留的时间
        this.toushstartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        const offsetX = event.changedTouches[0].clientX - this.toushstartX
        // 消耗的时间
        const time = event.timeStamp - this.toushstartTime
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        // event.preventDefault()
        event.stopPropagation()
      })
    },
    // 获取桌面的图片链接以及图片的基本信息
    parseBook () {
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url)
        })
      })
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata)
      })
      // 获取目录
      this.book.loaded.navigation.then(nav => {
        const navItem = flatten(nav.toc)
        function find (item, level = 0) {
          return !item.parent
            ? level
            : find(
              navItem.filter(parentItem => parentItem.id === item.parent)[0],
              ++level
            )
        }
        navItem.forEach(item => {
          item.level = find(item)
        })
        this.setNavigation(navItem)
      })
    },
    initEpub () {
      const url = `http://192.168.1.33:8081/epub/${this.fileName}.epub`
      // 生成book
      this.book = new Epub(url)
      // 将book对象给予vuex
      this.setCurrentBook(this.book)
      this.initRendition()
      // this.initGestrue()
      this.parseBook()
      this.book.ready
        .then(() => {
          return this.book.locations.generate(
            750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)
          )
        })
        .then(locations => {
          // console.log(locations)
          this.setBookAvailable(true)
          this.refreshLocation()
        })
    }
  },
  mounted () {
    // 设置nginx的路径
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.setFileName(fileName).then(() => {
      this.initEpub()
    })
  }
}
</script>

<style lang="scss" scoped>
.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .ebook-read-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
}
</style>
