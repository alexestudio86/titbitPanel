<template>
    <div aria-labelledby='modalOrderAlert' class='modal fade show d-block bg-white bg-opacity-50' data-bs-backdrop='static' id='modalOrderAlert' tabindex='-1'>
        <div class='modal-dialog modal-dialog-centered'>
            <div class="modal-content">
                <div class="alert alert-success m-0 d-flex justify-content-between align-items-center" role="alert">
                    <span>¡Nueva Order llegando!</span>
                    <i class="far fa-bell fa-lg"></i>
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