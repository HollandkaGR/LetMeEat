<template>
  <div>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.password.$error }">
      <label class="form__label">Password</label>
      <input class="form__input" v-model.trim="password" @input="$v.password.$touch()">
    </div><span class="form-group__message" v-if="!$v.password.required">Password is required.</span><span class="form-group__message" v-if="!$v.password.minLength">Password must have at least {{ $v.password.$params.minLength.min }} letters.</span>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.repeatPassword.$error }">
      <label class="form__label">Repeat password</label>
      <input class="form__input" v-model.trim="repeatPassword" @input="$v.repeatPassword.$touch()">
    </div><span class="form-group__message" v-if="!$v.repeatPassword.sameAsPassword">Passwords must be identical.</span>
    <pre>
      password: {{ $v.password }}
      repeatPassword: {{ $v.repeatPassword }}
    </pre>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, sameAs, minLength } from 'vuelidate/lib/validators'

  export default {
    data () {
      return {
        password: '',
        repeatPassword: ''
      }
    },
    mixins: [validationMixin],
    validations: {
      password: {
        required,
        minLength: minLength(6)
      },
      repeatPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  }
</script>