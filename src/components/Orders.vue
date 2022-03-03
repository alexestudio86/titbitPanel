<template>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Pedido</th>
                    <th scope="col">Pedido</th>
                    <th scope="col">Estatus</th>
                    <th scope="col">Factura</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) of orders" :key="order.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ order.name }}</td>
                    <td>{{ order.details }}</td>
                    <td>
                        <form v-on:submit.prevent=''>
                            <div class="form-check form-switch">
                                <div>
                                    <input class="form-check-input" type="radio" v-bind='{id: order.name + 0, name: "flexRadioDefault"+index, checked: order.status == "Trabajando" ? "checked" : "", class: order.status == "Trabajando" ? "bg-warning" : "" }' />
                                    <label class="form-check-label" v-bind:for="order.name + 0" >
                                        Trabajando
                                    </label>
                                </div>
                                <div>
                                    <input class="form-check-input" type="radio" v-bind='{id: order.name + 1, name: "flexRadioDefault"+index, checked: order.status == "Retrasado" ? "checked" : "", class: order.status == "Retrasado" ? "bg-danger" : "" }' />
                                    <label class="form-check-label" v-bind:for="order.name + 1" >
                                        Retrasado
                                    </label>
                                </div>
                                <div>
                                    <input class="form-check-input" type="radio" v-bind='{id: order.name + 2, name: "flexRadioDefault"+index, checked: order.status == "Entregado" ? "checked" : "", class: order.status == "Entregado" ? "bg-success" : "" }' />
                                    <label class="form-check-label" v-bind:for="order.name + 2" >
                                        Entregado
                                    </label>
                                </div>
                            </div>
                            <!--
                            <div v-else-if='order.status == "Trabajando"' class="form-check form-switch">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" b-bind:checked='[order.status == "Trabajado" ? "true" : "false"]' />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Trabajando
                                </label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                <label class="form-check-label" for="flexRadioDefault2">
                                    Trabajando
                                </label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                <label class="form-check-label" for="flexRadioDefault2">
                                    Entregado
                                </label>
                            </div>
                            -->
                        </form>
                    </td>
                    <td>{{ invoiceStatus(order.invoice) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    name: 'Orders',
    created: function(){
        this.getOrders();
    },
    computed: {
      ...mapState(['orders'])
    },
    methods: {
        ...mapMutations(['allOrders']),
        ...mapActions(['getOrders']),
        invoiceStatus: function(e){
            if( e ){
                return '✔'
            }
        }
    }
}
</script>
