export default {
  startLoading ({ commit }) {
    commit('setLoading', true)
  },

  endLoading ({ commit }) {
    commit('setLoading', false)
  },

  progressLoading ({ commit }, payload) {
    commit('setProgress', payload)
  },

  setWorks ({ commit }, payload) {
    commit('setWorks', payload)
  },

  setProjectData ({ commit }, payload) {
    commit('setProjectData', payload)
  },

  setProjectNumber ({ commit }, payload) {
    commit('setProjectNumber', payload)
  },

  setSoundActive ({ commit }, payload) {
    commit('setSoundActive', payload)
  },

  setBloomActive ({ commit }, payload) {
    commit('setBloomActive', payload)
  }
}
