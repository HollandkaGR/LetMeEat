<template>
  <div>
    <q-modal ref="orderModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}" @open="modalOpened" @close="modalClosed" noBackdropDismiss>
      <q-modal-layout>
        <q-toolbar slot="header" color="dark">
          <q-btn flat @click="closeModal">
            <q-icon name="keyboard_arrow_left" />
          </q-btn>
          <q-toolbar-title>
            {{ getSelectedEtterem.name }}
          </q-toolbar-title>
          <mini-cart></mini-cart>
        </q-toolbar>

        <q-toolbar slot="header" color="light">
          <q-search inverted v-model="productSearch" color="brown-4" placeholder="Írj be legalább 3 karaktert!" float-label="Tudod mit keresel?"></q-search>
        </q-toolbar>
        
        <div class="layout-padding">
          <div class="restName text-brown-8 thin-paragraph shadow-3 bg-brown-2 text-center">
            {{ getSelectedEtterem.name }}
          </div>
          <div v-if="getSelectedEtterem.showMessage" style="margin-bottom: 5px;text-align:justify;">
            {{ getSelectedEtterem.description }}
          </div>
          <div v-if="!inSearch" class="relative-position row justify-end">
            <q-btn v-if="!openAll" @click="openAllCat" small class="bg-green-4" style="min-width:160px;">
              Összes kinyit
            </q-btn>
            <q-btn v-else @click="openAllCat" small class="bg-red-4" style="min-width:160px;">
              Összes becsuk
            </q-btn>
          </div>
          <!-- Ha nincs keresés 3 karakter hosszan, megjelenítjük a kategóriákat -->
          <div v-if="!getSelectedEtterem.isOpen" class="text-center bg-red-10 text-white strong restIsClosed" style="margin:8px 0 0;">
            NYITÁS: {{getSelectedEtterem.isOpen}}
          </div>
          <div v-if="productSearch.length < 3">
            <q-list separator v-for="kategoria in getSelectedEtterem.categories" :key="kategoria" class="br-5 no-padding categoryList">
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
  </div>
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
        inSearch: false,
        openAll: false
      }
    },
    computed: {
      ...mapGetters({
        getSelectedEtterem: 'restaurant/getSelectedEtterem',
        orderModal: 'restaurant/getOrderModalRef'
      })
    },
    watch: {
      productSearch: function (value) {
        if (value.trim().length > 2) {
          this.inSearch = true
          let self = this
          this.filteredProducts = this.getSelectedEtterem.categories.reduce(function (a, b) {
            return a.products.concat(b.products)
          })
            .filter(function (obj) {
              return obj.name.toUpperCase().includes(self.productSearch.toUpperCase())
            })
        }
        else {
          this.inSearch = false
        }
      }
    },
    methods: {
      ...mapActions({
        setOrderModalRef: 'restaurant/setOrderModalRef',
        setSelectedEtterem: 'restaurant/setSelectedEtterem',
        fetchProducts: 'restaurant/fetchProducts'
      }),
      closeModal: function () {
        this.productSearch = ''
        this.filteredProducts = []
        this.orderModal.close()
      },
      modalOpened: function () {
        this.openAll = false
        if (this.getSelectedEtterem) {
          this.fetchProducts({
            restId: this.getSelectedEtterem.id
          })
            .then(categories => {
              this.getSelectedEtterem.categories = categories
            })
        }
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
    },
    mounted () {
      this.setOrderModalRef(this.$refs.orderModal)
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
