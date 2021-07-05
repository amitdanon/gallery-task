<template>
  <div class="home">
    <form class="form-container">
      <label>
        Search:
        <input v-model="flickrParams.tags" type="text" class="search-input" />
      </label>
      <button type="submit" class="search-button" @click.prevent="handleBtnSearch">
        Search
      </button>
    </form>
    <p v-if="error" class="error-msg">Failed to fetch data</p>
    <div class="list-container">
      <p v-if="loading" class="loading-text">Loading...</p>
      <ul
        v-else
        class="image-card-grid scrolling-component"
        ref="infinitescrolltrigger"
      >
        <image-card
          @eventname="updateparent"
          v-for="(image, index) in images"
          :imageIndex="index"
          :key="image.id+index"
          :image="image"
        />
      </ul>
      <modal ref="modalName">
        <template v-slot:body>
          <img
            class="image-card__image"
            :src="modalData.url_n"
            :alt="modalData.title"
          />
        </template>

        <template v-slot:footer>
          <div class="d-flex align-items-center justify-content-between">
            <button
              :disabled="isDisableModalPagination('prev', modalData.index)"
              class="btn"
              @click="paginationModal(modalData.index - 1)"
            >
              prev
            </button>
            <button
              :disabled="isDisableModalPagination('next', modalData.index)"
              class="btn"
              @click="paginationModal(modalData.index + 1)"
            >
              next
            </button>
          </div>
        </template>
      </modal>
    </div>
    <div v-show="show"  v-if="images.length" v-observe-visibility="visibilityChanged"/>
  </div>
</template>

<script>
import ImageCard from './ImageCard.vue'
import fetchFlickr from '../api/flickr.ts'
import Modal from './Modal.vue'

export default {
  name: 'Gallery',
  components: {
    ImageCard,
    Modal
  },
  data () {
    return {
      error: '',
      loading: true,
      images: [],
      show: true,
      modalData: {},
      flickrParams: {
        page: 1,
        tags: 'dog',
        perPage: 30,
        extras: 'url_n'
      }
    }
  },
  async mounted () {
    await this.loadData()
  },

  methods: {
    async visibilityChanged (isVisible) {
      if (!isVisible) {
        return
      }
      this.flickrParams.page = this.flickrParams.page + 1
      const isConcatImages = true
      await this.handleUnCacheSearch(isConcatImages)
    },
    async loadData () {
      const cacheData = sessionStorage.getItem(this.flickrParams.tags.toString())
      !cacheData ? await this.handleUnCacheSearch() : this.handleCacheSearch(cacheData)
    },
    async handleBtnSearch () {
      this.loading = true
      this.flickrParams.page = 1
      this.show = false
      await this.loadData()
    },
    handleCacheSearch (cacheData) {
      cacheData = JSON.parse(cacheData)
      const { images, page } = cacheData
      this.images = images
      this.flickrParams.page = page
      this.show = true
      this.loading = false
    },
    async handleUnCacheSearch (isConcatImages) {
      try {
        const res = await fetchFlickr('flickr.photos.search', this.flickrParams)
        this.images = isConcatImages ? [...this.images, ...res.data] : res.data
        const cacheData = { images: this.images, page: this.flickrParams.page }
        sessionStorage.setItem(this.flickrParams.tags, JSON.stringify(cacheData))
        this.error = ''
        this.show = true
      } catch (e) {
        this.error = 'failed to fetch data'
        this.images = []
        this.flickrParams.page = 1
      }
      this.loading = false
    },
    updateparent (modalData) {
      this.modalData = modalData
      this.$refs.modalName.openModal()
    },
    paginationModal (nIndex) {
      if (nIndex < 0 || nIndex === this.images.length) {
        return
      }
      const nImage = this.images[nIndex]
      this.modalData = { index: nIndex, ...nImage }
    },
    isDisableModalPagination (paginationType, index) {
      return (
        (paginationType === 'prev' && index === 0) ||
        (paginationType === 'next' && index === this.images.length - 1)
      )
    }
  }
}
</script>

<style lang="scss">
.home{
    text-align: center;
    background-color: #F2F2F2;
}
.loading-text{
  font-size: 15px;
  font-weight: 800;
}
.form-container{
  padding: 40px;
  font-size: 22px;
  font-weight: bold;
}
.search-input{
  padding: 5px;
    font-size: 15px;
    font-weight: bold;
    outline: none;
    border-radius: 8px;
    border-color: gray;
    width: 43%;
    background-color: #F2F4FB;
    border: 1px solid #30419B;
    color: black;
}
.image-card-grid {
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #30419B;
  font-weight: bold;
}
.search-button{
  background: #30419b;
  border-radius: 8px;
  width: 100px;
  height: 30px;
  color: white;
  border: none;
  margin-left: 10px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}
.btn:disabled{
  cursor:not-allowed;
  color:gray
}
.error-msg{
  color:red;
}
.list-container{
  width:100%;
  height:100%;
}
.modal__body .image-card__image{
  width: 600px;
  height: 400px;
}
</style>
