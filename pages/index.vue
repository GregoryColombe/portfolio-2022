<template>
  <div class="home">
    <HomeButton />
    <ProjectsList />

    <CursorCustom />
  </div>
</template>

<script>
import { gsap } from 'gsap'

import ProjectsList from '@/components/Home/ProjectsList'
import HomeButton from '@/components/Home/HomeButton'

export default {

  components: {
    ProjectsList,
    HomeButton
  },

  mounted () {
    this.$store.commit('webgl/setBloomActive', true)
  },

  methods: {
    playVideo () {
      const video = document.querySelector('.video_webgl')
      video.play()
    },

    textAnim () {
      // eslint-disable-next-line new-cap
      const tl = new gsap.timeline()
      const element = document.querySelector('.title')

      tl.to(element, {
        duration: 4,
        x: '-100%',
        ease: 'Power2.easeInOut',
        onStart () {
          document.querySelector('.title_container').style.display = 'flex'
        }
      }, '-=1')
        .to(element, {
          duration: 2,
          opacity: 0,
          ease: 'Power2.easeInOut',
          onComplete () {
            element.style.opacity = 1
            element.style.transform = 'translateX(100%)'
          }
        }, '-=2')
    }
  }
}
</script>
<style src="./Home/style.scss" lang="scss" scoped />
