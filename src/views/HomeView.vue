<template>
  <div class="home">
    <Navbar />
    <Orders />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Orders from '@/components/Orders.vue'

export default {
  name: 'HomeView',
  components: {
    Navbar, Orders
  }
}
</script>
