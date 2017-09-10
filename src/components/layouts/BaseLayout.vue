<template>
  <div id="q-app">
    <q-layout
    ref="layout"
    view="lHr Lpr lFr"
    :left-class="{'bg-light': true}"
    >
    <q-toolbar slot="header" color="transparent" class="glossy">
      <q-btn
      flat
      @click="$refs.layout.toggleLeft()"
      color="black"
      >
      <q-icon name="menu" />
    </q-btn>
    <q-toolbar-title>
      Let Me Eat
      <div slot="subtitle">Ha nem akarod a véletlenre bízni</div>
    </q-toolbar-title>
    <!-- Qtabot használunk -->

    <q-tabs inverted color="white">
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
  </q-toolbar>


  <div slot="left">
    <q-side-link tag="a" item :to="{ name: 'login' }" exact highlight>
      <q-item-main label="Bejelentkezés" />
    </q-side-link>
    <q-side-link item :to="{ name: 'restaurants' }">
      <q-item-main label="Éttermek" />
    </q-side-link>
  </div>
  <router-view class="layout-padding"/>
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