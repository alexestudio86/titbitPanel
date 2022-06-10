<template>
  <div class="home">
    <Navbar />
    <div v-if="loginStatus">
      <Orders />
    </div>
    <div v-else>
      <LoginModal />
    </div>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue';
import Orders from '@/components/Orders.vue';
import LoginModal from '@/components/LoginModal.vue';
import { mapState } from 'vuex';


export default {

  name: 'HomeView',
  components: {
    Navbar, Orders, LoginModal
  },
  computed: {
    ...mapState('login', ['loginStatus'])
  }

}

</script>
