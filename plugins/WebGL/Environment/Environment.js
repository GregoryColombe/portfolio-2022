import { sRGBEncoding, Fog, Color } from 'three'
import WebGL from '../WebGL'

// Home
import Floor from '~/plugins/WebGL/Environment/Mesh/Home/Floor'
import Door from '~/plugins/WebGL/Environment/Mesh/Home/Door'

// import Wall from '~/plugins/WebGL/Environment/Mesh/Home/Wall'
import WallFull from '~/plugins/WebGL/Environment/Mesh/Home/WallFull'

// import Ambient from '~/plugins/WebGL/Environment/Lights/Ambient'
// import Point from '~/plugins/WebGL/Environment/Lights/Point'
import Directionnal from '~/plugins/WebGL/Environment/Lights/Directionnal'

// Projects
import VideoPlane from '~/plugins/WebGL/Environment/Mesh/VideoPlane'

// Others
// import Box from '~/plugins/WebGL/Environment/Mesh/Box'
// import Plane from '~/plugins/WebGL/Environment/Mesh/Plane'
// import GroundMirror from '~/plugins/WebGL/Environment/Mesh/GroundMirror'
// import Text3d from '~/plugins/WebGL/Environment/Mesh/Text3d'

export default class Environment {
  get _webgl () { return new WebGL() }
  get _resources () { return this._webgl.resources }
  get _scene () { return this._webgl.scene }

  constructor () {
    this.floor = new Floor({ x: 1, y: 0.5, z: 0 })
    this.door = new Door({ x: 3, y: 0.29, z: -8 })

    // this.ambient = new Ambient({ x: 2, y: 2, z: -8 })
    this.directionnal = new Directionnal({ x: 7, y: 4, z: -16 })

    // this.point = new Point({ x: 2, y: 2, z: -10 })

    this.wallFull = new WallFull(
      { x: 2, y: 0, z: -8 },
      0
    )

    // this.wallFront = new Wall(
    //   { x: 32, y: 7, z: 0 },
    //   { x: 0, y: 6, z: -4 },
    //   0
    // )

    // this.wallLeft = new Wall(
    //   { x: 15, y: 5, z: 0 },
    //   { x: -7, y: 0, z: -4 },
    //   0
    // )

    // this.wallRight = new Wall(
    //   { x: 15, y: 5, z: 0 },
    //   { x: 9, y: 0, z: -4 },
    //   0
    // )

    // Others
    // this.box = new Box({ x: 0, y: 0.5, z: 0 })
    // this.plane = new Plane({ x: 0, y: 0, z: 0 })
    // this.groundMirror = new GroundMirror({ x: 0, y: -0.1, z: 0 })
    // this.text3d = new Text3d(
    //   'GALERIES LAFAYETTES',
    //   { x: 0, y: 1, z: -0.5 },
    //   { x: 0.045, y: 0.045, z: 0.045 }
    // )

    this._resources.on('ready', () => {
      // Add your components who needs loading here (Textures, GLTF, etc.)
      // this._setHdri(this._webgl.resources.items.hdri)
      // this._setFog()
    })
  }

  _createVideo () {
    this.videoPlane = new VideoPlane({ x: 3.25, y: 3, z: -20 })
  }

  _removeVideo () {
    this._scene.remove(this.videoPlane.instance)
  }

  _setHdri (hdri) {
    this.hdri = hdri
    this.hdri.encoding = sRGBEncoding
    this._webgl.scene.background = this.hdri
  }

  _setFog () {
    const near = 1
    const far = 20
    const color = '#000'
    this._webgl.scene.fog = new Fog(color, near, far)
    this._webgl.scene.background = new Color(color)
  }

  update () {
    this.videoPlane && this.videoPlane.update()
  }

  click () {
    window.innerWidth >= 575 &&
    this.videoPlane &&
      this.videoPlane.click()
  }
}
