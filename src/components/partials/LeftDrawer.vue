<template>
  <div class="wrapper">
    <div v-for="route in routes" :key="route">
      <q-side-link v-if="route.meta && route.meta.needsAuth" tag="a" item :to="{ name: route.name }" exact highlight>
        <q-item-main :label="route.meta.label" />
      </q-side-link>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        routes: []
      }
    },
    mounted: function () {
      for (let route of Object.values(this.$router.options.routes)) {
        this.routes.push(route)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .wrapper
    margin-top 80px
</style>
