<template>
  <div>
    <div>Kijelentkezés...</div>
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
      this.logout().then(() => {
        this.$router.replace({
          name: 'index',
          params: {
            message: {
              text: 'A kijelentkezés megtörtént!',
              type: 'success'
            }
          }
        })
      })
    }
  }
</script>

<style>

</style>