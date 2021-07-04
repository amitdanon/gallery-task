<template>
  <Gallery/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Gallery from './components/Gallery.vue'

@Component({
  components: {
    Gallery
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  width:100%;
  height: 100%;
}
</style>
