import { mapGetters, mapActions } from 'vuex'
import { themesList, setGlobalTheme, getReadTimeMinute } from '@/utils/book'
import FadeSliderUp from '@/common/fadeSliderUp'
import { saveLocation, getBookmark } from '@/utils/localStorage'

export const ebookMixins = {
  components: {
    FadeSliderUp
  },
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark'
    ]),
    themesList () {
      return themesList(this)
    },
    getSectionName () {
      return this.section ? this.navigation[this.section].label : ''
    }

  },
  methods: {
    ...mapActions(
      [
        'setFileName',
        'setMenuVisible',
        'setSettingVisible',
        'setDefaultFontSize',
        'setDefaultFontFamily',
        'setFontFamilyVisible',
        'setDefaultTheme',
        'setBookAvailable',
        'setProgress',
        'setSection',
        'setIsPaginating',
        'setCurrentBook',
        'setNavigation',
        'setCover',
        'setMetadata',
        'setPaginate',
        'setPagelist',
        'setOffsetY',
        'setIsBookmark'
      ]
    ),
    setGlobalStyle () {
      switch (this.defaultTheme) {
        case 'Default':
          setGlobalTheme(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
        case 'Eye':
          setGlobalTheme(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
          break
        case 'Gold':
          setGlobalTheme(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
          break
        case 'Night':
          setGlobalTheme(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
          break
        default:
          setGlobalTheme(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
      }
    },
    async refreshLocation () {
      // currentLocation可以查询到当前的进度
      const currentLocation = await this.currentBook.rendition.currentLocation()
      if (currentLocation && currentLocation.start) {
        const startCfi = currentLocation.start.cfi
        // 获取本章最开始的字符
        const progress = this.currentBook.locations.percentageFromCfi(startCfi)
        this.setProgress((progress * 100) | 0)
        this.setSection(currentLocation.start.index)
        saveLocation(this.fileName, startCfi)
        const bookmark = getBookmark(this.fileName)
        if (bookmark) {
          if (bookmark.some(item => item.cfi === startCfi)) {
            this.setIsBookmark(true)
          } else {
            this.setIsBookmark(false)
          }
        } else {
          this.setIsBookmark(false)
        }
      }
    },
    display (target, cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      } else {
        this.rendition.display().then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      }
    },
    hideTitleAndMenu () {
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
    },

    getReadTimeText () {
      return this.$t('book.haveRead').replace('$1', getReadTimeMinute(this.fileName))
    }
  }
}

export const storeShelfMixins = {
  computed: {

  },
  methods: {

  }
}

export const storeHomeMixins = {
  computed: {
    ...mapGetters([
      'offsetY',
      'hotSearchOffsetY',
      'flapCardVisible'
    ])
  },
  methods: {
    ...mapActions([
      'setOffsetY',
      'setHotSearchOffsetY',
      'setFlapCardVisible'
    ]),
    showBookDetail (book) {
      console.log(book)

      this.$router.push({
        path: '/store/detail',
        query: {
          fileName: book.fileName,
          category: book.categoryText
        }
      })
    }
  }
}
