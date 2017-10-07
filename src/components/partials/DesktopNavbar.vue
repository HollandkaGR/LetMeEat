<template>
  <q-tabs inverted align="justify" slot="navigation" color="brown-8" class="gt-sm">
    <nav-item v-for="route in routes" :key="route" :item="route"></nav-item>
  </q-tabs>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import NavItem from './../partials/DesktopMenuItem'

  export default {
    components: {
      NavItem
    },
    data: function () {
      return {
        routes: []
      }
    },
    computed: {
      ...mapGetters({
        user: 'auth/getUser'
      })
    },
    methods: {
      ...mapActions({
        logout: 'auth/logout'
      }),
      tryLogout: function () {
        this.logout().then(() => {
          this.$router.replace('/')
        })
      }
    },
    mounted: function () {
      console.log(this.$router.options.routes)
      for (let route of Object.values(this.$router.options.routes)) {
        this.routes.push(route)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .menuWrapper
    display flex
    flex-direction row
</style>
