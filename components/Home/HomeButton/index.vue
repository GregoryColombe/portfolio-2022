<template>
  <div class="home-button">
    <button @click="onClick()">
      <p>View works</p>
    </button>
  </div>
</template>

<script>
import Animations from '@/plugins/WebGL/Utils/Animations'

export default {
  name: 'HomeButton',
  data () {
    return {
      animations: new Animations()
    }
  },

  computed: {
    works () {
      return this.$store.state.webgl.works
    }
  },

  methods: {
    onClick () {
      this.$store.commit('webgl/setWorks', !this.works)
      this.works ? this.animations.fade('in') : this.animations.fade('out')
    }
  }
}
</script>

<style src="./style.scss" lang="scss" scoped />
