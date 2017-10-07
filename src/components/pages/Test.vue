<template>
  <div class="row justify-between items-center">
    <q-field
      color="brown-4"
      :error="streetNotFound"
      :error-label="errorMsg"
      :helper="charsLeft"
      class="col relative-position"
    >
      <q-input
        color="amber"
        v-model="searchingFor"
        placeholder="Írd be legalább az első 3 karaktert a közterület névből"
        @change="searchChanged"
        :disable="streetSelected"
      >
        <q-autocomplete
          @search="search"
          :debounce="1000"
          @selected="selected"
        />
      </q-input>
      <q-btn v-if="streetSelected" @click="resetSearching" small round push color="red-6" class="clearBtn">
        <q-icon name="clear" color="light"></q-icon>
      </q-btn>
    </q-field>
  </div>
</template>

<script>
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
        minCharForSearch: 3,
        city: 'Pécs',
        streetNotFound: false,
        errorMsg: '',
        searchingFor: '',
        streetSelected: false
      }
    },
    computed: {
      charsLeft () {
        if (this.searchLength < this.minCharForSearch) {
          return `Még ${this.minCharForSearch - this.searchLength} karaktert írj be!`
        }
        else {
          return ''
        }
      },
      searchLength () {
        return this.searchingFor.length
      }
    },
    methods: {
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
                  this.errorMsg = `Nincs "${this.searchingFor}"-vel kezdődő utcanév ${this.city} településen`
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
      selected (item) {
        this.streetSelected = true
        // Beállítás a címhez
        console.log(item.value)
      },
      resetSearching () {
        this.searchingFor = ''
        this.searchChanged()
      },
      searchChanged () {
        this.streetSelected = false
        this.streetNotFound = false
        this.errorMsg = ''
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'

  .clearBtn
    position absolute
    height: 28px;
    width: 28px;
    top 50%
    right 0
    transform translateY(-50%)
    
</style>
