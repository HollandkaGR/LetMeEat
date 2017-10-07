<template>
  <div class="row justify-between formWrapper">
    <q-field
      :error="errors.last_name !== undefined"
      :error-label="errors.last_name !== undefined ? errors.last_name[0] : ''"
      class="col-md-6 inputField"
    >
      <q-input
        type="text"
        inverted
        v-model="last_name"
        float-label="Vezetéknév"
        :color="fieldColor"
        :class="fieldShadow"
        @focus="clearError('last_name')"
      />
    </q-field>

    <q-field
      :error="errors.first_name !== undefined"
      :error-label="errors.first_name !== undefined ? errors.first_name[0] : ''"
      class="col-md-6 inputField"
    >
      <q-input
        type="text"
        inverted
        v-model="first_name"
        float-label="Keresztnév"
        :color="fieldColor"
        :class="fieldShadow"
        @focus="clearError('first_name')"
      />
    </q-field>

    <q-field
      :error="errors.email !== undefined"
      :error-label="errors.email !== undefined ? errors.email[0] : ''"
      class="col-md-6 inputField"
    >
      <q-input
        type="email"
        inverted
        v-model="email"
        float-label="Email"
        :color="fieldColor"
        :class="fieldShadow"
        @focus="clearError('email')"
      />
    </q-field>

    <q-field
      :error="errors.phone_number !== undefined"
      :error-label="errors.phone_number !== undefined ? errors.phone_number[0] : ''"
      class="col-md-6 inputField"
    >
      <q-input
        type="tel"
        inverted
        v-model="phone_number"
        prefix="+36"
        float-label="Telefonszám"
        placeholder="301234567"
        :color="fieldColor"
        :class="fieldShadow"
        @focus="clearError('phone_number')"
      />
    </q-field>

    <q-field
      :error="errors.password !== undefined"
      :error-label="errors.password !== undefined ? errors.password[0] : ''"
      class="col-md-6 inputField"
    >
      <q-input
        type="password"
        inverted
        v-model="password"
        float-label="Jelszó (6-10 karakter hosszú)"
        :color="fieldColor"
        :class="fieldShadow"
        @focus="clearError('password')"
      />
    </q-field>

    <q-field
      :error="errors.password_same !== undefined"
      :error-label="errors.password_same !== undefined ? errors.password_same[0] : ''"
      class="col-md-6 inputField"
    >
      <q-input
        type="password"
        inverted
        v-model="password_confirmation"
        float-label="Jelszó újra"
        :color="fieldColor"
        :class="fieldShadow"
        @focus="clearError('password')"
      />
    </q-field>
    <q-btn color="brown-4" @click="tryReg" push class="col-4 offset-4">Regisztráció</q-btn>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { showLoadingScreen, hideLoadingScreen } from 'src/helpers'

  export default {

    name: 'Registration',

    data () {
      return {
        errors: {},
        // last_name: null,
        // first_name: null,
        // email: null,
        // password: null,
        // password_confirmation: null,
        // phone_number: null,
        last_name: 'Rónaszéki',
        first_name: 'Gergő',
        email: 'holika69@gmail.com',
        password: 'secret',
        password_confirmation: 'secret',
        phone_number: '301234567',
        fieldColor: 'brown-4',
        fieldShadow: 'shadow-4'
      }
    },
    methods: {
      ...mapActions({
        register: 'auth/register'
      }),
      tryReg: function () {
        showLoadingScreen('Regisztráció folyamatban...')
        this.errors = {}
        this.register({
          payload: {
            last_name: this.last_name,
            first_name: this.first_name,
            email: this.email,
            phone_number: '+36' + this.phone_number,
            password: this.password,
            password_confirmation: this.password_confirmation
          },
          context: this
        }).then((firstName) => {
          this.$router.replace({
            name: 'index',
            params: {
              message: {
                text: `Isten hozott ${firstName}!`,
                type: 'success'
              }
            }
          })
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
    padding 5px 10px
    & .q-input
      padding 5px
      border 1px solid $dark
      border-radius 3px
</style>