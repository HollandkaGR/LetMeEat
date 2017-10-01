<template>
  <div class="row">
    <div class="col-lg-8 col-md-12 offset-lg-2">
      <h4>Regisztráció</h4>
      <registration-form></registration-form>
    </div>
  </div>
</template>

<script>
import RegistrationForm from 'src/app/auth/components/Registration'

export default {

  name: 'Registration',
  components: {
    RegistrationForm
  },
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
  
</style>
