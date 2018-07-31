/**
 * @fileoverview store of root
 */

const HOST = 'http://localhost:8888/'

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

  /**
   * 端末情報
   * @type {{ OS: string, DEVICE: string, BROWSER: string, PLATFORM: string }}
   */
  agentInfo: {}

})

export const getters = {}

export const actions = {

  /**
   * nuxtServerInit
   * call with context (Only from the SSR & store/index.js)
   * @see https://ja.nuxtjs.org/guide/vuex-store#nuxtserverinit-%E3%82%A2%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%B3
   */
  async nuxtServerInit ({ commit, dispatch }, { app }) {
    //カテゴリーリスト取得
    await app.$axios.get(HOST + 'wp-json/appsmate/v1/categories/')
      .then( res => {
        commit('category/setCategories', res.data)
        commit('category/initState', res.data)
      }).catch((e)=>{})
  },

}

export const mutations = {
  setAgentInfo(state, data) {
    state.agentInfo = data
    state.device = data.DEVICE
    state.platform = data.PLATFORM
  }
}
