
import { Raycaster } from 'three'
import WebGL from '../WebGL'

export default class Raycasters {
  get _webgl () { return new WebGL() }
  get _events () { return this._webgl.events }
  get _camera () { return this._webgl.camera.instance }

  constructor () {
    this.childrens = []

    this._raycaster = new Raycaster()
  }

  move () {
    this._raycaster.setFromCamera(this._events.mouse, this._camera)

    this.instance = this._raycaster.intersectObjects(this.childrens)[0]

    window.innerWidth >= 575 &&
    this.instance
      ? document.querySelector('.portfolio').style.cursor = 'pointer'
      : document.querySelector('.portfolio').style.cursor = 'initial'
  }

  setChildren (child) {
    this.childrens.push(child)
  }
}
