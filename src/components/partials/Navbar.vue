<template>
  <q-tabs slot="navigation" class="transparent">
    <q-tab icon="home" route="/" exact replace>
      <div class="gt-md">Főoldal</div>
    </q-tab>
    <q-tab icon="find_in_page" route="/ettermek" exact replace>
      <div class="gt-md">Éttermek</div>
    </q-tab>
    <div v-if="!user.authenticated" class="row">
      <q-tab icon="person" route="/bejelentkezes" exact replace>
        <div class="gt-md">Bejelentkezés</div>
      </q-tab>
    </div>
    <div v-else class="row">
      <q-tab icon="shopping_basket" :to="{name: 'rendeleseim'}" exact replace>
        <div class="gt-md">Rendeléseim2</div>
      </q-tab>
      <q-tab icon="power_settings_new" @selected="tryLogout" exact replace>
      <div class="gt-md">Kilépés</div>
      </q-tab>
    </div>
  </q-tabs>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
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
    }
  }
</script>
