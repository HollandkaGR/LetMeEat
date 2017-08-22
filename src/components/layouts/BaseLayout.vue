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
      :to="{ name: 'index'}"
      exact
      slot="title"
      label="Főoldal"
      />
      <!-- Ha a user be van jelentkezve -->
      <q-route-tab
      icon="account_circle"
      :to="{ name: 'login'}"
      exact
      slot="title"
      label="Bejelenkezés"
      />
      <q-route-tab
      icon="account_circle"
      :to="{ name: 'orders'}"
      exact
      slot="title"
      label="Rendeléseim"
      />
    </q-tabs>
  </q-toolbar>


  <div slot="left">
    <q-side-link tag="a" item :to="{ name: 'login' }" exact highlight>
      <q-item-main label="Bejelentkezés" />
    </q-side-link>
    <q-side-link item :to="{ name: 'home' }">
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
      QSideLink
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