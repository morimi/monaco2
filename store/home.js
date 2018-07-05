/**
 * @fileoverview store of home
 */

import axios from 'axios';

const API = 'http://13.113.241.23'

const APIURL = {
  tweet: 'tweet',
  official: 'official-tweet',
  video: 'youtube',
  rss: 'rss',
  ranking: 'top-store-rank',
  goods: 'goods'
};

export const state = () => ({
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
  ranking: [],
  /**
   * @type {Array.<Object>}
   */
  goods: [],

  error: {
    official: null,
    tweet: null,
    video: null,
    rss: null,
    ranking: null,
    goods: null
  },

  loading: {
    official: false,
    tweet: false,
    video: false,
    rss: false,
    ranking: false,
    goods: false
  },

  isContentOpen: {
    official: true,
    tweet: true,
    video: true,
    rss: true,
    ranking: true,
    goods: true
  }
})

export const getters = {

  getOfficial: state => state.official,
  isLoading: state => target => state.loading[target],
  isLoadingRanking: state => state.loading.ranking
}


export const actions = {
  async getData({ commit, state, rootState }, target) {
    commit('setLoading', {target: target, is: true})

    await axios.get(API + '/api/' + APIURL[target] + '?os=' + rootState.device, {
      timeout : 10000
    }).then( res => {
      if(res && res.data && (res.data.length || target === 'ranking')) {
        commit('setData', {target: target, list: res.data});
      } else {
        if(res.data.length === 0) {
          commit('setError', {type: target, code: 404});
        } else if(res.data.status === 'error') {
          commit('setError', {type: target, code: 500});
        } else if(res.data.status === 'waiting') {
          commit('setError', {type: target, code: 300});
        } else {
          commit('setError', {type: target, code: 404});
        }
      }
      commit('setLoading', {target: target, is: false})

    }).catch( (error) => {
      console.log(target + '.getData Error _:(´-`」 ∠):_');
      commit('setError', {type:target, code: 500});
      commit('setLoading', {target: target, is: false})
    });
  },

  fetchData({ commit, state, rootState }, target ) {
    return axios.get(API + '/api/' + APIURL[target] + '?os=' + rootState.device)
  }
}


export const mutations = {
  /**
   * @param {{target: string, list: (Array|Object) }} data
   */
  setData(state, data) {
    let dat = data.list;

    // if(data.target === 'tweet' || data.target === 'official') {
    //   dat = Tweet.setFormatTime(data.list);
    // }
    state[data.target] = dat
  },

  /**
   * @param {{type: string, code: number}} error
   */
  setError(state, error){
    state.error[error.type] = error.code
  },

  /**
   * @param {string} target
   */
  toggleContentOpen(state, target) {
    state.isContentOpen[target] = !state.isContentOpen[target]
  },

  /**
   * @param {{target: string, is: boolean}} loading
   */
  setLoading(state, loading) {
    state.loading[loading.target] = loading.is
  }
}
