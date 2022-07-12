export default {
  setLoading (state, payload) {
    state.loading = payload
  },
  setProgress (state, payload) {
    state.progress = payload
  },
  setWorks (state, payload) {
    state.works = payload
  },
  setProjectData (state, payload) {
    state.projectData = payload
  },
  setProjectNumber (state, payload) {
    state.projectNumber = payload
  },
  setSoundActive (state, payload) {
    state.soundActive = payload
  },

  setBloomActive (state, payload) {
    state.bloomActive = payload
  }
}
