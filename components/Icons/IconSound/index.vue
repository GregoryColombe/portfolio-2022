<template>
  <div class="icon-sound" @click="changeIcon()">
    <IconSoundPause v-if="soundActive" />
    <IconSoundPlay v-else />
  </div>
</template>

<script>
import IconSoundPlay from '@/components/Icons/IconSoundPlay'
import IconSoundPause from '@/components/Icons/IconSoundPause'

export default {
  name: 'IconSound',
  components: {
    IconSoundPlay,
    IconSoundPause
  },
  data () {
    return {}
  },
  computed: {
    soundActive () {
      return this.$store.state.webgl.soundActive
    },
    loading () {
      return this.$store.state.webgl.loading
    }
  },

  methods: {
    playOrStopAudio () {
      this.soundActive ? document.querySelector('.audio').play() : document.querySelector('.audio').pause()
    },

    changeIcon () {
      this.$store.commit('webgl/setSoundActive', !this.soundActive)
      this.playOrStopAudio()
    }
  }
}
</script>

<style src="./style.scss" lang="scss" scoped />
