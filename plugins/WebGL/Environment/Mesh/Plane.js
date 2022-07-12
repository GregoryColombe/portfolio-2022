import { PlaneBufferGeometry, MeshBasicMaterial, Mesh, TextureLoader, RepeatWrapping } from 'three'

import WebGL from '../../WebGL'

export default class Plane {
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
    const geometry = new PlaneBufferGeometry(20, 20)
    const texture = new TextureLoader().load('webgl/textures/defense/defense.jpg')
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(4, 4)

    const material = new MeshBasicMaterial({
      map: texture,
      // color: 0x000000,
      opacity: 0.98,
      transparent: true
    })

    this.instance = new Mesh(geometry, material)
    this.instance.rotateX(-Math.PI / 2)

    // Add the Mesh to the scene
    this._scene.add(this.instance)
  }

  _setPosition (position) {
    this.instance.position.set(position.x, position.y, position.z)
  }
}
