<template>
    <q-transition
      appear
      group
      enter="fadeIn"
      leave="fadeOut"
      duration="200"
      class="row justify-between items-start"
    >
      <q-field
        icon="my_location"
        key="streetName"
        color="brown-4"
        :error="streetNotFound"
        :error-label="errorMsg"
        :helper="charsLeft"
        class="col-9 relative-position"
      >
        <q-input
          float-label="A közterület nevének eleje"
          inverted
          :color="isStreetSelected ? 'green-4' : cantSearch ? 'gray' : 'red-4'"
          v-model="searchingFor"
          @change="searchChanged"
          :disable="cantSearch"
          class="relative-position streetField"
        >
          <q-autocomplete
            ref="streetPicker"
            @search="search"
            :debounce="1000"
            @selected="streetSelect"
          />
          <q-btn v-if="isStreetSelected" @click="resetSearching" small round push color="red-6" class="clearBtn">
            <q-icon name="clear" color="light"></q-icon>
          </q-btn>
        </q-input>
      </q-field>
      <q-field
        v-show="isStreetSelected"
        class="col"
        key="streetNumber"
        style="margin-left:10px;"
      >
        <q-input
          v-model="houseNumber"
          type="text"
          :max-length="8"
          float-label="Házszám"
          inverted
          :color="isHouseNumberSelected ? 'green-4' : 'red-4'"
          @change="streetNumberChanged"
        />
      </q-field>
    </q-transition>
</template>

<script>
  import 'quasar-extras/animate/fadeIn.css'
  import 'quasar-extras/animate/fadeOut.css'
  import { mapGetters, mapActions } from 'vuex'
  import axios from 'axios'
  import { isEmpty } from 'lodash'
  import {
    QAutocomplete,
    QSearch,
    QInput,
    filter
  } from 'quasar'

  function remapPredictions (preds) {
    return preds.map(pred => {
      return {
        label: pred.structured_formatting.main_text,
        value: pred.structured_formatting.main_text
      }
    })
  }

  export default {
    components: {
      QAutocomplete,
      QSearch,
      QInput
    },
    data () {
      return {
        searchDelay: 500,
        minCharForSearch: 2,
        streetNotFound: false,
        searchingFor: '',
        streetSelected: false,
        houseNumber: null
      }
    },
    computed: {
      ...mapGetters({
        city: 'order/getCity',
        getStreet: 'order/getStreet',
        isStreetSelected: 'order/isStreetSelected',
        getHouseNumber: 'order/getHouseNumber',
        isHouseNumberSelected: 'order/isHouseNumberSelected'
      }),
      charsLeft () {
        if (this.searchLength < this.minCharForSearch) {
          return `Még ${this.minCharForSearch - this.searchLength} karaktert írj be!`
        }
        else {
          if (this.isStreetSelected) {
            return 'A cím rögzítve, törlésre a piros "X"-et használd!'
          }
          return 'Máris keresem a címet!'
        }
      },
      cantSearch () {
        return this.isStreetSelected || this.city === null
      },
      errorMsg () {
        if (this.city === null) {
          return 'Nincs település kiválasztva!'
        }
        else if (!this.isStreetSelected) {
          return `Nincs "${this.searchingFor}"-vel kezdődő utcanév ${this.city} településen`
        }
        else {
          return 'Ismeretlen hiba'
        }
      },
      searchLength () {
        return this.searchingFor.length
      }
    },
    methods: {
      ...mapActions({
        setStreet: 'order/setStreet',
        resetStreet: 'order/resetStreet',
        setHouseNumber: 'order/setHouseNumber'
      }),
      search (terms, done) {
        if (this.searchLength >= this.minCharForSearch) {
          setTimeout(() => {
            axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + this.city + '%20' + this.searchingFor + '&types=address&key=AIzaSyCxlWDG-Yd1-fNs_pf_B8JIiTgwD7GQ-9c')
              .then(response => {
                if (!isEmpty(response.data.predictions)) {
                  let remappedPredictions = remapPredictions(response.data.predictions)
                  // console.log(filter(terms, {field: 'label', list: remappedPredictions}))
                  done(filter(terms, {field: 'label', list: remappedPredictions}))
                }
                else {
                  this.streetNotFound = true
                  done({})
                }
              })
              .catch(error => {
                console.log(error)
                done({})
              })
          }, this.searchDelay)
        }
        else {
          done({})
        }
      },
      streetSelect (item) {
        this.setStreet(item.value)
      },
      resetSearching () {
        this.searchingFor = ''
        this.houseNumber = null
        this.resetStreet()
        this.searchChanged()
      },
      searchChanged () {
        this.streetNotFound = false
      },
      streetNumberChanged (newValue) {
        setTimeout(() => {
          if (newValue.length > 0) {
            this.setHouseNumber(newValue)
          }
          else {
            this.setHouseNumber(null)
          }
        }, 500)
      }
    },
    mounted () {
      if (this.getStreet) {
        this.$refs.streetPicker.setValue({label: this.getStreet, value: this.getStreet})
        if (this.getHouseNumber) {
          this.houseNumber = this.getHouseNumber
        }
        else {
          this.houseNumber = null
        }
      }
    }
  }
</script>

<style lang="stylus">
  .streetField .q-input-target:disabled
    opacity 1!important
</style>

<style lang="stylus" scoped>
  @import '~variables'

  .clearBtn
    position absolute
    height: 28px;
    width: 28px;
    top 50%
    right 0px
    transform translateY(-50%)
    
</style>
