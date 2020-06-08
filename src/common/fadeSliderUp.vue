<template>
  <transition name="slider-up">
    <slot></slot>
  </transition>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
@import '../assets/styles/global.scss';
.slider-up-enter,.slider-up-leave-to{
  transform: translate3d(0, rem(138), 0);
}
.slider-up-enter-active,.slider-up-leave-active{
  transition: all 0.2s linear !important
}

</style>
