import axios from 'axios';

export const state = () => ({
  /**
   * デバイス
   * @type {'ios'|'android'?}
   */
  device: null,

  /**
   * プラットフォーム
   * @type {'pc'|'sp'?}
   */
  platform: null,

  agentInfo: {},

  categories: {},

  news: []
})

export const getters = {}

export const actions = {
  //https://ja.nuxtjs.org/guide/vuex-store#nuxtserverinit-%E3%82%A2%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3
  async nuxtServerInit ({ commit, dispatch }, { req }) {
    await axios.get('http://localhost:8888/wp-json/appsmate/v1/categories/')
      .then( res => {
        commit('setCategories', res.data)
      }).catch((e)=>{
        console.log(e)
      })
  },

  async cateogries({ commit, state, rootState }) {
    await axios.get('http://localhost:8888/wp-json/appsmate/v1/categories/')
      .then( res => {
        commit('setCategories', res.data)
      }).catch((e)=>{
        console.log(e)
      })
  }
}

export const mutations = {
  setAgentInfo(state, data) {
    state.agentInfo = data
    state.device = data.DEVICE
    state.platform = data.PLATFORM
  },

  setCategories(state, data) {
    state.categories = data
  },

  setNews(state, data) {
    state.news = data;
  }
}
