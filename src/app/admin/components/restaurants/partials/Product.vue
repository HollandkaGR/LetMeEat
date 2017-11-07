<template>
  <q-item class="bg-green-1" style="padding-right:10px;">
    <q-item-main>
      <div class="row justify-between items-center">
        <div class="col text-dark">
          <div>
            {{ product.name }}
            <span v-if="product.inAction" class="bg-red text-white round-borders" style="padding:3px;">Akciós - {{ product.salePercent }}%</span>
          </div>
          <div class="prodDesc">
            {{ product.description }}
          </div>
        </div>
        <div>
          <div class="prodPrice bg-brown-2 text-dark text-bold shadow-3 text-center" :class="{ forSale: product.inAction }" v-html="convertCurrency(product.price)"></div>
          <div v-if="product.inAction" class="prodPrice bg-red text-white strong shadow-3 round-borders text-center" v-html="convertCurrency(forsalePrice(product.price, product.salePercent))" style="margin-top:5px;"></div>
        </div>
      </div>
    </q-item-main>
    <q-item-side class="row justify-between">
      <q-btn small outline color="black" class="no-padding" @click="editProduct" style="margin-right:4px;">
        <q-icon name="mode_edit" size="24px"/>
      </q-btn>
      <q-btn small outline color="red-6" class="no-padding" @click="deleteProduct">
        <q-icon name="delete_forever" size="24px"/>
      </q-btn>
    </q-item-side>
  </q-item>
</template>

<script>
  import { mapActions } from 'vuex'

  import { currencyFormat, salePrice } from 'helpers'

  export default {

    name: 'Product',

    props: ['product'],
    data () {
      return {

      }
    },
    methods: {
      ...mapActions({
        removeProduct: 'admin/removeProduct'
      }),
      editProduct () {
        this.$emit('editProduct', this.product)
      },
      deleteProduct () {
        this.removeProduct({
          prodId: this.product.id,
          catId: this.product.category_id
        })
      },
      convertCurrency: function (value) {
        return currencyFormat(value)
      },
      forsalePrice: function (price, percent) {
        return salePrice(price, percent)
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