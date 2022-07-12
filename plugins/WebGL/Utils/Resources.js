import { CubeTextureLoader, TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

import EventEmmiter from './EventEmitter'

export default class Resources extends EventEmmiter {
  constructor (sources = []) {
    super()

    // OPTIONS
    this.sources = sources

    // SETUP
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.#setLoaders()
    this.#startLoading()
  }

  #setLoaders () {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.textureLoader = new TextureLoader()
    this.loaders.cubeTextureLoader = new CubeTextureLoader()
    this.loaders.fbxLoader = new FBXLoader()
  }

  #startLoading () {
    for (const source of this.sources) {
      switch (source.type) {
        case 'gltfModel':
          this.loaders.gltfLoader.load(
            source.path,
            file => this._sourceLoaded(source, file)
          )
          break
        case 'fbxModel':
          this.loaders.fbxLoader.load(
            source.path,
            file => this._sourceLoaded(source, file)
          )
          break
        case 'texture':
          this.loaders.textureLoader.load(
            source.path,
            file => this._sourceLoaded(source, file)
          )
          break
        case 'cubeTexture':
          this.loaders.cubeTextureLoader.load(
            source.path,
            file => this._sourceLoaded(source, file)
          )
          break
      }
    }
  }

  _sourceLoaded (source, file) {
    this.items[source.name] = file
    this.loaded++

    this.callbackEmitter('progressLoading', this.progressRatio)
    if (this.loaded === this.toLoad) {
      this.trigger('ready')
      setTimeout(() => this.callbackEmitter('endLoading'), 1200)
    }
  }

  get progressRatio () {
    return this.loaded / this.toLoad
  }
}
