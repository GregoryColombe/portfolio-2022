<template>
  <transition name="fade">
    <div v-if="!endProgress" class="loader">
      <div class="loader-container">
        <div>
          <p v-if="activeCloseLoader">
            Click anywhere to start
          </p>

          <p>{{ progress }}<span> %</span></p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Animations from '@/plugins/WebGL/Utils/Animations'

export default {
  name: 'TheLoader',
  data () {
    return {
      endProgress: false,
      activeCloseLoader: false,
      animations: new Animations()
    }
  },
  computed: {
    loading () {
      return this.$store.state.webgl.loading
    },
    progress () {
      return Math.round(this.$store.state.webgl.progress * 100)
    },
    soundActive () {
      return this.$store.state.webgl.soundActive
    }
  },
  watch: {
    progress (newValue) {
      if (newValue === 100) {
        this.activeCloseLoader = true
        this.addClickEvent()
      }
    },

    endProgress () {
      this.endProgress && this.playAudio()
    }
  },

  mounted () {
    this.animations.loaderFadeIn()
  },

  methods: {
    start () {
      this.$store.commit('webgl/startLoading')
    },

    finish () {
      this.$store.commit('webgl/endLoading')
    },

    playAudio () {
      this.$store.commit('webgl/setSoundActive', true)
      document.querySelector('.audio').play()
    },

    addClickEvent () {
      document.querySelector('.loader').style.cursor = 'pointer'
      window.addEventListener('click', () => { this.closeLoader() })
    },

    closeLoader () {
      this.animations.loaderFadeOut(this.$data)
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 2;
  background: black;

  &-container {

    div {
      position: absolute;
      right: 3.2rem;
      bottom: 2.4rem;

      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        color: white;

        &:first-of-type {
          font-size: 1rem;
        }

        &:last-of-type {
          display: flex;
          justify-content: center;
          align-items: flex-start;

          text-transform: uppercase;
          font-size: 12rem;
          font-weight: 400;

          min-width: 24rem;

          span {
            font-size: 6rem;
            position: relative;
            top: 1.2rem;
          }
         }
      }
    }
  }
}

// Mobile
// @media #{$mq-small} {
//   .loader {
//     &-container {
//       > p {
//           font-size: 22rem;
//           margin-bottom: 0;

//           span {
//             font-size: 14rem;
//             margin-left: 6rem;
//           }
//       }

//       .loader-img {
//         width: 50%;
//         height: 50%;
//       }
//     }
//   }
// }
</style>
