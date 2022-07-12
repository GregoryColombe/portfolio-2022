<template>
  <div class="cursor">
    <div class="cursor__ball cursor__ball--big ">
      <svg height="30" width="30">
        <circle cx="15" cy="15" r="12" stroke-width="0" />
      </svg>
    </div>
    <div class="cursor__ball cursor__ball--small">
      <svg height="10" width="10">
        <circle cx="5" cy="5" r="4" stroke-width="0" />
      </svg>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: 'CursorCustom',
  data () {
    return {
      mouseIsMoving: false,
      renderComponent: true
    }
  },

  mounted () {
    this.init()
    this.addEvents()
  },

  methods: {
    init () {
      this.bigBall = document.querySelector('.cursor__ball--big')
      this.smallBall = document.querySelector('.cursor__ball--small')
      this.hoverables = document.querySelectorAll('.hoverable, a, button, svg')
    },

    addEvents () {
      window.addEventListener('mousemove', this.activeCursorWhenMove)

      for (let i = 0; i < this.hoverables.length; i++) {
        this.hoverables[i].addEventListener('mouseenter', this.onMouseHover)
        this.hoverables[i].addEventListener('mouseleave', this.onMouseHoverOut)
      }
    },

    activeCursorWhenMove () {
      if (!this.mouseIsMoving) {
        document.body.addEventListener('mousemove', this.onMouseMove)
        document.querySelector('.cursor').style.display = 'block'
        this.mouseIsMoving = true
      }
    },

    // Move the cursor
    onMouseMove (e) {
      gsap.to(this.bigBall, {
        duration: 0.4,
        x: e.clientX - 15,
        y: e.clientY - 15
      })

      gsap.to(this.smallBall, {
        duration: 0.1,
        x: e.clientX - 5,
        y: e.clientY - 7
      })
    },

    // Hover an element
    onMouseHover () {
      gsap.to(this.bigBall, 0.3, { scale: 4 })
    },
    onMouseHoverOut () {
      gsap.to(this.bigBall, 0.3, { scale: 1 })
    }
  }
}
</script>

<style src="./style.scss" lang="scss" scoped />
