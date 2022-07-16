<template>
  <div class="header">
    <div class="header-container">
      <div class="header-container-item">
        <div class="header-container-item--name">
          <a href="/">
            <p><span>Gregory colombe</span> | © 2022</p>
          </a>
        </div>
      </div>
      <div class="header-container-item">
        <button>
          <IconSound />
        </button>
      </div>
    </div>

    <div class="header-container">
      <nuxt-link v-if="$route.path === '/'" to="" class="header-container-item">
        <p @click="onClick()">
          {{ works ? 'Close' : 'Works' }}
        </p>
      </nuxt-link>

      <nuxt-link to="" class="header-container-item">
        <p>About</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Animations from '@/plugins/WebGL/Utils/Animations'

import IconSound from '@/components/Icons/IconSound'

export default {
  name: 'TheHeader',
  components: {
    IconSound
  },
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
  watch: {
    $route (to) {
      to.path === '/' && this.changeColor('white')
      to.path === '/projects' && this.changeColor('black')
    }
  },

  mounted () {
    this.changeTextHeader()
    window.addEventListener('resize', () => { this.changeTextHeader() })
  },

  methods: {
    changeTextHeader () {
      let txt = 'Gregory Colombe | © 2022'
      if (window.innerWidth <= 575) { txt = 'Gregory Colombe' }
      document.querySelector('.header-container-item--name p').textContent = txt
    },

    onClick () {
      this.$store.commit('webgl/setWorks', !this.works)
      this.works ? this.animations.fadeIn() : this.animations.fadeOut()
    },

    changeColor (color) {
      color === 'black' ? this.$el.style.filter = 'invert(1)' : this.$el.style.filter = 'invert(0)'
    }
  }
}
</script>

<style src="./style.scss" lang="scss" scoped />
