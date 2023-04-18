import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

export const snackbar = {
  namespaced: true,
  state: {
    text: '',
    color: '',
    timeout: null,
    icon: ''
  },
  getters: {
  },
  mutations: {
    SHOW_MESSAGE(state, payload) {
      state.text = payload.text
      state.color = payload.color
      state.icon = payload.icon
      state.timeout = payload.timeout
    },
  },
  actions: {
    showSnack({ commit }, payload) {
      commit("SHOW_MESSAGE", payload)
    }
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    snackbar
  }
})
