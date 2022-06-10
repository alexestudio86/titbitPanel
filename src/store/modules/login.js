import firebaseConfig from '../../config.js'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut  } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const app   =   initializeApp(firebaseConfig);
const auth  =   getAuth();
const db = getFirestore(app);

export default {
    namespaced: true,
    state: {
        dataUser: {
            email:      localStorage.length > 0 ? JSON.parse(localStorage.getItem('user')).email : '',
            password:   localStorage.length > 0 ? JSON.parse(localStorage.getItem('user')).password : '',
        },
        loader: null,
        shaker: false,
        loginStatus: false
    },
    mutations: {
        loginTrue: function( state ){
            state.loginStatus   =   true;
            state.loader        =   false;
        },
        loginFalse: function( state ){
            state.loginStatus   =   false;
            state.loader        =   false;
        },
        loginError: function( state ){
            state.loader        =   false;
            state.shaker        =   true;
            setTimeout( ()=> state.shaker = false , 400 );
        }
    },
    actions: {
        signIn: async function ({ commit, state }) {
            state.loader = true;
            try{
                const userCredential  =   await signInWithEmailAndPassword( auth, state.dataUser.email, state.dataUser.password );
                const user = userCredential.user;
                commit('loginTrue');
            }catch(error){
                console.log(`Code: ${error.code}, message: ${error.message}`);
                commit('loginError');
            }
        },
        signOut: async function({ commit }){
            try{
                await signOut(auth);
                commit('loginFalse')
            }catch(error){
                console.log(error)
            }
        }
    }
}
