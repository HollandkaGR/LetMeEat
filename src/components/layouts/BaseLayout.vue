<template>
  <div id="q-app">
    <q-layout
      ref="layout"
      view="lHr Lpr lFr"
    >
      <navbar></navbar>
      <transition
        name="transitions"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        duration="200"
      >
        <router-view class="baseMargin"/>
      </transition>
    </q-layout>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Navbar from './../partials/Navbar'

  import 'quasar-extras/animate/fadeIn.css'
  import 'quasar-extras/animate/fadeOut.css'
  
  export default {
    name: 'index',
    components: {
      Navbar
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
  
  .lmeTitle
    text-shadow 1px 0px 0px #000000, -1px 0px 0px #000000, 0px 1px 0px #000000, 0px -1px 0px #000000
    letter-spacing 2px

  .price
    opacity .8
    & > .currencyFormat
      font-size .6em
      
  .forSale 
    position: relative
    &:before
      position: absolute
      content: ""
      left: -8px
      top: 50%
      right: -8px
      border-top: 3px solid
      border-color: $red
      transform:rotate(-20deg)
    &:after
      position: absolute
      content: ""
      left: -8px
      top: 50%
      right: -8px
      border-top: 3px solid
      border-color: $red
      transform:rotate(20deg)

  .totalDisplay
    background $brown-2
    border-bottom 2px solid $dark
    border-top 2px solid $dark
    margin-top 15px!important
    height 40px
</style>

<style lang="stylus" scoped>
  .baseMargin
    padding 0 1rem
    padding-top 100px
    max-width 1200px
    margin-left auto
    margin-right auto
</style>
