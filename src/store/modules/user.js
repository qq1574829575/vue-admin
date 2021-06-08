import { resetRouter } from '@/router'

const state = {
  hasRoutes: false,
  adminUserinfo: {}
}

const mutations = {
  SET_HAS_ROUTES: (state, hasRoutes) => {
    state.hasRoutes = hasRoutes
  },
  SET_ADMIN_USERINFO: (state, adminUserinfo) => {
    state.adminUserinfo = adminUserinfo
  }
}

const actions = {
  setHasRoutes({ commit }, hasRoutes) {
    commit('SET_HAS_ROUTES', hasRoutes)
  },
  setAdminUserinfo({ commit }, adminUserinfo) {
    commit('SET_ADMIN_USERINFO', adminUserinfo)
  },
  logout({ commit, state, dispatch }) {
    localStorage.clear()
    commit('SET_HAS_ROUTES', false)
    resetRouter()
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
