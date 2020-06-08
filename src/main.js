import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang/index'
import '@/assets/styles/icon.css'
import '@/assets/fonts/daysOne.css'
import './assets/styles/global.scss'
// import '@/mock/index.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
