import Vue from 'vue'
import Vuex from 'vuex'

import { createStore } from 'vuex'

Vue.use(Vuex)

// Modules
import orders from './modules/orders.js';

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    orders
  }
})
