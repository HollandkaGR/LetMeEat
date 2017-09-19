<template>
  <div>
    <q-btn color="white" class="relative-position text-dark">
      <q-icon name="shopping_cart"/>
        {{ cartItemCount }}
      <q-tooltip :delay="500">Kosár tartalma {{ cartItemCount }} termék</q-tooltip>

      <!-- Popover a MiniCartra kattintva -->
      <q-popover ref="miniCartPopover" anchor="bottom right" self="top right" max-height="550px" class="bg-light">

        <!-- Csak akkor van tartalom, ha van valami a kosárban -->
        <q-list v-if="getRestNumber > 0" style="min-width: 350px" class="no-border relative-position no-padding">

          <q-list-header style="font-size: 20px;" class="text-black bg-brown-2 text-center no-padding borderBottom">
            A kosár tartalma
          </q-list-header>

          <q-scroll-area style="width: 100%; height: 400px;" class="restScrollArea">

          <!-- A kosárban éttermenként jelenik meg a rendelés -->
          <q-list v-for="restaurant in getCart" :key="restaurant" class="bg-light-green-1 no-padding">
            
            <div class="restName text-black bg-green strong">{{ restaurant.restaurant.name }}</div>

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
            <q-item v-if="getRestNumber > 1" class="col justify-between bg-grey-4">
              <q-item-side class="text-dark strong">
                Részösszeg
              </q-item-side>
              <q-item-main class="text-center col-3 bg-light strong text-dark shadow-4">
                {{ convertCurrency(restaurant.subTotal) }},-
              </q-item-main>
            </q-item>
          </q-list>
          </q-scroll-area>
          <q-item class="totalPrice col justify-between bg-brown-2 borderTop borderBottom">
            <q-item-side class="text-dark strong">
              Összesen
            </q-item-side>
            <q-item-main class="text-center col-3 bg-light strong text-dark shadow-3">
              {{ convertCurrency(cartTotal) }},-
            </q-item-main>
          </q-item>
          <div class="row orderBtn">
            <q-btn color="green" class="col-6 offset-3 text-black strong glossy">Rendelés</q-btn>
          </div>
        </q-list>
        <!-- Ha a kosár üres -->
        <div v-else class="emptyCartMsg">
          A kosár üres!
        </div>
      </q-popover>
    </q-btn>
  </div>
</template>

<script>
  import { currencyFormat } from 'src/helpers'
  import { mapGetters, mapActions } from 'vuex'
  import 'quasar-extras/animate/slideOutLeft.css'

  export default {
    computed: {
      ...mapGetters({
        cartItemCount: 'cart/cartItemCount',
        getCart: 'cart/getCart',
        cartTotal: 'cart/cartTotal',
        getRestNumber: 'cart/getRestNumber'
      })
    },
    methods: {
      ...mapActions({
        fetchCart: 'cart/fetchCart',
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
    },
    mounted: function () {
      this.fetchCart()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'
  
  .restScrollArea
    padding 5px

  .restWrapper
    border 1px solid black

  .restName
    padding: 8px 16px

  .changeQuantity
    font-size 22px

  .productTotal
    margin-top 5px
    padding: 5px    

  .emptyCartMsg
    padding 10px
    background $red-8
    color white
    
  .borderBottom
    border-bottom 2px solid $dark
  .borderTop
    border-top 2px solid $dark
    
  .totalPrice
    height 40px
    
  .orderBtn
    margin: 5px 0
    height 40px

</style>
