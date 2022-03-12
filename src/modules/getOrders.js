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
        loader: null
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
            state.loader = false;
            state.orders = orderList;
        }
    },
    actions: {
        readOrders: async function ({ commit, state }) {
            const db = getFirestore(app);
            state.loader = true;
            try{
                const queryOrders = query(collection(db, 'orders'), orderBy('created', 'desc'));
                const orderList = [];
                const getOrders = await onSnapshot(queryOrders, (querySnapshot) => {
                    /*
                    state.orders.splice(0, state.orders.length);
                    querySnapshot.docChanges().forEach( (change) => {
                        if(change.type === 'added'){
                            orderList.push( {id: change.doc.id, ...change.doc.data()} )
                        }
                        if(){

                        }
                    });
                    commit('allOrders', orderList);
                    */
                    
                    state.orders.splice(0, state.orders.length);
                    querySnapshot.forEach( (doc) => {
                        orderList.push( {id: doc.id, ...doc.data()} )
                    });
                    commit('allOrders', orderList);
                    
                    /*
                    querySnapshot.docChanges().forEach( (change) => {
                        if (change.type === 'added'){
                            orderList.push( {id: change.doc.id, ...change.doc.data()} )
                        }
                    });
                    commit('allOrders', orderList)
                    */
                });
            }catch(error){
                console.log(error)
            }
        }
    }
}