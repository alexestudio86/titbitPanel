import Vue from 'vue'
import Vuex from 'vuex'

import { createStore } from 'vuex'

Vue.use(Vuex)

// Modules
import orders from './modules/orders.js';
import login from './modules/login.js';

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
    orders, login
  }
})
