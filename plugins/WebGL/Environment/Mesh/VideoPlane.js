import { PlaneBufferGeometry, MeshBasicMaterial, Mesh, VideoTexture, LinearFilter, RGBFormat, DoubleSide } from 'three'

import WebGL from '../../WebGL'

export default class VideoPlane {
  // Instantiate the application
  get _webgl () { return new WebGL() }
  // Access to the scene
  get _scene () { return this._webgl.scene }
  get _raycaster () { return this._webgl.raycaster }

  get viewport () {
    const fov = this._webgl.camera.instance.fov * (Math.PI / 180)
    const height = 2 * Math.tan(fov / 2) * this._webgl.camera.instance.position.z
    const width = height * this._webgl.camera.instance.aspect

    return { width, height }
  }

  constructor (position) {
    // Add the mothod to your constructor
    this.videoSize = { x: 8, y: 5.5 }
    this.executed = false
    this.position = position

    this._setInstance()
    this._setPosition()
  }

  _setInstance () {
    const video = document.querySelector('.video_webgl')
    video.load()

    const texture = new VideoTexture(video)

    texture.needsUpdate = true
    texture.minFilter = LinearFilter
    texture.magFilter = LinearFilter
    texture.format = RGBFormat
    texture.crossOrigin = 'anonymous'

    this.instance = new Mesh(
      new PlaneBufferGeometry(this.videoSize.x, this.videoSize.y),
      new MeshBasicMaterial({
        map: texture,
        toneMapped: false,
        side: DoubleSide
      })
    )

    this.instance.rotation.z = Math.PI / 6
    this._raycaster.setChildren(this.instance)

    // Add the Mesh to the scene
    this._scene.add(this.instance)
  }

  _setPosition () {
    this.instance.position.set(this.position.x, this.position.y, this.position.z)
  }

  _resizeVideo () {
    if (!this.executed) {
      this.instance.scale.x = 2
      this.instance.scale.y = 2

      // (valeurEnPixel / this.screen.width * this.viewport.width)
      // this.instance.position.x = (this.instance.scale.x) / (this._webgl.sizes.width * this.viewport.width) - (this.viewport.width - this.instance.position.x / 2)

      this.executed = true
    }
  }

  click () {
    if (this._raycaster.instance) {
      const { object } = this._raycaster.instance
      if (object === this.instance) {
        const href = document.querySelector('.projects-datas a').getAttribute('href')
        window.open(href, '_blank')
      }
    }
  }

  update () {
    window.innerWidth <= 575 && this._resizeVideo()
  }
}
