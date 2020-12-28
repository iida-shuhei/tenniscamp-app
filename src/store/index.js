import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    singlesPlayers: [],
    doublesPlayers: [],
    additionalScoreList: [],
    totalScoreList: [],
  },
  mutations: {
    setSinglesPlayers(state, players) {
      state.singlesPlayers = players;
    },
    setDoublesPlayers(state, players) {
      state.doublesPlayers = players;
    },
    setAdditionalScoreList(state, players) {
      state.additionalScoreList = players;
    },
    setTotalScoreList(state, players) {
      state.totalScoreList = players;
    },
  },
  actions: {
    setSinglesPlayers({ commit }, players) {
      commit("setSinglesPlayers", players);
    },
    setDoublesPlayers({ commit }, players) {
      commit("setDoublesPlayers", players);
    },
    setAdditionalScoreList({ commit }, players) {
      commit("setAdditionalScoreList", players);
    },
    setTotalScoreList({ commit }, players) {
      commit("setTotalScoreList", players);
    },
  },
  modules: {},
  // plugins: [createPersistedState({ storage: window.localStorage })],
});
