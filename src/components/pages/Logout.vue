<template>
  <div>
    <div v-if="logoutSuccess">A kijelentkezés: sikeres</div>
    <div v-else>A kijelentkezés: </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data: function () {
      return {
        logoutSuccess: false
      }
    },
    methods: {
      ...mapActions({
        logout: 'auth/logout'
      })
    },
    beforeMount: function () {
      this.logout()
    }
  }
</script>

<style>

</style>
