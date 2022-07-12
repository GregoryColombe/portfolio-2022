
import { BoxBufferGeometry, MeshStandardMaterial, Mesh } from 'three'

import WebGL from '../../../WebGL'

export default class Wall {
  // Instantiate the application
  get _webgl () { return new WebGL() }
  // Access to the scene
  get _scene () { return this._webgl.scene }

  constructor (size, position, roughness) {
    this.size = size
    this.position = position
    this.roughness = roughness

    // Add the mothod to your constructor
    this._setInstance()
    this._setPosition(position)
  }

  _setInstance () {
    const geometry = new BoxBufferGeometry(this.size.x, this.size.y, this.size.z)
    const material = new MeshStandardMaterial({
      color: '#000',
      roughness: this.roughness
    })

    this.instance = new Mesh(geometry, material)
    this.instance.castShadow = true

    // Add the Mesh to the scene
    this._scene.add(this.instance)
  }

  _setPosition (position) {
    this.instance.position.set(position.x, position.y, position.z)
  }
}
