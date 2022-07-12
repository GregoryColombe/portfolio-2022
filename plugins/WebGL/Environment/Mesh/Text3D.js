import { MeshBasicMaterial, Mesh } from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

import WebGL from '../../WebGL'

export default class Text3d {
  // Instantiate the application
  get _webgl () { return new WebGL() }
  // Access to the scene
  get _scene () { return this._webgl.scene }

  constructor (text, position, scale) {
    this.text = 'Hello world'
    this.position = position
    this.scale = scale

    this._setInstance(text)
  }

  _setInstance (text) {
    const loader = new FontLoader()

    loader.load('fonts/Mitera_Regular.json', (font) => {
      const geometry = new TextGeometry(text, {
        font,
        size: 10,
        height: 2,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 0.5,
        bevelSize: 0.25,
        bevelOffset: 0,
        bevelSegments: 2
      })
      geometry.center()

      const material = new MeshBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.9
      })

      this.instance = new Mesh(geometry, material)
      this.instance.scale.set(this.scale.x, this.scale.y, this.scale.z)
      this._setPosition(this.position)

      this._scene.add(this.instance)
    })
  }

  _setPosition () {
    this.instance.position.set(this.position.x, this.position.y, this.position.z)
  }

  update () {
    if (this.instance) {
    //   this.instance.rotation.y += 0.01
    }
  }
}
