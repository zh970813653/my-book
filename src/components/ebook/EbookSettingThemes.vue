<template>
  <fade-slider-up>
    <div class="setting-wrapper" v-show="menuVisible&&settingVisible===1">
      <div class="setting-theme">
        <div
          class="setting-theme-item"
          v-for="(item, index) in themesList"
          :key="index"
          @click="setTheme(index)"
        >
          <div
            class="preview"
            :style="{background: item.style.body.background}"
            :class="{'selected': item.name === defaultTheme}"
          ></div>
          <div class="text" :class="{'selected': item.name === defaultTheme}">{{item.alias}}</div>
        </div>
      </div>
    </div>
  </fade-slider-up>
</template>

<script>
import { ebookMixins } from '@/utils/mixins'
import { saveTheme } from '@/utils/localStorage'
export default {
  mixins: [ebookMixins],
  methods: {
    setTheme (index) {
      const theme = this.themesList[index]
      saveTheme(this.fileName, theme.name)
      this.setDefaultTheme(theme.name).then(() => {
        this.currentBook.rendition.themes.select(theme.name, theme.style)
        this.setGlobalStyle()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.setting-wrapper {
  position: absolute;
  bottom: rem(48);
  left: 0;
  z-index: 101;
  width: 100%;
  height: rem(90);
  background: white;
  box-shadow: 0 rem(-8) rem(8) rgba(0, 0, 0, 0.15);
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: rem(5);
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: rem(1) solid #ccc;
        box-sizing: border-box;
        // border: rem(1) solid #ccc !;
        &.selected{
          box-shadow: 0 rem(4) rem(6) rgba(0, 0, 0, 1);
        }
      }
      .text {
        flex: 0 0 rem(20);
        font-size: rem(14);
        color: #ccc;
        @include center;
        &.selected {
          color: #333;
        }
      }
    }
  }
}
</style>
