import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { Vector2 } from 'three'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

import { gsap } from 'gsap'
import WebGL from '@/plugins/WebGL/WebGL'

export default class PostProcessing {
  constructor () {
    this._webgl = new WebGL()
    this._renderer = this._webgl.renderer.instance
    this._debug = this._webgl.debug
    this._scene = this._webgl.scene
    this._camera = this._webgl.camera.instance

    this.init()
  }

  init () {
    this.composer = new EffectComposer(this._renderer)
    this.composer.addPass(new RenderPass(this._scene, this._camera))

    const pass = new SMAAPass(window.innerWidth * this._renderer.getPixelRatio(), window.innerHeight * this._renderer.getPixelRatio())
    this.composer.addPass(pass)

    this.params = {
      exposure: 1,
      bloomStrength: 1.15,
      bloomThreshold: 0,
      bloomRadius: 0.2
    }

    const renderScene = new RenderPass(this._scene, this._camera)

    this.bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
    this.bloomPass.threshold = this.params.bloomThreshold
    this.bloomPass.strength = this.params.bloomStrength
    this.bloomPass.radius = this.params.bloomRadius

    this.composer = new EffectComposer(this._renderer)
    this.composer.addPass(renderScene)
    this.composer.addPass(this.bloomPass)
  }

  setBloomStrengthAnim (duration, value) {
    gsap.to(this.bloomPass, {
      duration,
      strength: value,
      ease: 'power1.easeInOut'
    })
  }

  onDebug () {}

  update () {
    this.composer.render()
    window.$nuxt.$store.state.webgl.bloomActive === false ? this.setBloomStrengthAnim(3, 0.14) : this.setBloomStrengthAnim(3, 1.15)
  }
}
