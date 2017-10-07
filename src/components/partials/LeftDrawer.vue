<template>
  <div class="wrapper">
    <h5 class="text-center bg-dark text-light">Admin menü</h5>
    <div v-for="route in routes" :key="route">
      <q-side-link v-if="route.meta && route.meta.adminMenu" tag="a" item :to="{ name: route.meta.toRoute }" exact highlight>
        <q-icon :name="route.meta.icon" style="margin-right:10px;"/>
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
