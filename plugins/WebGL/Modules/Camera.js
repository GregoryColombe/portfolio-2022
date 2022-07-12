import { PerspectiveCamera, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import WebGL from '../WebGL.js'

export default class Camera {
  get _webgl () { return new WebGL() }
  get _canvas () { return this._webgl.canvas }
  get _sizes () { return this._webgl.sizes }
  get _scene () { return this._webgl.scene }
  get _config () { return this._webgl.config }
  get _debug () { return this._webgl.debug }

  get viewport () {
    const position = new Vector3()

    this.instance.getWorldPosition(position)

    const fov = (this.instance.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * position.z
    const width = height * this.instance.aspect

    return { width, height }
  }

  constructor () {
    this.#setInstance()
    window.innerWidth <= 575 && this.setMobileView()

    if (this._debug.active) {
      this.#setOrbitControls()
      this.#setDebug()
    }
  }

  #setInstance () {
    this.instance = new PerspectiveCamera(
      45,
      this._sizes.width / this._sizes.height,
      0.1,
      1000
    )

    this.instance.position.set(-2, 3, 4)
    this.instance.lookAt(2, 2, -8)
    this._scene.add(this.instance)
  }

  #setOrbitControls () {
    this.controls = new OrbitControls(this.instance, this._canvas)
    this.controls.enabled = this._debug.active
    this.controls.enableDamping = true
    // this.controls.target.set(0, 0, 0)
  }

  #setDebug () {
    const debugControlsFolder = this._debug.ui.parameters.addFolder({ title: 'OrbitControls' })

    debugControlsFolder
      .addInput(this.controls, 'enabled', { presetKey: 'orbitControls' })
  }

  setMobileView () {
    this.instance.rotation.y += 0.1
  }

  resize () {
    this.instance.aspect = this._sizes.width / this._sizes.height
    this.instance.updateProjectionMatrix()
  }

  update () {
    if (!this._debug.active) {
      if (window.innerWidth >= 575) {
        this.instance.rotation.x += 0.03 * (this._webgl.events.mouse.y / 8 - this.instance.rotation.x)
        this.instance.rotation.y += 0.03 * (-this._webgl.events.mouse.x / 8 - this.instance.rotation.y)
      }
    }

    this.controls &&
      this.controls.update()
  }
}
