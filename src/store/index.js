import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    singlesPlayers: [],
    doublesPlayers: [],
    allPlayersList: [],
    singlesPlayersList: [],
    doublesPlayersList: [],
    playersTeamResult: [],
  },
  mutations: {
    setSinglesPlayers(state, players) {
      state.singlesPlayers = players;
    },
    setDoublesPlayers(state, players) {
      state.doublesPlayers = players;
    },
    setAllPlayersList(state, players) {
      state.allPlayersList = players;
    },
    setSinglesPlayersList(state, players) {
      state.singlesPlayersList = players;
    },
    setDoublesPlayersList(state, players) {
      state.doublesPlayersList = players;
    },
    setPlayersTeamResult(state, players) {
      state.playersTeamResult = players;
    },
  },
  actions: {
    setSinglesPlayers({ commit }, players) {
      commit("setSinglesPlayers", players);
    },
    setDoublesPlayers({ commit }, players) {
      commit("setDoublesPlayers", players);
    },
    setAllPlayersList({ commit }, players) {
      commit("setAllPlayersList", players);
    },
    setSinglesPlayersList({ commit }, players) {
      commit("setSinglesPlayersList", players);
    },
    setDoublesPlayersList({ commit }, players) {
      commit("setDoublesPlayersList", players);
    },
    setPlayersTeamResult({ commit }, players) {
      commit("setPlayersTeamResult", players);
    },
  },
  modules: {},
  // plugins: [createPersistedState({ storage: window.localStorage })],
});
