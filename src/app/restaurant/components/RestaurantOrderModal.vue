<template>
  <q-modal ref="orderModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
    <q-modal-layout>
      <q-toolbar slot="header" color="dark">
        <q-btn flat @click="closeModal">
          <q-icon name="keyboard_arrow_left" />
        </q-btn>
        <q-toolbar-title>
          {{ etterem.name }}
        </q-toolbar-title>
      </q-toolbar>

      <q-toolbar slot="header" color="light">
        <q-search inverted v-model="search" color="brown-4" placeholder="Írja be!" float-label="Tudja mit keres?"></q-search>
      </q-toolbar>

      <div class="layout-padding">
        <div class="restName text-brown-8 thin-paragraph shadow-3 bg-brown-2">{{ etterem.name }} kínálata</div>
        <q-list separator v-for="kategoria in etterem.categories" :key="kategoria" class="br-5 no-padding categoryList">
          <collapsible :kategoria="kategoria"></collapsible>
        </q-list>
      </div>
      
      <q-toolbar slot="footer" color="dark">
        <q-btn flat @click="closeModal">
          <q-icon name="keyboard_arrow_left" />
        </q-btn>
        <q-toolbar-title>
          Vissza az éttermekhez
        </q-toolbar-title>
      </q-toolbar>

    </q-modal-layout>
  </q-modal>
</template>

<script>
  import { QSearch } from 'quasar'
  import Collapsible from './RestaurantCategoryCollapsible'

  export default {
    components: {
      QSearch, Collapsible
    },
    data: function () {
      return {
        search: ''
      }
    },
    props: [ 'modalOpened', 'etterem' ],
    watch: {
      modalOpened: function (value) {
        if (value) {
          this.$refs.orderModal.open()
        }
        else {
          this.$refs.orderModal.close()
        }
      },
      restaurant: function (value) {
        console.log(value)
      }
    },
    methods: {
      closeModal: function () {
        this.$emit('modalClosed')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'
  
  br(n)
    -webkit-border-radius n
    -moz-border-radius n
    border-radius n
  
  .restName
    font-size 3rem
    margin 0 -10px 10px
    padding 5px 10px
    
  .categoryList
    margin 10px 0
    
  .br-5
    br(5px)
</style>
