<template>
  <q-route-tab
    v-if="item.meta.mainMenu"
    :icon="item.meta.icon"
    :label="item.meta.label"
    :to="{ name: 'index' }"
    exact
    slot="title"
    >
  </q-route-tab>
</template>

<script>
  export default {
    props: ['item'],
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>