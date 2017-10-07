<template>
  <q-modal ref="orderModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}" @close="modalClosed" noBackdropDismiss>
    <q-modal-layout>
      <q-toolbar slot="header" color="dark">
        <q-btn flat @click="closeModal">
          <q-icon name="keyboard_arrow_left" />
        </q-btn>
        <q-toolbar-title>
          {{ etterem.name }}
        </q-toolbar-title>
        <mini-cart></mini-cart>
      </q-toolbar>

      <q-toolbar slot="header" color="light">
        <q-search inverted v-model="productSearch" color="brown-4" placeholder="Írj be legalább 3 karaktert!" float-label="Tudod mit keresel?"></q-search>
      </q-toolbar>
      
      <div class="layout-padding">
        <div class="restName text-brown-8 thin-paragraph shadow-3 bg-brown-2 text-center">
          {{ etterem.name }} kínálata
        </div>
        <div class="relative-position row justify-end">
          <q-btn v-if="!openAll" @click="openAllCat" small class="bg-green-4" style="min-width:160px;">
            Összes kinyit
          </q-btn>
          <q-btn v-else @click="openAllCat" small class="bg-red-4" style="min-width:160px;">
            Összes becsuk
          </q-btn>
        </div>
        <!-- Ha nincs keresés 3 karakter hosszan, megjelenítjük a kategóriákat -->
        <div v-if="!etterem.isOpen" class="text-center bg-red-10 text-white strong restIsClosed" style="margin:8px 0 0;">
          NYITÁS: {{etterem.open}}
        </div>
        <div v-if="productSearch.length < 3">
          <q-list separator v-for="kategoria in etterem.categories" :key="kategoria" class="br-5 no-padding categoryList">
            <collapsible :kategoria="kategoria" :openColl="openAll"></collapsible>
          </q-list>
        </div>
        <!-- Ha keresünk megnézzük, hogy van-e találat. Ha nincs, üzenetet jelenítünk meg. -->
        <div v-else>
          <q-list v-if="filteredProducts.length > 0" class="no-border">
            <product v-for="product in filteredProducts" v-bind="{ product }" :key="product"></product>
          </q-list>
          <div v-else>
            A keresés "{{ productSearch }}" nem hoz eredményt!
          </div>
        </div>
        
      </div>
      
      <q-toolbar slot="footer" color="dark">
        <q-btn flat @click="closeModal">
          <q-icon name="keyboard_arrow_left" />
          Vissza az éttermekhez
        </q-btn>
      </q-toolbar>

    </q-modal-layout>
  </q-modal>
</template>

<script>
  import { QSearch } from 'quasar'
  import { mapGetters, mapActions } from 'vuex'
  import Collapsible from './RestaurantCategoryCollapsible'
  import Product from './RestaurantProductCard'
  import MiniCart from 'src/app/cart/components/MiniCart'

  export default {
    components: {
      QSearch, Collapsible, Product, MiniCart
    },
    data: function () {
      return {
        productSearch: '',
        filteredProducts: [],
        openAll: false
      }
    },
    props: [ 'modalOpened', 'etterem' ],
    computed: {
      ...mapGetters({
        isModalOpened: 'restaurant/isModalOpened'
      })
    },
    watch: {
      isModalOpened: function (value) {
        if (value) {
          this.openAll = false
          this.$refs.orderModal.open()
        }
        else {
          this.$refs.orderModal.close()
        }
      },
      productSearch: function (value) {
        if (value.trim().length > 2) {
          let self = this
          this.filteredProducts = this.etterem.categories.reduce(function (a, b) {
            return a.products.concat(b.products)
          })
            .filter(function (obj) {
              return obj.name.toUpperCase().includes(self.productSearch.toUpperCase())
            })
        }
      }
    },
    methods: {
      ...mapActions({
        modalToggle: 'restaurant/modalToggle',
        setSelectedEtterem: 'restaurant/setSelectedEtterem'
      }),
      closeModal: function () {
        this.productSearch = ''
        this.filteredProducts = []
        this.modalToggle()
      },
      modalClosed: function () {
        this.setSelectedEtterem({})
        this.resetModal()
      },
      resetModal () {
        if (this.isModalOpened) {
          this.modalToggle()
        }
      },
      openAllCat () {
        this.openAll = !this.openAll
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
    margin 0 -8px 8px
    padding 5px 10px

  .restIsClosed
    height 40px
    line-height 40px
    font-size 25px

  .categoryList
    margin 8px 0

  .br-5
    br(5px)
</style>
