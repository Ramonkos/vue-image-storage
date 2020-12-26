import api from '../../api/imgur'
import qs from 'qs'
import { router } from '../../main'

const state = {
  token: window.localStorage.getItem('imgur-token'),
}

const getters = {
  isLoggedIn: (state) => !!state.token,
}

const actions = {
  login: () => {
    api.login()
  },
  finalizeLogin: ({ commit }, hash) => {
    const params = qs.parse(hash.replace('#', ''))
    const token = params.access_token
    commit('setToken', token)
    window.localStorage.setItem('imgur-token', token)
    router.push('/')
  },
  logout: ({ commit }) => {
    commit('setToken', null)
    window.localStorage.removeItem('imgur-token')
  },
}

const mutations = {
  setToken: (state, token) => {
    state.token = token
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
