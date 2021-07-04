<template>
  <li
    class="image-card"
    @click="
      () => {
        this.$emit('eventname', {
          title: image.title,
          url_n: image.url_n,
          index: imageIndex
        })
      }
    "
  >
    <img class="image-card__image" :src="image.url_n" :alt="image.title" />
  </li>
</template>

<script>
export default {
  name: 'ImageCard',
  props: ['image', 'imageIndex']
}
</script>

<style lang="scss">
.image-card {
  width: calc(33% - 1rem);
  margin: 0.5rem;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  background: white;
  cursor: pointer;
  &__image {
    border-radius: 5px 5px 0 0;
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
}
</style>
