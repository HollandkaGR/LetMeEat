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
        v-model="user.last_name"
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
        v-model="user.first_name"
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
        v-model="user.email"
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
        v-model="user.phone_number"
        float-label="Telefonszám"
        placeholder="+36301234567"
        :color="fieldColor"
        :class="fieldShadow"
        @focus="clearError('phone_number')"
      />
    </q-field>

    <q-btn color="brown-4" @click="tryUpdate" class="col-4 offset-4">Adatok módosítása</q-btn>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { showLoadingScreen, hideLoadingScreen, showPopup } from 'src/helpers'

  export default {

    name: 'UserDetailsComp',

    data () {
      return {
        errors: {},
        user: {
          last_name: null,
          first_name: null,
          email: null,
          phone_number: null
        },
        password: null,
        password_confirmation: null,
        fieldColor: 'brown-4',
        fieldShadow: 'shadow-4'
      }
    },
    computed: {
      ...mapGetters({
        getUser: 'auth/getUser'
      })
    },
    methods: {
      ...mapActions({
        updateUser: 'auth/updateUser'
      }),
      tryUpdate: function () {
        showLoadingScreen('A módosítás folyamatban...')
        this.errors = {}
        this.updateUser({
          payload: {
            last_name: this.user.last_name,
            first_name: this.user.first_name,
            email: this.user.email,
            phone_number: this.user.phone_number
          },
          context: this
        }).then(() => {
          showPopup('A módosítás megtörtént', 'success')
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
    },
    mounted () {
      this.user = this.getUser.data
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