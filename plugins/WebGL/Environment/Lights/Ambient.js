
import { AmbientLight } from 'three'

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
    this.instance = new AmbientLight('#FF0000', 1)
    this._scene.add(this.instance)
  }

  _setPosition (position) {
    this.instance.position.set(position.x, position.y, position.z)
  }
}
