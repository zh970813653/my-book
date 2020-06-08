<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// dom加载完毕之后
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')

  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
export default {
  name: 'App'
}

</script>

<style lang="scss" scoped>
#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #7d8188;
}
</style>
