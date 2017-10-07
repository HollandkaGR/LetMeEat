<template>
  <div class="error-page window-height window-width column items-center no-wrap">
    <div class="error-code bg-light flex text-dark items-center justify-center">
      404
    </div>
    <div>
      <div class="error-card shadow-4 bg-white column items-center justify-center no-wrap">
        <q-icon name="error_outline" color="red-8" />
        <p class="text-center">Nincs ilyen tartalom az oldalon...</p>
        <p class="text-center group">
          <q-btn
            v-if="canGoBack"
            color="brown-4"
            push
            @click="goBack"
            icon="keyboard_arrow_left"
          >
            Vissza
          </q-btn>
          <q-btn
            color="brown-4"
            push
            @click="$router.replace({ name: 'home' })"
            icon-right="home"
          >
            Főoldal
          </q-btn>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { QBtn, QIcon } from 'quasar'

export default {
  components: {
    QBtn,
    QIcon
  },
  data () {
    return {
      canGoBack: window.history.length > 1
    }
  },
  methods: {
    goBack () {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.error-page
  padding-top 80px
  .error-code
    height 50vh
    width 100%
    font-size 20vmax
    color rgba(255, 255, 255, .2)
    overflow hidden
  .error-card
    border-radius 2px
    margin-top -50px
    width 80vw
    max-width 600px
    padding 25px
    > i
      font-size 5rem
</style>
