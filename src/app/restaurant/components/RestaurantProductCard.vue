<template>
  <div class="productCard row justify-between bg-white shadow-10">
    <div class="prodNamePrice col-12 text-dark row justify-between items-center">
        <div class="prodName col-8">
          {{ product.name }}
        </div>
        <div class="prodPrice bg-brown-2 text-dark text-bold shadow-3" v-html="convertCurrency(product.price)"/>
    </div>
    <div class="prodBody row col-md-12 col-lg-9">
      <div class="prodDetails">
        {{ product.description }}
      </div>
    </div>
    <div v-if="getSelectedEtterem.isOpen" class="cartWrapper row justify-center items-center col-lg-2">
      <div class="row justify-around items-center counterWrapper col-xs-6 col-lg-12 bg-dark text-white shadow-2">
        <q-btn rounded color="red" class="changeValueBtn" :disable="prodCounter === 1" @click="changeCounter(-1)">-</q-btn>
        <div class="prodCounterDisplay">{{ prodCounter }} db</div>
        <q-btn rounded color="green" class="changeValueBtn" :disable="prodCounter === 5" @click="changeCounter(1)">+</q-btn>
      </div>
      <q-btn color="brown-4" small icon="add_shopping_cart" class="toCartBtn col-xs-6 col-lg-12 self-stretch shadow-2" @click="addToCart">
        Kosárba
      </q-btn>
    </div>
  </div>
</template>

<script>
  import { currencyFormat } from 'src/helpers'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
    },
    data: function () {
      return {
        prodCounter: 1
      }
    },
    props: [ 'product' ],
    computed: {
      ...mapGetters({
        getSelectedEtterem: 'restaurant/getSelectedEtterem'
      })
    },
    methods: {
      ...mapActions({
        addProductToCart: 'cart/addProductToCart'
      }),
      addToCart: function () {
        this.addProductToCart({
          restaurant: this.getSelectedEtterem,
          product: this.product,
          quantity: this.prodCounter
        })
      },
      changeCounter: function (value) {
        this.prodCounter = this.prodCounter + value
      },
      convertCurrency: function (value) {
        return currencyFormat(value)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'

  .productCard
    margin 10px 0

  .prodNamePrice
    border-bottom 1px solid $brown-2

  .prodName
    padding 5px
    font-size 20px
    line-height 30px

  .changeValueBtn
    width 25px
    height 25px
    min-height 25px
    line-height 25px
    font-weight bold
    padding 0

  .prodPrice
    padding 5px
    letter-spacing 2px

  .prodBody
    padding 10px

  .cartWrapper
    padding 10px
    
  .counterWrapper
    padding 5px 0
    
  .prodCounterDisplay
    min-width 30px
    text-align center
    
  .toCartBtn
    padding 5px 0
</style>
