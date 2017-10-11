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
        icon: 'home',
        guest: true,
        needsAuth: false,
        showIfAuthed: true,
        adminMenu: false
      },
      props: {default: true, logoutSuccess: false}
    },
    {
      path: '/ettermek',
      name: 'restaurants',
      component: load('Home'),
      meta: {
        label: 'Éttermek',
        icon: 'search',
        guest: true,
        needsAuth: false,
        showIfAuthed: true,
        adminMenu: false
      }
    },
    {
      path: '/bejelentkezes',
      name: 'login',
      component: load('Login'),
      meta: {
        label: 'Bejelentkezés',
        icon: 'account_circle',
        guest: true,
        needsAuth: false,
        showIfAuthed: false,
        adminMenu: false
      }
    },
    {
      path: '/regisztracio',
      name: 'registration',
      component: load('Registration'),
      meta: {
        label: 'Regisztráció',
        icon: 'add',
        guest: true,
        needsAuth: false,
        showIfAuthed: false,
        adminMenu: false
      }
    },
    {
      path: '/adataim',
      name: 'userDetails',
      component: load('authed/UserDetails'),
      meta: {
        label: 'Adataim',
        icon: 'account_circle',
        guest: false,
        needsAuth: true,
        showIfAuthed: true,
        adminMenu: true
      }
    },
    {
      path: '/rendeleseim',
      name: 'orders',
      component: load('authed/Orders'),
      meta: {
        label: 'Rendelések',
        icon: 'playlist_add_check',
        guest: false,
        needsAuth: true,
        showIfAuthed: true,
        adminMenu: false
      }
    },
    {
      path: '/kosaram',
      name: 'cart',
      component: load('authed/Cart'),
      meta: {
        label: 'Kosár',
        icon: 'shopping_cart',
        guest: false,
        needsAuth: true,
        showIfAuthed: true,
        adminMenu: false
      }
    },
    {
      path: '/ettermeim',
      component: load('admin/MyRestaurants'),
      children: [
        {
          path: '',
          name: 'ettermeim.index',
          component: load('admin/restaurants/Overview')
        },
        {
          path: 'uj',
          name: 'ettermeim.uj',
          component: load('admin/restaurants/New')
        },
        {
          path: 'modosit',
          name: 'ettermeim.update',
          component: load('admin/restaurants/Update'),
          props: {default: true}
        }
      ],
      meta: {
        toRoute: 'ettermeim.index',
        label: 'Éttermeim',
        icon: 'settings',
        guest: false,
        needsAuth: true,
        showIfAuthed: true,
        adminMenu: true
      }
    },
    {
      path: '/rendelesek',
      component: load('admin/Orders'),
      name: 'ownerOrders',
      meta: {
        toRoute: 'rendelesek',
        label: 'Rendelések',
        icon: 'equalizer',
        guest: false,
        needsAuth: true,
        showIfAuthed: true,
        adminMenu: true
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
