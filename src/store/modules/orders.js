// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../config.js'
import { getFirestore, collection, query, orderBy, where, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default {
    namespaced: true,
    state: {
        orders: [],
        loader: null,
        changedDocument: null
    },

    mutations: {
        allOrders( state, orderList ){
            state.loader = false;
            state.orders = orderList;
        },
        makeChange: async function(rootState, {id, obj} ){
            const orderDocRef = doc(db, "orders", id);
            try{
                await updateDoc(orderDocRef, obj);
            }catch(error){
                console.log(error)
            }
        }
    },
    actions: {
        readOrders: async function ({ commit, state }) {
            state.loader = true;
            const dayFiltered = new Date();
            dayFiltered.setHours(0,0,0,0);
            try{
                const queryOrders = query(collection(db, 'orders'), where('created', '>=', dayFiltered ), orderBy('created', 'desc'));
                const getOrders = await onSnapshot(queryOrders, (querySnapshot) => {
                    const orderList = [];

                    querySnapshot.forEach( (doc) => {
                        orderList.push( {id: doc.id, ...doc.data()} )
                    });

                    querySnapshot.docChanges().forEach( (change) => {
                        if(change.type === 'added'){
                            //console.log('agregado');
                            state.changedDocument = true;
                            setTimeout( () => {
                                state.changedDocument = false;
                            }, 1000)
                        }
                        if(change.type === 'modified'){
                            //console.log('modificado');
                        }
                        if(change.type === 'removed'){
                            //console.log('borrado');
                        }
                    });

                    commit('allOrders', orderList);
                });
            }catch(error){
                console.log(error)
            }
        },
        updateOrder: function({ commit }, [evt, id]){
            const status = evt;
            if( status == 'trabajando'){
                commit('makeChange', { id, obj: {
                    "status.trabajando": true,
                    "status.retrasado": false,
                    "delivered": false,
                    "modified": serverTimestamp()
                    }
                })
            }else if( status == 'retrasado'){
                commit('makeChange', {id, obj: {
                    "status.trabajando": false,
                    "status.retrasado": true,
                    "delivered": false,
                    "modified": serverTimestamp()
                    }
                })
            }else{
                commit('makeChange', { id, obj: {
                    "status.trabajando": false,
                    "status.retrasado": false,
                    "delivered": true,
                    "modified": serverTimestamp()
                    }
                });
            }
        }
    }
}