import { Vector2 } from 'three'

import EventEmmiter from './EventEmitter'

export default class Events extends EventEmmiter {
  constructor () {
    super()

    this.mouse = new Vector2()

    window.addEventListener('mousemove', e => this.#move(e))
    window.addEventListener('click', () => this.#click())
  }

  #move (e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

    this.trigger('move')
  }

  #click () {
    this.trigger('click')
  }
}
