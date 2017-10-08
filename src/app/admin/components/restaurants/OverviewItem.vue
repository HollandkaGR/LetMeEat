<template>
  <q-item>
    <q-item-main>
      <q-item-tile label>{{ restaurant.name }}</q-item-tile>
      <q-item-tile sublabel>
        <div color="">{{ restaurant.city }}</div>
        <q-btn color="">Nyitva</q-btn>
      </q-item-tile>
    </q-item-main>
    <q-item-side right>
      <div class="actionButtons">
        <q-btn small flat color="green-4" class="no-padding" @click="editRestaurant">
          <q-icon name="mode_edit" size="24px"/>
        </q-btn>
        <q-btn small flat color="red-4" class="no-padding" @click="deleteRestaurant">
          <q-icon name="delete" size="24px"/>
        </q-btn>
      </div>
    </q-item-side>
  </q-item>
</template>

<script>
  export default {

    name: 'OverviewItem',
    props: ['restaurant'],
    data () {
      return {

      }
    },
    methods: {
      editRestaurant () {
        this.$emit('editRestaurant', this.restaurant.id)
      },
      deleteRestaurant () {
        this.$emit('deleteRestaurant', this.restaurant.id)
      }
    }
  }
</script>

<style lang="css" scoped>
</style>