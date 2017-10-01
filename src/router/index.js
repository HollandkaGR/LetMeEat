import Vue from 'vue'
import VueRouter from 'vue-router'
import { beforeEach } from './beforeEach'

Vue.use(VueRouter)

function load (component) {
  return () => import(`@/pages/${component}.vue`)
}

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      component: load('Index'),
      meta: {
        label: 'Főoldal',
        icon: 'home'
      },
      props: {default: true, logoutSuccess: false}
    },
    {
      path: '/regisztracio',
      name: 'registration',
      component: load('Registration'),
      meta: {
        label: 'Regisztráció',
        icon: 'account_circle',
        guest: true
      }
    },
    {
      path: '/bejelentkezes',
      name: 'login',
      component: load('Login'),
      meta: {
        label: 'Bejelentkezés',
        icon: 'account_circle',
        guest: true
      }
    },
    {
      path: '/adataim',
      name: 'userDetails',
      component: load('UserDetails'),
      meta: {
        label: 'Adataim',
        icon: 'account_circle',
        needsAuth: true
      }
    },
    {
      path: '/ettermek',
      name: 'restaurants',
      component: load('Home'),
      meta: {
        label: 'Éttermek',
        icon: 'search',
        guest: true
      }
    },
    {
      path: '/rendeleseim',
      name: 'orders',
      component: load('Orders'),
      meta: {
        label: 'Rendelések',
        icon: 'playlist_add_check',
        needsAuth: true
      }
    },
    {
      path: '/kosaram',
      name: 'cart',
      component: load('Cart'),
      meta: {
        label: 'Kosár',
        icon: 'shopping_cart',
        needsAuth: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: load('Logout'),
      meta: {
        label: 'Kijelentkezés',
        icon: 'exit_to_app',
        needsAuth: true
      }
    },
    {
      path: '/test',
      name: 'test',
      component: load('Test'),
      meta: {
      }
    },
    {
      path: '*',
      name: '404',
      component: load('Error404'),
      meta: {
      }
    }
  ]
})

router.beforeEach(beforeEach)
// router.afterEach(afterEach)

export default router
