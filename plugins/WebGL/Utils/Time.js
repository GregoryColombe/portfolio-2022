import { gsap } from 'gsap'

import EventEmmiter from './EventEmitter'

export default class Time extends EventEmmiter {
  constructor () {
    super()

    // SETUP
    this.current = this.start
    this.delta = 16

    gsap.ticker.fps(60)
    gsap.ticker.add((time, deltaTime, frame) => {
      this.current = time
      this.delta = deltaTime
      this.frame = frame

      this.trigger('update')
    })
  }
}
