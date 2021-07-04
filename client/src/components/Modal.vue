<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal__backdrop" @click="closeModal()" />

      <div class="modal__dialog">
        <div class="modal__header">
          <slot name="header" />
          <button type="button" class="modal__close" @click="closeModal()">
            X
          </button>
        </div>

        <div class="modal__body">
          <slot name="body" />
        </div>

        <div>
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {
      show: false
    }
  },
  methods: {
    closeModal () {
      this.show = false
      document.querySelector('body').classList.remove('overflow-hidden')
    },
    openModal () {
      this.show = true
      document.querySelector('body').classList.add('overflow-hidden')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  overflow-x: hidden;
  overflow-y: auto;
  &__backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  &__dialog {
    position: relative;
    width: 620px;
    background-color: #ffffff;
    border-radius: 5px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    z-index: 2;
    @media screen and (max-width: 992px) {
      width: 90%;
    }
  }
  &__close {
    background: none;
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  &__header {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  &__body {
    padding: 10px 10px 10px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
  &__header {
    justify-content: flex-end;
  }
}
</style>
