
import { BufferGeometry, BufferAttribute, MeshStandardMaterial, Mesh, DoubleSide } from 'three'

import WebGL from '../../../WebGL'

export default class WallFull {
  // Instantiate the application
  get _webgl () { return new WebGL() }
  // Access to the scene
  get _scene () { return this._webgl.scene }

  constructor (position, roughness) {
    this.position = position
    this.roughness = roughness

    // Add the mothod to your constructor
    this._setInstance()
    this._setPosition(position)
  }

  _setInstance () {
    const geometry = new BufferGeometry()
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.
    const vertices = new Float32Array([

      // Wall left
      -20.0, 20, 0.0,
      -20.0, 0, 0.0,
      -1.0, 20.0, 1.0,

      -20.0, 0, 0.0,
      -1.0, 0, 0.0,
      -1.0, 20.0, 0.0,

      // Wall right
      20.0, 20.0, 0.0,
      1.0, 20.0, 0.0,
      20.0, 0.0, 0.0,

      20.0, 0.0, 0.0,
      1.0, 20.0, 0.0,
      1.0, 0.0, 0.0,

      // Wall up
      -20.0, 0.0, 0.0,
      -20.0, 20.0, 0.0,
      20.0, 20.0, 0.0,

      20.0, 5.0, 0.0,
      -20.0, 5.0, 0.0,
      20.0, 20.0, 0.0
    ])

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.setAttribute('position', new BufferAttribute(vertices, 3))

    //
    // const geometry = new BoxBufferGeometry(this.size.x, this.size.y, this.size.z)
    const material = new MeshStandardMaterial({
      color: '#000',
      roughness: this.roughness,
      side: DoubleSide
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
