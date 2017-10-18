<template>
  <q-item>
    <q-item-main>
      <q-item-tile label>{{ restaurant.name }}</q-item-tile>
      <q-item-tile sublabel>
        <div>{{ restaurant.city.name }}</div>
      </q-item-tile>
      <div class="row items-center restaurantDetails">
        <div class="restaurantDetail">
          <span class="text-black strong">Státusz:</span>
          <q-chip v-if="restaurant.isActive" color="green-4" square class="shadow-1 representStatus text-dark strong">Aktív</q-chip>
          <q-chip v-else color="red-4" square class="shadow-1 representStatus text-dark strong">Inaktív</q-chip>
        </div>
        <div class="restaurantDetail">
          <q-chip ref="target" square class="bg-red-10 representStatus text-dark strong" :class="{ 'bg-green-4': someDayOpens }">
            Nyitvatartás
            <q-popover ref="openHoursPopup" anchor="top middle" self="bottom middle" class="bg-dark round-borders">
              <table class="q-table text-white">
                <tbody>
                  <tr v-for="(day, key) in restaurant.open_hours" :key="key">
                    <td>{{ weekDays[key] }}</td>
                    <td class="text-center">
                      <span v-if="day.isOpenToday" class="text-green-4 strong">{{ day.from }} - {{ day.to }}</span>
                      <span v-else class="text-red-4 strong">ZÁRVA</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </q-popover>
          </q-chip>
        </div>
        <div class="restaurantDetail col">
          <span class="text-black strong">Üzenet:</span>
          <q-input v-if="restaurant.showMessage" type="textarea" readonly disable :min-rows="1" v-model="restaurant.description"/>
          <q-chip v-else color="red-4" square class="shadow-1 representStatus">Inaktív</q-chip>
        </div>
        
      </div>
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
  import { week } from 'src/helpers'

  export default {

    name: 'OverviewItem',
    props: ['restaurant'],
    data () {
      return {
        weekDays: []
      }
    },
    computed: {
      someDayOpens () {
        return this.restaurant.open_hours.some(day => {
          return day.isOpenToday
        })
      }
    },
    methods: {
      editRestaurant () {
        this.$emit('editRestaurant', this.restaurant.id)
      },
      deleteRestaurant () {
        this.$emit('deleteRestaurant', this.restaurant.id)
      }
    },
    mounted () {
      this.weekDays = week()
    }
  }
</script>

<style lang="stylus" scoped>
  .representStatus
    min-width 80px
    justify-content center
    
  .restaurantDetail
    padding 5px 10px
</style>