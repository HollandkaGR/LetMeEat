<template>
  <div id="q-app">
    <q-layout
    ref="layout"
    view="lHr Lpr lFr"
    :left-class="{'bg-light': true}"
    >
      <q-toolbar slot="header" color="brown-2" class="row justify-between fixed-top">
        <q-btn
        v-if="user.authenticated"
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

        <q-tabs inverted color="brown-8" class="gt-sm">
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
          <q-tab
            v-if="user.authenticated"
            icon="exit_to_app"
            slot="title"
            label="Kijelentkezés"
            @click="tryLogout"
          />
        </q-tabs>

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
          <q-tab
            v-if="user.authenticated"
            icon="exit_to_app"
            slot="title"
            @click="tryLogout"
          />
        </q-tabs>
      </q-toolbar>

      <div v-if="user.authenticated" slot="left">
        <q-side-link tag="a" item :to="{ name: 'login' }" exact highlight>
          <q-item-main label="Bejelentkezés" />
        </q-side-link>
        <q-side-link item :to="{ name: 'restaurants' }">
          <q-item-main label="Éttermek" />
        </q-side-link>
      </div>
      <router-view class="layout-padding baseMargin"/>
    </q-layout>
  </div>
</template>

<script>
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
  import Cart from 'src/app/cart/components/MiniCart'
  import { mapGetters, mapActions } from 'vuex'
  
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
      Cart
    },
    data: function () {
      return {
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
    }
  }
</script>

<style lang="stylus" scoped>
  .baseMargin
    margin-top 80px
</style>
