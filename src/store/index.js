import Vue from 'vue'
import Vuex from 'vuex'

import { createStore } from 'vuex'

Vue.use(Vuex)

// Modules
import getOrders from '@/modules/getOrders.js';
import patchOrders from '@/modules/patchOrders';

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
    getOrders, patchOrders
  }
})
