<template>
  <div class="bg-grey round-borders" style="margin-top:20px;padding:5px;">
    <div class="col-6 strong text-center" style="padding:10px 0;">Borítókép feltöltés</div>
    <q-field class="col-6 no-margin" helper="Maximum 5MB nagyságú kép feltöltése lehetséges. A legjobb élmény érdekében 16:9 képarányú legyen!">
      <q-uploader
        ref="uploader"
        name="restIndex"
        :headers="headers"
        :additionalFields="fields"
        :url="url"
        hide-upload-button
        color="black"
        extensions=".gif,.jpg,.jpeg,.png"
      />
    </q-field>
    <q-btn style="margin: 0 auto" @click="startUpload">Feltöltés</q-btn>
  </div>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'

  export default {

    name: 'Uploader',

    data () {
      return {
        url: axios.defaults.baseURL + '/restaurant/image/upload',
        headers: {
          Authorization: axios.defaults.headers.common['Authorization']
        }
      }
    },
    computed: {
      ...mapGetters({
        getSelectedRestId: 'admin/getSelectedRestId'
      }),
      fields: function () {
        return [
          {
            'name': 'restId',
            'value': this.getSelectedRestId
          }
        ]
      }
    },
    methods: {
      startUpload () {
        this.$refs.uploader.upload()
      }
    },
    mounted () {
      console.log(axios.defaults.headers.common['Authorization'])
    }
  }
</script>

<style lang="stylus" scoped>

</style>