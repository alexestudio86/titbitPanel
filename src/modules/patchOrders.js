// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../config.js'
import { getFirestore, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default {
    namespaced: true,
    state: {
    },
    mutations: {
        makeChange: async function(rootState, {id, obj} ){
            //this.$store.state.orders.splice(0,this.$store.state.orders.length)
            console.log(rootState.state)
            const db = getFirestore(app);
            const orderDocRef = doc(db, "orders", id);
            try{
                await updateDoc(orderDocRef, obj);
            }catch(error){
                console.log(error)
            }
        }
    },
    actions: {
        updateOrder: function({ commit }, [evt, id]){
            const status = evt.currentTarget.getAttribute('data-description');
            if( status == 'trabajando'){
                commit('makeChange', { id, obj: {
                    "estado.trabajando": true,
                    "estado.retrasado": false,
                    "delivered": false,
                    "modified": serverTimestamp()
                    }
                })
            }else if( status == 'retrasado'){
                commit('makeChange', {id, obj: {
                    "estado.trabajando": false,
                    "estado.retrasado": true,
                    "delivered": false,
                    "modified": serverTimestamp()
                    }
                })
            }else{
                commit('makeChange', { id, obj: {
                    "estado.trabajando": false,
                    "estado.retrasado": false,
                    "delivered": true,
                    "modified": serverTimestamp()
                    }
                });
            }
        }
    }
}