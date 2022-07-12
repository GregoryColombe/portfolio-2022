<template>
  <canvas id="webgl" />
</template>

<script>
export default {
  beforeDestroy () {
    this.$WebGL.destroy()
  }
}
</script>
<style src="./style.scss" lang="scss" scoped />
