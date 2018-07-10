/**
 * store/app
 * アプリ紹介ページ
 * @since 1.3.0
 */


const APIURL = {
  tweet: 'app-tweet',
  official: 'app-official-tweet',
  video: 'app-youtube',
  rss: 'app-rss',
  review: 'app-review',
  goods: 'app-goods'
};

export const state = () => {
  return {
    appId: null,

    /**
     * @type {Array.<Object>}
     */
    official: [],
    /**
     * @type {Array.<Object>}
     */
    tweet: [],
    /**
     * @type {Array.<Object>}
     */
    video: [],
    /**
     * @type {Array.<Object>}
     */
    rss: [],
    /**
     * @type {Array.<Object>}
     */
    review: [],
    /**
     * @type {Array.<Object>}
     */
    goods: [],

    error: {
      official: null,
      tweet: null,
      video: null,
      rss: null,
      review: null,
      goods: null
    },
  }
}

// getters
export const getters = {
  getAPIURL : (state, getters, rootState) => (target, newFlag, firstId, lastId) =>  {
    let url = window.__appsmate.API + '/api/' + APIURL[target] + '?appId=' + state.appId + '&os=' + rootState.device;
    if(target === 'goods') url += '&page=' + (newFlag || 1);
    if((typeof newFlag === 'boolean') && firstId && lastId) url += '&tweetId=' + (newFlag ? firstId : lastId);
    if(typeof newFlag === 'boolean') url += '&newFlag=' + (+!!newFlag);
    return url;
  },


}

//actions (dipatch)
export const actions = {

}

// mutations (commit)
export const mutations = {

  /**
   * @param {string} target
   */
  setAppID(state, id) {
    state.appId = id
  },

  /**
   * @param {{target: string, list: Array, marge: boolean }} data
   */
  setData(state, data) {
  },


  setError(state, error){
    state.error[error.type] = error.code
  },
}
