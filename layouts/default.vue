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
  }
}
</script>
<style src="./default/style.scss" lang="scss" />
