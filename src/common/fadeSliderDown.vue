<template>
  <transition name="slider-down">
    <slot></slot>
  </transition>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.slider-down-enter,.slider-down-leave-to{
  transform: translate3d(0, -100%, 0);
}
.slider-down-enter-active,.slider-down-leave-active{
  transition: all 0.2s linear;
}

</style>
