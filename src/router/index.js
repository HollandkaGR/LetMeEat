import Vue from 'vue'
import VueRouter from 'vue-router'
import { beforeEach } from './beforeEach'

Vue.use(VueRouter)

function load (component) {
  return () => import(`@/pages/${component}.vue`)
}

const router = new VueRouter({
  routes: [{
    path: '/',
    name: 'index',
    component: load('Index')
  },
  {
    path: '/bejelentkezes',
    name: 'login',
    component: load('Login'),
    meta: {
      guest: true
    }
  },
  {
    path: '/ettermek',
    name: 'restaurants',
    component: load('Home'),
    meta: {
      guest: true
    }
  },
  {
    path: '/rendeleseim',
    name: 'orders',
    component: load('Orders'),
    meta: {
      needsAuth: true
    }
  },
  {
    path: '/test',
    name: 'test',
    component: load('Test')
  },
  {
    path: '*',
    component: load('Error404')
  }
  ]
})

router.beforeEach(beforeEach)
// router.afterEach(afterEach)

export default router
