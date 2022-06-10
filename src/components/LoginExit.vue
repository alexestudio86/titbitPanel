<template>
    <div>
        <button class="btn btn-danger" @click="signOut">
          <i class="fa-solid fa-arrow-right-from-bracket fa-xl"></i>
        </button>
    </div>
</template>


<script>

    import { mapActions } from 'vuex';


    export default {

        name: 'LoginExit',
        methods: {
            ...mapActions('login', ['signOut']),
        }

    }

</script>