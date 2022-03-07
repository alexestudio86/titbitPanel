// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config.js'
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default {
    namespaced: true,
    state: {
        orders: [],
    },
    getters: {
        modifiedState(state){
            const modifiedDate = [];
            state.orders.forEach( e => {
                modifiedDate.push( e.modified )
            })
            return state.orders.length
        }
    },
    mutations: {
        allOrders( state, orderList ){
            state.orders = orderList;
        }
    },
    actions: {
        readOrders: async function ({ commit }) {
            const db = getFirestore(app);
            try{
                const queryOrders = query(collection(db, 'orders'), orderBy('date', 'desc'));
                const orderList = [];
                const getOrders = await onSnapshot(queryOrders, (querySnapshot) => {
                    querySnapshot.forEach( (doc) => {
                        orderList.push( {id: doc.id, ...doc.data()} )
                    });
                    commit('allOrders', orderList)
                });
            }catch(error){
                console.log(error)
            }
        }
    }
}