
import { DirectionalLight, Vector3 } from 'three'
// DirectionalLightHelper

import WebGL from '../../WebGL'

export default class Box {
  // Instantiate the application
  get _webgl () { return new WebGL() }
  // Access to the scene
  get _scene () { return this._webgl.scene }

  constructor (position) {
    // Add the mothod to your constructor
    this._setInstance()
    this._setPosition(position)
  }

  _setInstance () {
    this.instance = new DirectionalLight(0xFFFAD2, 1)
    this.instance.castShadow = true
    this.instance.lookAt(new Vector3())

    this._scene.add(this.instance)

    // const helper = new DirectionalLightHelper(this.instance, 2)
    // this._scene.add(helper)
  }

  _setPosition (position) {
    this.instance.position.set(position.x, position.y, position.z)
  }
}
