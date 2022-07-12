import { PlaneBufferGeometry } from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import WebGL from '../../WebGL'

export default class GroundMirror {
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
    this.instance = new Reflector(geometry, {
      clipBias: 0.003,
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
      color: 0xBBBBBB
    })
    this.instance.rotateX(-Math.PI / 2)

    // Add the Mesh to the scene
    this._scene.add(this.instance)
  }

  _setPosition (position) {
    this.instance.position.set(position.x, position.y, position.z)
  }
}
