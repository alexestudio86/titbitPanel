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
                        <!-- Object -->
                        <div v-if='order.delivered' >
                            <div class="form-check form-switch" >
                                <div>
                                    <input class="form-check-input" type="radio" v-bind='{id: order.name + 0, name: "flexRadioDefault"+index }' disabled />
                                    <label class="form-check-label" v-bind:for="order.name + 0" >
                                        Trabajando
                                    </label>
                                </div>
                                <div>
                                    <input class="form-check-input" type="radio" v-bind='{id: order.name + 1, name: "flexRadioDefault"+index }' disabled />
                                    <label class="form-check-label" v-bind:for="order.name + 1" >
                                        Retrasado
                                    </label>
                                </div>
                                <div>
                                    <input class="form-check-input bg-success" type="radio" v-bind='{id: order.name + 2, name: "flexRadioDefault"+index }' checked disabled />
                                    <label class="form-check-label" v-bind:for="order.name + 2" >
                                        Entregado
                                    </label>
                                </div>
                                <span class="fs-6">{{ dateOrder }}</span>
                            </div>
                        </div>
                        <div v-else>
                            <div class="form-check form-switch">
                                <div v-for="(value, key, index) of order.estado" :key="index">
                                    <div v-if='key == "trabajando"'>
                                        <input class="form-check-input bg-warning" type="radio" v-bind='{id: order.name + index, name: "flexRadioDefault"+index, checked: value ? "checked" : ""}' />
                                        <label class="form-check-label" v-bind:for="order.name + index" >
                                            Trabajando
                                        </label>
                                    </div>
                                    <div v-else-if='key == "retrasado"'>
                                        <input class="form-check-input bg-danger" type="radio" v-bind='{id: order.name + index, name: "flexRadioDefault"+index, checked: value ? "checked" : ""}' />
                                        <label class="form-check-label" v-bind:for="order.name + index" >
                                            Retrasado
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <input class="form-check-input bg-success" type="radio" v-bind='{id: order.name + index, name: "flexRadioDefault"+index, checked: value ? "checked" : ""}' />
                                    <label class="form-check-label" v-bind:for="order.name + index" >
                                        Entregado
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!--
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
                        </form>
                        -->
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
    data(){
        return {
            dateOrder: 8
        }
    },
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
        },
        getDate( evt ){
            this.dateOrder = 5
        }
    }
}
</script>
