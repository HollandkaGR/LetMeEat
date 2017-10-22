<template>
  <q-item>
    <q-item-main>
      <div class="row justify-between items-center">
        <div class="col text-dark">
          <div>
            {{ product.name }}
          </div>
          <div class="prodDesc">
            {{ product.description }}
          </div>
        </div>
        <div class="prodPrice bg-brown-2 text-dark text-bold shadow-3" v-html="convertCurrency(product.price)"></div>
      </div>
    </q-item-main>
    <q-item-side right>
      <q-item-tile icon="chat_bubble" color="green" />
    </q-item-side>
  </q-item>
</template>

<script>
  import { currencyFormat } from 'helpers'

  export default {

    name: 'Product',

    props: ['product'],
    data () {
      return {

      }
    },
    methods: {
      convertCurrency: function (value) {
        return currencyFormat(value)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .prodPrice
    padding 5px
    letter-spacing 2px

  .prodDesc
    padding 10px

</style>