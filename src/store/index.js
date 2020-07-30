import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    singlesPlayers:[],
    doublesPlayers:[]
  },
  mutations: {
    setSinglesPlayers(state,players) {
      state.singlesPlayers = players
    },
    setDoublesPlayers(state,players) {
      state.doublesPlayers = players
    }
  },
  actions: {
    setSinglesPlayers({commit},players) {
      commit("setSinglesPlayers",players)
    },
    setDoublesPlayers({commit},players) {
      commit("setDoublesPlayers",players)
    }
  },
  modules: {
  }
})
