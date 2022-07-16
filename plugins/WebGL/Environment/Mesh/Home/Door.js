
import { BoxBufferGeometry, MeshStandardMaterial, Mesh, Matrix4 } from 'three'

import WebGL from '../../../WebGL'
import Animations from '@/plugins/WebGL/Utils/Animations'

export default class Door {
  // Instantiate the application
  get _webgl () { return new WebGL() }
  // Access to the scene
  get _scene () { return this._webgl.scene }
  get _debug () { return this._webgl.debug }

  constructor (position) {
    this.animations = new Animations()

    // Add the mothod to your constructor
    this._setInstance()
    this._setPosition(position)

    this._debug.active &&
      this._setDebug()
  }

  _setInstance () {
    const geometry = new BoxBufferGeometry(2, 5.4, 0.1)
    geometry.applyMatrix4(new Matrix4().makeTranslation(1, 2, 0))

    const material = new MeshStandardMaterial({
      color: '#000',
      roughness: 2.5
    })

    this.instance = new Mesh(geometry, material)

    this.instance.rotation.y = 7 * Math.PI / 6
    this.instance.castShadow = true

    // Add the Mesh to the scene
    this._scene.add(this.instance)
  }

  openDoor () {
    this.animations.fadeOut()

    setTimeout(() => {
      this.animations.openDoor(this.instance, this._webgl.camera.instance)
    }, 800)
  }

  playVideo () {
    const video = document.querySelector('.video_webgl')
    video.play()
  }

  closeDoor () {
    this.animations.closeDoor(this.instance, this._webgl.camera.instance)
  }

  _setPosition (position) {
    this.instance.position.set(position.x, position.y, position.z)
  }

  _setDebug () {
    // Open door
    const btnOpenDoor = this._debug.ui.meshes.addButton({ title: 'Open door' })
    btnOpenDoor.on('click', () => { this.openDoor() })

    // Close door
    const btnCloseDoor = this._debug.ui.meshes.addButton({ title: 'Close door' })
    btnCloseDoor.on('click', () => { this.closeDoor() })
  }
}
