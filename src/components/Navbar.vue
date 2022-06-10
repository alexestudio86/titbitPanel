<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container d-flex justify-content-between align-items-center">
      <router-link to="/" class="navbar-brand">
        <img alt="Logo Titbit" src="../assets/logo-titbit.png" width="70" height='54' />
      </router-link>
      <LoginExit v-if="loginStatus" />
    </div>
  </nav>
</template>


<script>

  import LoginExit from './LoginExit.vue';
  import { mapState } from 'vuex';


  export default {
    name: 'Navbar',
    components: {
      LoginExit
    },
    computed: {
        ...mapState('login', ['loginStatus'])
    }
  }

</script>