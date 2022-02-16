import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import category from './modules/category'
import spu from './modules/spu'
import home from './modules/home'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    category,
    spu,
    home
  },
  getters
})

export default store
