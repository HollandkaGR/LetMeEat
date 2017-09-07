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
        <h1 class="no-margin">{{ etterem.name }} kínálata</h1>
        <q-list separator v-for="kategoria in etterem.categories" :key="kategoria" class="bg-brown-2 br-5">
          <q-collapsible :label="kategoria.name">
            <product v-for="product in kategoria.products" v-bind="{ product }" :key="product"></product>
          </q-collapsible>
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
  import Product from './RestaurantProductCard'

  export default {
    components: {
      QSearch, Product
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
  br(n)
    -webkit-border-radius n
    -moz-border-radius n
    border-radius n
    
  .br-5
    br(5px)
</style>
