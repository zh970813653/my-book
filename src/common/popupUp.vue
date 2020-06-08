<template>
  <transition :name="popAttribute">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'popAttribute',
  props: {
    popAttribute: {
      type: String,
      default: 'popup'
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-enter,.popup-leave-to{
  opacity: 0;
  transform: translate3d(0,100%,0);
}
.popup-enter-active,.popup-leave-active{
  transition: all .3s ease;
}

.popright-enter,.popright-leave-to{
  opacity: 0;
  transform: translate3d(-100%,0,0);
}
.popright-enter-active,.popright-leave-active{
  transition: all .3s ease;
}
</style>
