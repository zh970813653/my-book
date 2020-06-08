import Vue from 'vue'
import Vuex from 'vuex'
import book from './module/book'
import store from './module/store'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book,
    store
  },
  getters,
  actions
})
