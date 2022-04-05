<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Cliente</th>
        <th scope="col">Pedido</th>
        <th scope="col">Estatus</th>
        <th scope="col">Entrega</th>
        <th scope='col'>Comentarios</th>
        </tr>
    </thead>
    <tbody>
      <PlaceholderCol />
      <PlaceholderCol />
      <PlaceholderCol />
      <PlaceholderCol />
      <PlaceholderCol />
    </tbody>
  </table>
</template>


<script>
import PlaceholderCol from '@/components/PlaceholderCol.vue'

export default {

  name: 'PlaceholderOrders',
  components: {
    PlaceholderCol
  }

}
</script>