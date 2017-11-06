<template>
  <div class="row justify-center">
    <div v-if="getSelectedRestaurant.indexImage === null" class="col-auto" style="margin:10px auto;">
      <q-btn outline color="green-4" @click="toggleShow">Kép feltöltése</q-btn>
    </div>
    <div v-else class="col-12 row justify-center">
      <div class="col-12 row justify-center" style="margin:10px 0;">
        <q-btn flat color="red-4" @click="deleteIndexImage">Törlés</q-btn>
        <q-btn flat color="green-4" @click="toggleShow">Módosítás</q-btn>
      </div>
      <div class="bg-grey-6 col-auto" style="padding:3px;max-width:100%;">
        <img :src="indexUrl" alt="" class="responsive" style="display:block;margin:0 auto;">
      </div>
    </div>

    <my-upload 
      field="restIndexImage"
      :langExt="uploaderLang"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      :width="minImageWidth"
      :height="minImageHeight"
      :url="url"
      :params="params"
      :headers="headers"
      img-format="jpg"
      noCircle
      class="restIndexUploader"
    >
  </my-upload>
</div>
</template>

<script>
  import myUpload from 'vue-image-crop-upload'
  import axios from 'axios'
  import { mapGetters, mapActions } from 'vuex'

  export default {

    name: 'ImageUploader',
    components: {
      myUpload
    },
    data () {
      return {
        maxFileSize: 5242880,
        minImageWidth: 640,
        minImageHeight: 360,
        show: false,
        url: axios.defaults.baseURL + '/restaurant/image/upload',
        headers: {
          Authorization: axios.defaults.headers.common['Authorization']
        },
        imgDataUrl: '' // the datebase64 url of created image
      }
    },
    computed: {
      ...mapGetters({
        getSelectedRestaurant: 'admin/getSelectedRestaurant'
      }),
      params () {
        return {
          file: 'restIndex',
          restId: this.getSelectedRestaurant.id
        }
      },
      indexUrl () {
        if (typeof this.getSelectedRestaurant.indexImage !== 'undefined') {
          return axios.defaults.baseURL + this.getSelectedRestaurant.indexImage
        }
        return null
      },
      uploaderLang () {
        return {
          hint: 'Kép hozzáadásához kattintson ide!',
          loading: 'Feltöltés…',
          noSupported: 'A jelenlegi böngésző nem támogatott!',
          success: 'Sikeres feltöltés!',
          fail: 'A feltöltés sikertelen!',
          preview: 'Előnézet',
          btn: {
            off: 'Mégse',
            close: 'Bezár',
            back: 'Vissza',
            save: 'Mentés'
          },
          error: {
            onlyImg: 'Csak kép',
            outOfSize: 'A kép mérete túl nagy, maximum ' + this.maxFileSize / 1024 / 1024 + 'MB lehet!',
            lowestPx: 'A kép felbontásának minimum követelménye: '
          }
        }
      }
    },
    methods: {
      ...mapActions({
        setSelectedRestaurant: 'admin/setSelectedRestaurant',
        removeIndexImage: 'admin/removeIndexImage'
      }),
      deleteIndexImage () {
        this.removeIndexImage({
          restId: this.getSelectedRestaurant.id
        })
      },
      toggleShow () {
        this.show = !this.show
      },
      /**
       * upload success
       *
       * [param] jsonData  server api return data, already json encode
       * [param] field
       */
      cropUploadSuccess (jsonData, field) {
        this.setSelectedRestaurant(jsonData.data)
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail (status, field) {
        console.log('-------- upload fail --------')
        console.log(status)
        console.log('field: ' + field)
      }
    }
  }
</script>

<style lang="stylus">
  .restIndexUploader 
    & .vicp-crop
      display flex!important
      justify-content space-around
      & .vicp-crop-right
        display flex
        align-items: center
      & .vicp-preview-item
        margin-right 0!important
        & img
          margin 0!important
    
</style>