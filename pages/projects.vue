<template>
  <div class="projects">
    <button class="projects-closeBtn" @click="onClickIconClose()">
      <IconClose />
    </button>

    <div class="projects-datas">
      <h1 v-text="projectData[projectNumber].title" />
      <p v-text="projectData[projectNumber].description" />

      <a :href="projectData[projectNumber].href" target="_blank">
        <button>
          <p v-text="projectData[projectNumber].textBtn">Visit the site</p>
        </button>
      </a>
    </div>

    <div class="projects-manage">
      <button v-show="projectNumber > 0" @click="previous()">
        <IconChevron />
      </button>

      <p>0<span v-text="projectNumber + 1" /></p>

      <button v-show="projectNumber < 4" @click="next()">
        <IconChevron />
      </button>
    </div>

    <video class="video_webgl" :src="$store.state.webgl.projectData[projectNumber].src" loop muted />
    <CursorCustom />
  </div>
</template>

<script>
import Animations from '@/plugins/WebGL/Utils/Animations'
import PostProcessing from '@/plugins/WebGL/Utils/PostProcessing'
import WebGL from '@/plugins/WebGL/WebGL'

import IconClose from '@/components/Icons/IconClose'
import IconChevron from '@/components/Icons/IconChevron'

export default {
  components: {
    IconClose,
    IconChevron
  },

  data () {
    return {
      animations: new Animations(),
      postprocessing: new PostProcessing(),
      webgl: new WebGL()
    }
  },

  computed: {
    works () {
      return this.$store.state.webgl.works
    },

    projectData () {
      return this.$store.state.webgl.projectData
    },

    projectNumber () {
      return this.$store.state.webgl.projectNumber
    }
  },

  mounted () {
    this.webgl.environment._createVideo()
    this.playVideo()

    this.$store.commit('webgl/setBloomActive', false)
    this.$store.commit('webgl/setWorks', !this.works)
  },

  methods: {
    onClickIconClose () {
      this.$store.commit('webgl/setWorks', true)

      this.webgl.environment._removeVideo()
      this.animations.closeDoor(this.webgl.environment.door.instance, this.webgl.camera.instance)

      setTimeout(() => {
        this.animations.fade('in')
      }, 800)
    },

    playVideo () {
      const video = document.querySelector('.video_webgl')
      video.load()

      video.oncanplaythrough = () => {
        video.play()
      }
    },

    previous () {
      if (this.projectNumber > 0) {
        this.$store.commit('webgl/setProjectNumber', this.projectNumber - 1)
        this.playVideo()
      }
    },

    next () {
      if (this.projectNumber < 4) {
        this.$store.commit('webgl/setProjectNumber', this.projectNumber + 1)
        this.playVideo()
      }
    }
  }
}
</script>

<style src="./Projects/style.scss" lang="scss" scoped />
