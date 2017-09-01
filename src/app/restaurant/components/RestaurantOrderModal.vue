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

      <q-toolbar slot="footer">
        <q-toolbar-title>
          Footer
        </q-toolbar-title>
      </q-toolbar>

      <div class="layout-padding">
        <h1>Modal</h1>

        <q-btn color="primary" @click="closeModal">Close</q-btn>
        <p class="caption" v-for="n in 15">This is a Modal presenting a Layout.</p>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
  import { QSearch } from 'quasar'
  export default {
    components: {
      QSearch
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
