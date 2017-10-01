<template>
  <div id="q-app">
    <q-layout
    ref="layout"
    view="lHr Lpr lFr"
    :left-class="{'bg-light': true}"
    >
      <q-toolbar slot="header" color="brown-2" class="row justify-between fixed-top">
        <q-btn
        v-if="userIsOwner"
        flat
        @click="$refs.layout.toggleLeft()"
        color="black"
        >
          <q-icon name="menu"/>
        </q-btn>
        <q-toolbar-title class="gt-sm text-brown-8">
          Let Me Eat
          <div slot="subtitle" class="strong">Az éhség nagy úr</div>
        </q-toolbar-title>
        <!-- Qtabot használunk -->

        <!-- Desktop menü -->
        <q-tabs slot="navigation" inverted color="brown-8" class="gt-sm">
          <q-route-tab
            icon="home"
            label="Főoldal"
            :to="{ name: 'index' }"
            exact
            slot="title"
          >
          </q-route-tab>
          <q-route-tab
            icon="search"
            label="Éttermek"
            :to="{ name: 'restaurants' }"
            exact
            slot="title"
          >
          </q-route-tab>
          <q-route-tab
            v-if="!user.authenticated"
            icon="account_circle"
            label="Bejelentkezés"
            :to="{ name: 'login' }"
            exact
            slot="title"
          >
          </q-route-tab>
          <q-route-tab
            v-if="!user.authenticated"
            icon="add"
            label="Regisztráció"
            :to="{ name: 'registration' }"
            exact
            slot="title"
          >
          </q-route-tab>
          <q-route-tab
            v-if="user.authenticated"
            icon="playlist_add_check"
            label="Rendeléseim"
            :to="{ name: 'orders' }"
            exact
            slot="title"
          >
          </q-route-tab>
          <q-route-tab
            v-if="user.authenticated"
            icon="shopping_cart"
            label="Kosár"
            :to="{ name: 'cart' }"
            exact
            slot="title"
          >
          </q-route-tab>
          <q-route-tab
            v-if="user.authenticated"
            icon="account_circle"
            label="Adataim"
            :to="{ name: 'userDetails' }"
            exact
            slot="title"
          >
          </q-route-tab>
          <q-tab
            v-if="user.authenticated"
            icon="exit_to_app"
            slot="title"
            label="Kijelentkezés"
            @click="tryLogout"
          />

        </q-tabs>
        
        <!-- MOBILMENÜ -->
        <q-tabs inverted color="white" class="lt-md mobileMenu col">
          <q-route-tab
            icon="home"
            :to="{ name: 'index' }"
            exact
            slot="title"
          >
          </q-route-tab>
          <q-route-tab
            icon="search"
            :to="{ name: 'restaurants' }"
            exact
            slot="title"
          >
          </q-route-tab>
          <q-route-tab
            v-if="!user.authenticated"
            icon="account_circle"
            :to="{ name: 'login' }"
            exact
            slot="title"
          >
          </q-route-tab>
          <q-route-tab
            v-if="!user.authenticated"
            icon="add"
            :to="{ name: 'registration' }"
            exact
            slot="title"
          >
          </q-route-tab>
          <q-route-tab
            v-if="user.authenticated"
            icon="playlist_add_check"
            :to="{ name: 'orders' }"
            exact
            slot="title"
          >
          </q-route-tab>
          <q-route-tab
            v-if="user.authenticated"
            icon="shopping_cart"
            :to="{ name: 'cart' }"
            exact
            slot="title"
          >
          </q-route-tab>
          <q-route-tab
            v-if="user.authenticated"
            icon="account_circle"
            :to="{ name: 'userDetails' }"
            exact
            slot="title"
          >
          </q-route-tab>
          <q-tab
            v-if="user.authenticated"
            icon="exit_to_app"
            slot="title"
            @click="tryLogout"
          />
        </q-tabs>
      </q-toolbar>

      <div v-if="userIsOwner" slot="left">
        <left-drawer></left-drawer>
      </div>
      <transition
              name="transitions"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
              mode="out-in"
              duration="200"
      >
        <router-view class="layout-padding baseMargin"/>
      </transition>
    </q-layout>
  </div>
</template>

<script>
  import NavItem from './../partials/DesktopMenuItem'

  import {
    QLayout,
    QTabs,
    QTab,
    QTabPane,
    QRouteTab,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QSideLink
  } from 'quasar'
  import { mapGetters, mapActions } from 'vuex'
  import LeftDrawer from './../partials/LeftDrawer'
  import 'quasar-extras/animate/fadeIn.css'
  import 'quasar-extras/animate/fadeOut.css'
  
  export default {
    name: 'index',
    components: {
      QLayout,
      QTabs,
      QTab,
      QTabPane,
      QRouteTab,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon,
      QList,
      QListHeader,
      QItem,
      QItemSide,
      QItemMain,
      QSideLink,
      LeftDrawer,
      NavItem
    },
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

<style lang="stylus">
  @import '~variables'
  
  .price
    opacity .8
    & > .currencyFormat
      font-size .6em
      
  .totalDisplay
    background $brown-2
    border-bottom 2px solid $dark
    border-top 2px solid $dark
    margin-top 15px!important
    height 40px
    
</style>


<style lang="stylus" scoped>
  .baseMargin
    margin-top 80px
</style>
