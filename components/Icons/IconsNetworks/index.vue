<template>
  <div class="icons-networks">
    <div class="icons-networks-container">
      <a href="https://www.instagram.com/web_gregory_colombe/" target="_blank">
        <IconInstagram />
      </a>

      <a href="https://www.linkedin.com/in/gr%C3%A9gory-colombe-9946a0172/" target="_blank">
        <IconLinkedin />
      </a>

      <a href="https://github.com/GregoryColombe" target="_blank">
        <IconGithub />
      </a>

      <a href="mailto:colombegregory@gmail.com" target="_blank">
        <IconEmail />
      </a>

      <div />
      <div />
    </div>
  </div>
</template>

<script>
import IconInstagram from '@/components/Icons/IconInstagram'
import IconLinkedin from '@/components/Icons/IconLinkedin'
import IconGithub from '@/components/Icons/IconGithub'
import IconEmail from '@/components/Icons/IconEmail'

export default {
  name: 'IconsNetworks',
  components: {
    IconInstagram,
    IconLinkedin,
    IconGithub,
    IconEmail
  },

  data () {
    return {
    }
  },

  watch: {
    $route (to) {
      to.path === '/' && this.changeColor('white')
      to.path === '/projects' && this.changeColor('black')
    }
  },
  methods: {
    changeColor (color) {
      color === 'black' ? this.$el.style.filter = 'invert(1)' : this.$el.style.filter = 'invert(0)'
    }
  }
}
</script>

<style src="./style.scss" lang="scss" scoped />
