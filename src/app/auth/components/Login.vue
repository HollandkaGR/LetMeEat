<template>
  <div class="relative-position">
    <q-alert
      v-if="errors.root"
      position="bottom-center"
      color="red"
      icon="cloud"
      enter="slideInUp"
      leave="bounceOutDown"
      appear
    >
      {{ errors.root }}
    </q-alert>
    <q-field
      placeholder="Regisztrált email cím"
      :error="errors.email !== undefined"
      :error-label="errors.email === undefined ? 'Ismeretlen hiba' : errors.email[0]"
      class="inputField"
    >
      <q-input v-model="email" float-label="Regisztrált email cím" inverted color="brown-4" clearable @focus="clearError('email')"/>
    </q-field>
    <q-field
      placeholder="Jelszó"
      :error="errors.password !== undefined"
      :error-label="errors.password === undefined ? 'Ismeretlen hiba' : errors.password[0]"
      class="inputField"
    >
      <q-input v-model="password" float-label="Jelszó" inverted color="brown-4" clearable type="password" @focus="clearError('password')"/>
    </q-field>
    <div class="item no-margin">
      <q-btn @click.prevent="login" push color="brown-4">
        Bejelentkezés
      </q-btn>
    </div>
  </div>
</template>

<script>
  'use strict'
  import { mapActions, mapGetters } from 'vuex'
  import { QField, QInput, QTransition, QBtn } from 'quasar'
  import { showPopup, showLoadingScreen, hideLoadingScreen } from 'src/helpers'
  import 'quasar-extras/animate/slideInUp.css'
  import 'quasar-extras/animate/bounceOutDown.css'
  
  export default {
    components: {
      QField, QInput, QTransition, QBtn
    },
    data () {
      return {
        email: 'holika69@gmail.com',
        password: 'secret',
        errors: {}
      }
    },
    computed: {
      ...mapGetters({
        user: 'auth/getUser'
      })
    },
    methods: {
      ...mapActions({
        tryLogin: 'auth/login'
      }),
      login: function () {
        showLoadingScreen('Bejelentkezés folyamatban...')
        this.tryLogin({
          payload: {
            email: this.email,
            password: this.password
          },
          context: this
        }).then((user) => {
          showPopup('Üdvözlünk ' + user.first_name + '!', 'success')
          hideLoadingScreen()
        }).catch(() => {
          hideLoadingScreen()
        })
      },
      clearError (fieldName) {
        if (this.errors[fieldName] !== undefined) {
          delete this.errors[fieldName]
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'
  .inputField
    & .q-input
      padding 5px
      border 1px solid $dark
      border-radius 3px
</style>
