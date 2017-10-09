<template>
  <q-list class="row justify-around col-6 no-margin">
    <q-item class="col-2">
      <q-item-side icon="access_time" />
      <q-item-main>
        {{ day }} {{ index }}
      </q-item-main>
    </q-item>
    <q-item class="col-8">
      <q-item-main>
        <q-datetime-range color="brown-4" v-model="nyitvatartas" type="time" class="text-center"/>
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script>
  export default {
    name: 'OpenHours',
    props: ['day', 'index'],
    data () {
      return {
        nyitvatartas: {
          from: null,
          to: null
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>