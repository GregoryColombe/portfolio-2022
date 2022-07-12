import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

export default class Debug {
  constructor (active) {
    this.active = active

    if (this.active) {
      this.#setInstance()
      this.#setFPSVisualizer()
      this.#setImportExport()
    }
  }

  #setInstance () {
    this.ui = new Pane()
    this.ui.registerPlugin(EssentialsPlugin)

    const categories = this.ui.addTab({
      pages: [
        { title: 'Lights' },
        { title: 'Meshes' },
        { title: 'Parameters' }
      ]
    })

    this.ui.lights = categories.pages[0]
    this.ui.meshes = categories.pages[1]
    this.ui.parameters = categories.pages[2]
    this.ui.general = this.ui.addFolder({ title: 'Stats' })
  }

  #setFPSVisualizer () {
    this._fpsGraph = this.ui.general.addBlade({
      view: 'fpsgraph',
      lineCount: 2
    })
  }

  #setImportExport () {
    this.#setImport()
    this.#setExport()
  }

  #setImport () {
    const input = document.createElement('input')

    input.type = 'file'
    input.accept = 'application/JSON'
    input.style.display = 'none'

    document.body.appendChild(input)

    input.addEventListener('change', this.#importDataFile.bind(this, input))

    this.ui.general
      .addButton({ title: 'Import' })
      .on('click', () => {
        input.value = ''
        input.click()
      })
  }

  #setExport () {
    this.ui.general
      .addButton({ title: 'Save' })
      .on('click', () => {
        const a = document.createElement('a')
        const json = JSON.stringify(this.ui.exportPreset(), null, 2)
        const file = new Blob([json], { type: 'text/plain' })

        a.href = URL.createObjectURL(file)
        a.download = 'config.json'

        a.click()
      })
  }

  #importDataFile (input) {
    if (input.files.length === 0) { return }

    const fileReader = new FileReader()
    const onload = () => {
      const parsedJSON = JSON.parse(fileReader.result || '')
      this.ui.importPreset(parsedJSON)
    }
    fileReader.onload = onload.bind(this)
    fileReader.readAsText(input.files[0])
  }

  begin () {
    this.active &&
      this._fpsGraph.begin()
  }

  end () {
    this.active &&
      this._fpsGraph.end()
  }
}
