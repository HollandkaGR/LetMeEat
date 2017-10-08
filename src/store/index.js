import auth from './../app/auth/vuex'
import restaurant from './../app/restaurant/vuex'
import cart from './../app/cart/vuex'
import order from './../app/order/vuex'
import admin from './../app/admin/vuex'
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  modules: {
    auth, restaurant, cart, order, admin
  }
})
