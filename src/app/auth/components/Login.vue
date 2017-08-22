<template>
  <div>
    <q-field
      placeholder="Regisztrált email cím"
      :error="errors.email !== undefined"
      :error-label="errors.email === undefined ? 'Ismeretlen hiba' : errors.email[0]"
    >
      <q-input v-model="email" float-label="Regisztrált email cím" clearable/>
    </q-field>
    <q-field
      helper="Regisztrált e-mail cím"
      :error="errors.password !== undefined"
      :error-label="errors.password === undefined ? 'Ismeretlen hiba' : errors.password[0]"
    >
      <q-input v-model="password" />
    </q-field>
    <div class="item no-margin">
      <div class="item-content full-width">
        <button @click.prevent="login" class="primary glossy full-width">Bejelentkezés</button>
      </div>
    </div>
  </div>
</template>

<script>
  'use strict'
  import { mapActions, mapGetters } from 'vuex'
  import { Loading, QField, QInput, QTransition } from 'quasar'
  import { showPopup } from 'src/helpers'
  
  export default {
    components: {
      QField, QInput, QTransition
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
        Loading.show({
          spinner: 'rings',
          spinnerSize: 250,
          spinnerColor: 'white'
        })
        this.tryLogin({
          payload: {
            email: this.email,
            password: this.password
          },
          context: this
        }).then((user) => {
          showPopup('Üdvözlünk ' + user.first_name + '!', 'info')
          Loading.hide()
        }).catch(() => {
          Loading.hide()
        })
      }
    }
  }
</script>
