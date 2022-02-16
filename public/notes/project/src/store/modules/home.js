import { reqGetHomeList } from '@/api/home'

const state = {
  homeData: {}
}

const actions = {
  // 请求一级分类列表
  async getHomeList({ commit }) {
    const homeData = await reqGetHomeList()
    commit('GET_HOME_LIST', homeData)
  }
}

const mutations = {
  GET_HOME_LIST(state, homeData) {
    state.homeData = homeData
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
