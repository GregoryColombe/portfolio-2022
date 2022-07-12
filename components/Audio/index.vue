<template>
  <audio class="audio" src="/audio/room-tone.mp3" />
</template>

<script>
export default {
  name: 'Audio',
  data () {
    return {
      audio: null
    }
  },
  computed: {
    projectNumber () {
      return this.$store.state.webgl.projectNumber
    },
    soundActive () {
      return this.$store.state.webgl.soundActive
    }
  },

  watch: {
    projectNumber () {
      this.$store.$router.currentRoute.path === '/projects' && this.changeProjectAudio()
    },

    $route (to, from) {
      to.path === '/' ? this.resetAudio() : this.changeProjectAudio()
    }
  },

  mounted () {
    this.audio = document.querySelector('.audio')
  },

  methods: {
    changeProjectAudio () {
      this.audio.setAttribute('src', `/audio/music-project-${this.projectNumber}.mp3`)
      this.soundActive === true && this.audio.play()
    },

    resetAudio () {
      this.audio.setAttribute('src', '/audio/room-tone.mp3')
      this.soundActive === true && this.audio.play()
    }
  }
}
</script>

<style src="./style.scss" lang="scss" scoped />
