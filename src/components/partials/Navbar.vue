<template>
  <q-toolbar slot="header" :color="userIsOwner ? 'black' : 'brown-2'" class="row justify-between fixed-top mainNav">
    <!-- Adminoknak -->
    <q-toolbar-title v-if="userIsOwner" class="gt-sm bg-black text-light adminSubtitle">
      Let Me Eat
      <div slot="subtitle" class="strong text-red-6">Tulajdonosoknak</div>  
    </q-toolbar-title>
    <!-- Sima usereknek -->
    <q-toolbar-title v-else class="gt-sm text-brown-8">
      Let Me Eat
      <div slot="subtitle" class="strong">Az éhség nagy úr</div>
    </q-toolbar-title>

    <!-- Desktop menü -->
    <q-tabs slot="navigation" inverted :color="userIsOwner ? 'light' : 'brown-8'" class="gt-sm">
      <q-route-tab
        v-for="route in routes"
        :key="route"
        v-if="showMenu(route.meta)"
        :icon="route.meta.icon"
        :label="route.meta.label"
        :to="{ name: route.name ? route.name : route.meta.toRoute }"
        slot="title"
      >
      </q-route-tab>
      <!-- A kijelentkezéshez nincs route -->
      <q-tab
        v-if="user.authenticated"
        icon="exit_to_app"
        slot="title"
        label="Kijelentkezés"
        exact
        @click="tryLogout"
      />
    </q-tabs>
    
    <!-- MOBILMENÜ -->
    <q-tabs inverted color="white" class="lt-md mobileMenu col">
      <q-route-tab
        v-for="route in routes"
        :key="route"
        v-if="showMenu(route.meta)"
        :icon="route.meta.icon"
        :to="{ name: route.name ? route.name : route.meta.toRoute }"
        slot="title"
      >
      </q-route-tab>
      <!-- A kijelentkezéshez nincs route -->
      <q-tab
        v-if="user.authenticated"
        icon="exit_to_app"
        slot="title"
        @click="tryLogout"
      />
    </q-tabs>
  </q-toolbar>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data: function () {
      return {
        routes: []
      }
    },
    computed: {
      ...mapGetters({
        user: 'auth/getUser',
        userIsOwner: 'auth/userIsOwner'
      })
    },
    methods: {
      ...mapActions({
        logout: 'auth/logout'
      }),
      showMenu: function (meta) {
        if (!this.user.authenticated && meta.guest) {
          return true
        }
        else if (this.user.authenticated && !this.userIsOwner && meta.showIfAuthed && !meta.adminMenu) {
          return true
        }
        else if (this.user.authenticated && this.userIsOwner && meta.showIfAuthed && meta.adminMenu) {
          return true
        }
        else {
          return false
        }
      },
      tryLogout: function () {
        this.logout().then(() => {
          this.$router.replace('/')
        })
      }
    },
    mounted: function () {
      for (let route of Object.values(this.$router.options.routes)) {
        this.routes.push(route)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .mainNav
    z-index 1000

  .adminSubtitle .q-toolbar-subtitle
    opacity 1
    font-size 16px
</style>