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
    >
      <q-input v-model="email" float-label="Regisztrált email cím" inverted color="brown-4" clearable/>
    </q-field>
    <q-field
      placeholder="Jelszó"
      :error="errors.password !== undefined"
      :error-label="errors.password === undefined ? 'Ismeretlen hiba' : errors.password[0]"
    >
      <q-input v-model="password" float-label="Jelszó" inverted color="brown-4" clearable type="password"/>
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
  import { Loading, QField, QInput, QTransition, QBtn, QSpinnerFacebook, Alert, QAlert } from 'quasar'
  import { showPopup } from 'src/helpers'
  import 'quasar-extras/animate/slideInUp.css'
  import 'quasar-extras/animate/bounceOutDown.css'
  
  export default {
    components: {
      QField, QInput, QTransition, QBtn, QSpinnerFacebook, Loading, Alert, QAlert
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
          spinner: QSpinnerFacebook,
          spinnerSize: 250,
          spinnerColor: 'white',
          message: 'Bejelentkezés folyamatban'
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
