<template>
  <q-item class="bg-green-1">
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
    <q-item-side class="row">
      <q-btn small flat color="green-8" class="no-padding" @click="editProduct">
        <q-icon name="mode_edit" size="24px"/>
      </q-btn>
      <q-btn small flat color="red-8" class="no-padding" @click="removeCategory(category.id)">
        <q-icon name="delete_forever" size="24px"/>
      </q-btn>
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
      editProduct () {
        this.$emit('editProduct', this.product)
      },
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