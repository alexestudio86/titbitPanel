<template>
    <div class="container">
        <div class="table-responsive">
            <div v-if='loader'>
                <PlaceholderOrders />
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Pedido</th>
                        <th scope="col">Factura</th>
                        <th scope="col">Estatus</th>
                        <th scope="col">Entrega</th>
                        <th scope='col'>Comentarios</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, idx) of orders" :key="idx">
                        <th scope="row">{{ idx + 1 }}</th>
                        <!-- Cliente -->
                        <td>{{ order.name }}</td>
                        <!-- Pedido -->
                        <td>
                            <p class="m-0" v-for="(o, i) of order.details" :key="i">{{ o }}</p>
                        </td>
                        <!-- Factura -->
                        <td>{{ invoiceStatus(order.invoice) }}</td>
                        <!-- Estatus -->
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
                            </div>
                            <div class="form-check form-switch" v-else>
                                <div v-if='order.status'>
                                    <div v-if='order.status.trabajando'>
                                        <input class='form-check-input bg-warning' data-description='trabajando' type='radio' v-bind='{id: order.name.replace(" ", "_") + 0, name: order.name.replace(" ", "_") }' v-on:click="checkModalConfirmation( [$event, order.id] )" checked/>
                                        <label class='form-check-label' v-bind:for='order.name.replace(" ", "_") + 0' >
                                            Trabajando
                                        </label>
                                    </div>
                                    <div v-else>
                                        <input class='form-check-input' data-description='trabajando' type='radio' v-bind='{id: order.name.replace(" ", "_") + 0, name: order.name.replace(" ", "_") }' v-on:click="checkModalConfirmation( [$event, order.id] )" />
                                        <label class='form-check-label' v-bind:for='order.name.replace(" ", "_") + 0' >
                                            Trabajando
                                        </label>
                                    </div>
                                    <div v-if='order.status.retrasado'>
                                        <input class='form-check-input bg-danger' data-description='retrasado' type='radio' v-bind='{id: order.name.replace(" ", "_") + 1, name: order.name.replace(" ", "_") }' v-on:click="checkModalConfirmation( [$event, order.id] )" checked />
                                        <label class='form-check-label' v-bind:for='order.name.replace(" ", "_") + 1' >
                                            Retrasado
                                        </label>
                                    </div>
                                    <div v-else>
                                        <input class='form-check-input' data-description='retrasado' type='radio' v-bind='{id: order.name.replace(" ", "_") + 1, name: order.name.replace(" ", "_") }' v-on:click="checkModalConfirmation( [$event, order.id] )" />
                                        <label class='form-check-label' v-bind:for='order.name.replace(" ", "_") + 1' >
                                            Retrasado
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <input class='form-check-input' data-description='entregado' type='radio' v-bind='{id: order.name.replace(" ", "_") + 2, name: order.name.replace(" ", "_") }' v-on:click.stop.prevent="checkModalConfirmation( [$event, order.id] )" />
                                    <label class='form-check-label' v-bind:for='order.name.replace(" ", "_") + 2' >
                                        Entregado
                                    </label>
                                </div>
                            </div>
                        </td>
                        <!-- Entrega -->
                        <td>
                            <div v-if='order.delivered'>
                                <div>
                                    <small class="font-italic">{{ getDate(order.modified) }}</small>
                                </div>
                                <div>
                                    <small class="font-weight-bold">{{ getHour(order.modified) }}</small>
                                </div>
                            </div>
                        </td>
                        <!-- Comentarios -->
                        <td>
                            <a v-if='order.comments' tabindex='0' class="btn" role="button" data-bs-toggle="popover" data-bs-placement="left" data-bs-trigger='focus' v-bind='{ "data-Bs-Content": order.comments, title: order.name}' >
                                <i class="far fa-question-circle"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <order-alert v-if="changedDocument" />
            <modal-confirmation :arr='arr' />
            <audio id="bell" >
                <source src="../assets/bell.mp3" type="audio/mpeg" />
            </audio>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import PlaceholderOrders from '@/components/PlaceholderOrders.vue'
import ModalConfirmation from '@/components/ModalConfirmation.vue'
import OrderAlert from '@/components/OrderAlert.vue'

export default {
    name: 'Orders',
    components: {
        PlaceholderOrders, ModalConfirmation, OrderAlert
    },
    data(){
        return {
            dateOrder: null,
            arr: []
        }
    },
    created: function(){
        this.readOrders();
    },
    updated: function(){
        this.enablePopovers();
        this.playSound();
    },
    computed: {
        ...mapState('orders', ['orders', 'loader', 'changedDocument'])
    },
    methods: {
        ...mapMutations('orders', ['allOrders', 'makeChange']),
        ...mapActions('orders', ['readOrders', 'updateOrder']),
        invoiceStatus: function(e){
            if( e ){
                return '✔'
            }
        },
        getDate( evt ){
            if( evt ){
                return evt.toDate().toDateString()
            }
        },
        getHour( evt ){
            if( evt ){
                return evt.toDate().toLocaleTimeString('es-MX')
            }
        },
        checkModalConfirmation( [evt, id] ){
            const description = evt.currentTarget.getAttribute('data-description');
            if( description == 'entregado'){
                this.arr = [description, id];
                this.showModalConfirmation();
            }else{
                this.updateOrder( [description, id] );
            }
        },
        showModalConfirmation(){
            let modal = new bootstrap.Modal( document.querySelector('div#modalConfirmation') );
            modal.show();
        },
        enablePopovers(){
            let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
            let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
                return new bootstrap.Popover(popoverTriggerEl)
            })
        },
        playSound(){
            if(this.changedDocument){
                document.getElementById('bell').autoplay = 'true';
                console.log('Si hay');
            }
        }
    }
}
</script>
