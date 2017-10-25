<template>
  <div>
    <h2 class="no-margin">Éttermeim</h2>
    <transition
      name="transitions"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
      duration="200"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import 'quasar-extras/animate/fadeIn.css'
  import 'quasar-extras/animate/fadeOut.css'

  export default {
    name: 'MyRestaurants'
  }
</script>

<style lang="stylus" scoped>

</style>