<template>
  <div class="portfolio">
    <Loader />

    <Header />
    <Nuxt />
    <IconsNetworks />

    <WebGLBackground />
    <Audio />
  </div>
</template>

<script>
import IconsNetworks from '@/components/Icons/IconsNetworks'

export default {
  components: {
    IconsNetworks
  },
  mounted () {
    this.initHeightPage()
    window.addEventListener('resize', this.initHeightPage)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.initHeightPage)
  },
  methods: {
    initHeightPage () {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  }
}
</script>
<style src="./default/style.scss" lang="scss" />
