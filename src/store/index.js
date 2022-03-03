import Vue from 'vue'
import Vuex from 'vuex'

import { createStore } from 'vuex'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config.js'
import { getFirestore, collection, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    orders: [],
  },
  getters: {
  },
  mutations: {
    allOrders( state, orderList ){
      state.orders = orderList;
    }
  },
  actions: {
    getOrders: async function ({ commit }) {
      const db = getFirestore(app);
      try{
        const queryOrders = query(collection(db, 'orders'), orderBy('date', 'desc'));
        /*
        const ordersSnapshot = await getDocs(queryOrders);
        const orderList = ordersSnapshot.docs.map( doc => doc.data() );
        commit('allOrders', orderList)
        */
       const getOrders = await onSnapshot(queryOrders, (querySnapshot) => {
        const orderList = [];
        querySnapshot.forEach( (doc) => {
          orderList.push( doc.data() )
        });
        commit('allOrders', orderList)
       })
      }catch(error){
        console.log(error)
      }
    }
  },
  modules: {
  }
})
