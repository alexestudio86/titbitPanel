<template>
    <div aria-labelledby='modalConfirmation' class='modal fade' data-bs-backdrop='static' id='modalConfirmation' tabindex='-1'>
        <div class='modal-dialog modal-dialog-centered'>
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-center">
                    <h5 class='modal-title text-uppercase'>¿Marcar como entregado?</h5>
                </div>
                <div class='modal-body text-center d-flex justify-content-around'>
                    <button class='btn btn-outline-secondary' data-bs-dismiss='modal' data-bs-target='modalConfirmation' type='button'>Cancelar</button>
                    <button class='btn btn-outline-danger' data-bs-dismiss='modal' data-ident='0' type='button' v-on:click='updateOrder( arr )'>Confirmar</button>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <small>¡Esta acción no se puede deshacer!</small>
                    <span class='d-none'>&#161;Hecho!</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    name: 'OrderAlert'

}
</script>
