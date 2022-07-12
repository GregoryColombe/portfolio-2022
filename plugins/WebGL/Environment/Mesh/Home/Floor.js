import { PlaneBufferGeometry, MeshStandardMaterial, Mesh, Float32BufferAttribute, TextureLoader, RepeatWrapping } from 'three'

import WebGL from '../../../WebGL'

export default class Floor {
  // Instantiate the application
  get _webgl () { return new WebGL() }
  // Access to the scene
  get _scene () { return this._webgl.scene }

  constructor (position) {
    this.grassColorTexture = null
    this.grassAmbientOcclusionTexture = null
    this.grassNormalTexture = null
    this.grassRoughnessTexture = null

    // Add the mothod to your constructor
    this._getTexture()
    this._setInstance()
    this._setPosition(position)
  }

  _getTexture () {
    // Textures
    const textureLoader = new TextureLoader()

    this.grassColorTexture = textureLoader.load('/webgl/textures/grass/color.jpg')
    this.grassAmbientOcclusionTexture = textureLoader.load('/webgl/textures/grass/ambientOcclusion.jpg')
    this.grassNormalTexture = textureLoader.load('/webgl/textures/grass/normal.jpg')
    this.grassRoughnessTexture = textureLoader.load('/webgl/textures/grass/roughness.jpg')

    this.grassColorTexture.repeat.set(8, 8)
    this.grassAmbientOcclusionTexture.repeat.set(8, 8)
    this.grassNormalTexture.repeat.set(8, 8)
    this.grassRoughnessTexture.repeat.set(8, 8)

    this.grassColorTexture.wrapS = RepeatWrapping
    this.grassAmbientOcclusionTexture.wrapS = RepeatWrapping
    this.grassNormalTexture.wrapS = RepeatWrapping
    this.grassRoughnessTexture.wrapS = RepeatWrapping

    this.grassColorTexture.wrapT = RepeatWrapping
    this.grassAmbientOcclusionTexture.wrapT = RepeatWrapping
    this.grassNormalTexture.wrapT = RepeatWrapping
    this.grassRoughnessTexture.wrapT = RepeatWrapping
  }

  _setInstance () {
    // Floor
    this.instance = new Mesh(
      new PlaneBufferGeometry(40, 16),
      new MeshStandardMaterial({
        color: '#000000',
        map: this.grassColorTexture,
        aoMap: this.grassAmbientOcclusionTexture,
        normalMap: this.grassNormalTexture,
        roughnessMap: this.grassRoughnessTexture,
        roughness: 2.5,
        metalness: 0.5
      })
    )

    // For use aoMap
    this.instance.geometry.setAttribute(
      'uv2',
      new Float32BufferAttribute(this.instance.geometry.attributes.uv.array, 2)
    )

    this.instance.rotation.x = -Math.PI * 0.5
    this.instance.receiveShadow = true

    // Add the Mesh to the scene
    this._scene.add(this.instance)
  }

  _setPosition (position) {
    this.instance.position.set(position.x, position.y, position.z)
  }
}
