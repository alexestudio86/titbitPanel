<template>
    <div class="modal fade show d-block" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <!-- Loading -->
            <div class="modal-content" v-if="loader">
                <div class="modal-header">
                    <h5 class="modal-title">Verificando Credenciales</h5>
                </div>
                <div class="modal-body">
                    <LoginPlaceholder />
                </div>
                <div class="modal-footer">
                    <p class="text-center">Por favor espere</p>
                </div>
            </div>
            <!-- Loaded -->
            <form :class="shaker ? 'shake' : ''" class="modal-content" v-else>
                <div class="modal-header">
                    <h5 :class="{ 'text-danger': shaker }" class="modal-title">Inserte sus credenciales para continuar</h5>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="email" :class="{ 'text-danger': shaker }" class="form-label">Correo Electrónico</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="dataUser.email" />
                    </div>
                    <div class="mb-3">
                        <label for="password" :class="{ 'text-danger': shaker }" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="password" v-model="dataUser.password" />
                    </div>
                    <div class="mb-3 form-check">
                        <label class="form-check-label" for="remember">Recordarme</label>
                        <input type="checkbox" class="form-check-input" id="remember" v-model="checked" @click="setLocal" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" :class="shaker ? 'btn-danger' : 'btn-secondary'" class="btn" @click.prevent="signIn">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import LoginPlaceholder from './LoginSpiner.vue';
import { mapState, mapActions } from 'vuex';

export default {

    name: 'LoginModal',
    data(){
        return {
            checked: localStorage.length > 0 ? JSON.parse(localStorage.getItem('user')).checked : false
        }
    },
    components: {
        LoginPlaceholder
    },
    methods: {
        ...mapActions('login', ['signIn', 'signOut']),
        setLocal: function(){
            console.log( this.checked )
            if( !this.checked ){
                let getData = { 'email': this.dataUser.email, 'password': this.dataUser.password, 'checked': true }
                localStorage.setItem( 'user', JSON.stringify(getData) );
            }else{
                localStorage.removeItem( 'user' );
            }
        }
    },
    computed: {
        ...mapState('login', ['dataUser', 'loader', 'shaker'])
    }

}
</script>

<style scoped>
    .modal{
        background: rgba(0,0,0,0.4);
    }
    .shake{
        animation: shake 0.5s;

        animation-iteration-count: infinite;
    }
    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
    }


</style>