<template>
    <div class="container">
        <hr />
        {{ modifiedState }}
        <hr />
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
                <tr v-for="(order, idx) of orders" :key="idx">
                    <th scope="row">{{ idx + 1 }}</th>
                    <td>{{ order.name }}</td>
                    <td>{{ order.details }}</td>
                    <td>
                        <!-- Object -->
                        <div v-if='order.delivered'>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="radio" v-bind='{id: order.name.replace(" ", "_") + 0, name: order.name.replace(" ", "_") }' disabled />
                                <label class="form-check-label" v-bind:for="order.name + 0" >
                                    Trabajando
                                </label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="radio" v-bind='{id: order.name.replace(" ", "_") + 1, name: order.name.replace(" ", "_") }' disabled />
                                <label class="form-check-label" v-bind:for="order.name + 1" >
                                    Retrasado
                                </label>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input bg-success" type="radio" v-bind='{id: order.name.replace(" ", "_") + 2, name: order.name.replace(" ", "_") }' checked disabled />
                                <label class="form-check-label" v-bind:for="order.name + 2" >
                                        Entregado
                                </label>
                            </div>
                            <small class="text-lght fst-italic">{{ getDate(order.modified) }}</small>
                        </div>
                        <div class="form-check form-switch" v-else>
                            <div v-for="(val, key, index) of order.estado" :key="index">
                                <div v-if='key == "trabajando"'>
                                    <input class='form-check-input' data-description='trabajando' type='radio' v-bind='{id: order.name.replace(" ", "_") + 0, class: val ? "bg-warning" : "", name: order.name.replace(" ", "_"), checked: val ? "checked" : ""}' v-on:click="updateOrder([$event, order.id])" />
                                    <label class='form-check-label' v-bind:for='order.name.replace(" ", "_") + 0' >
                                        Trabajando
                                    </label>
                                </div>
                                <div v-else-if='key == "retrasado"'>
                                    <input class='form-check-input' data-description='retrasado' type='radio' v-bind='{id: order.name.replace(" ", "_") + 1, class: val ? "bg-danger" : "", name: order.name.replace(" ", "_"), checked: val ? "checked" : ""}' v-on:click="updateOrder([$event, order.id])" />
                                    <label class='form-check-label' v-bind:for='order.name.replace(" ", "_") + 1' >
                                        Retrasado
                                    </label>
                                </div>
                            </div>
                            <div>
                                <input class='form-check-input' data-description='entregado' type='radio' v-bind='{id: order.name.replace(" ", "_") + 2, name: order.name.replace(" ", "_") }' v-on:click="updateOrder([$event, order.id])" />
                                <label class='form-check-label' v-bind:for='order.name.replace(" ", "_") + 2' >
                                    Entregado
                                </label>
                            </div>
                        </div>
                    </td>
                    <td>{{ invoiceStatus(order.invoice) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
    name: 'Orders',
    data(){
        return {
            dateOrder: null
        }
    },
    created: function(){
        this.readOrders();
    },
    watch:{
        '$store.getters.modifiedState': function(){
            console.log(this.orders);
            this.readOrders()
        }
    },
    computed: {
        ...mapState('getOrders', ['orders']),
        ...mapGetters('getOrders',['modifiedState'])
    },
    methods: {
        ...mapMutations('getOrders', ['allOrders']),
        ...mapActions('getOrders', ['readOrders']),
        ...mapMutations('patchOrders', ['makeChange']),
        ...mapActions('patchOrders', ['updateOrder']),
        invoiceStatus: function(e){
            if( e ){
                return '✔'
            }
        },
        getDate( evt ){
            return evt.toDate().toDateString()
        }
    }
}
</script>
