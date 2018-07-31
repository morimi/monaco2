/**
 * @fileoverview store of news
 */

export const state = () => ({
  /**
   * @type {string}
   */
  year: null,

  /**
   * @type {string}
   */
  month: null,

  entries: {}
});

export const getters = {}


export const actions = {

    /**
     * ニュースに登録された記事を得る
     */
    async fetchNewsArchive({ commit, state, rootState }, params) {
      let q = '';

      if(params.year && params.month) { //news/2018/10
        q = '&year=' + params.year + '&month=' + params.month;
      } else if(params.year && !params.month) { //news/2018
        q = '&year=' + params.year;
      }
      //
      // return this.$axios.get(process.env.api_url + '/wp-json/wp/v2/news/?_embed' + q)
      // .then( res => {
      //   commit('setParam', params)
      //   return commit('setPosts', res.data);
      // }).catch((e)=>{
      //   return commit('setError', { message: 'News not found', statusCode: 404 })
      // })
    }

}

export const mutations = {
  /**
   * @type {{ data: Array, target: string }}
   */
  setEntries(state, { data, target, page }) {
    state.entries[page] = data
  },

}
