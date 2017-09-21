<template>
  <div>
    <q-item 
      multiline inset-separator
      v-for="item in restaurant.products"
      :key="item"
      class="row items-center justify-between"
    >
      <q-item-main class="col-9">
        <q-item-tile label>{{item.product.name}}</q-item-tile>
        <q-item-tile sublabel lines="2">
          {{ item.quantity }} adag<br>
          Egységár: {{ convertCurrency(item.product.price) }},-
        </q-item-tile>
      </q-item-main>

      <!-- A termékkel kapcsolatos műveletek és összegek -->
      <div class="rightSide row justify-center col-3">
        <q-btn flat small color="red-8" :disable="item.quantity === 1" class="changeQuantity no-padding col-4" @click="subQuantity(restaurant.restaurant, item.product.id)">
          <q-icon name="remove" size="20px"/>
        </q-btn>

        <q-btn flat small color="dark" class="no-padding col-4" @click="subQuantity(restaurant.restaurant, item.product.id, item.quantity)">
          <q-icon name="remove_shopping_cart" size="20px"/>
        </q-btn>

        <q-btn flat small color="green-8" class="changeQuantity no-padding col-4" @click="incQuantity(restaurant.restaurant, item.product)">
          <q-icon name="add" size="20px"/>
        </q-btn>

        <div class="productTotal fit text-center bg-brown-4 strong text-white shadow-3">
          {{ convertCurrency(item.product.price * item.quantity) }},-
        </div>
      </div>
    </q-item>
  </div>
</template>

<script>
  import { currencyFormat } from 'src/helpers'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    props: [ 'restaurant' ],
    computed: {
      ...mapGetters({})
    },
    methods: {
      ...mapActions({
        addProductToCart: 'cart/addProductToCart',
        removeProductFromCart: 'cart/removeProductFromCart'
      }),
      incQuantity: function (restaurant, product) {
        this.addProductToCart({
          restaurant,
          product: product,
          quantity: 1
        })
      },
      subQuantity: function (restaurant, productId, quantity = 1) {
        this.removeProductFromCart({
          restaurant,
          productId,
          quantity: quantity
        })
          // Ha nem marad termék a kosárban bezárjuk a popovert
          .then(() => {
            if (this.getRestNumber === 0) {
              this.$refs.miniCartPopover.close()
            }
          })
      },
      convertCurrency: function (value) {
        return currencyFormat(value)
      }
    }
  }
</script>
