/**
 * @fileoverview store of archives
 */

import axios from 'axios';

export const state = () => ({

  /**
   * @type {string}
   */
  app_type: null,

  /**
  * category parametor
  * @type {{name: string, slug: string, id: number}}
  */
  category: null,

  /**
   * @type {string}
   */
  year: null,

  /**
   * @type {string}
   */
  month: null,

  totalPage: 1,

  totalCount: 1,

  /**
   * @type {Array.<Object>} WP_Post Object Array
   */
  category_entries: [],

  /**
   * @type {Array.<Object>} WP_Post Object Array
   */
  news_entries: [],

  /**
   * @type {Array.<Object>} WP_Post Object Array
   */
  article_entries: [],

  /**
   * @type {Array.<Object>} WP_Post Object Array
   */
  word_entries: [],

  /**
   * @type {Array.<Object>} WP_Post Object Array
   */
  search_entries: [],

  /**
   * @type {{message: string, statusCode: number}}
   */
  error: null
})

export const getters = {}

export const actions = {

  /**
   * カテゴリーに登録されたアプリの一覧を得る
   * @prop {{name: string, slug: string}} params 'category/game/rpg' -> name:'game', slug:'rpg'
   */
  async fetchCategoryArchive({ commit, state, rootState }, { params, page }) {
    let cat;
    console.log('fetchCategoryArchive', params, page)

    //ルートストアのカテゴリーリストからparams.slugに該当するカテゴリーを探す
    if(params.parent && params.slug) {
      cat = rootState.categories[params.parent].child.find(cat => cat.slug === params.slug);

    //params.nameに該当するカテゴリーがあったらワンチャン
    } else if(/^(game|app)$/.test(params.parent) && !params.slug) {
      cat = rootState.categories[params.parent];
    }

    //カテゴリ情報がなかった
    if(!cat) {
      return;
    }

    cat['parent'] = params.parent
    commit('setCategory', cat)

    await axios.get(process.env.api_url + '/wp-json/wp/v2/posts/?categories=' + cat.id + '&page=' + page) //+ '&page=' + page
    .then( res => {
      //res.headers
      //.link  '<http://localhost:8888/wp-json/wp/v2/posts?categories%5B0%5D=2&page=2>; rel="next"'
      //.x-wp-total
      //.x-wp-totalpages
      let totalCount = parseInt(res.headers['x-wp-total']),
          totalPage = parseInt(res.headers['x-wp-totalpages'])
          
      commit('setParam', params)
      commit('setTotal', {totalCount, totalPage})
      return commit('setEntries', {data: res.data, target: 'category', page: page});


    }).catch((e)=>{
      return commit('setError', { message: 'Category not found', statusCode: 404 })
    })
  },

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

    return axios.get(process.env.api_url + '/wp-json/wp/v2/news/?_embed' + q)
    .then( res => {
      commit('setParam', params)
      return commit('setPosts', res.data);
    }).catch((e)=>{
      return commit('setError', { message: 'News not found', statusCode: 404 })
    })
  }


}
/*
this.app_type = to.params.name; //app|game
this.posts = res.data;
this.name = cat.name;
this.slug = cat.slug;
this.id = cat.id;
*/
export const mutations = {

  /**
   * @type {{ data: Array, target: string }}
   */
  setEntries(state, { data, target, page }) {
    state[target + '_entries'][page] = data
  },

  resetEntries(state, target) {
    state[target + '_entries'] = [];
  },

  setParam(state, params) {
    if(params.parent) {
      state.app_type = params.parent
    }
    if(params.year) {
      state.year = params.year
    }
    if(params.month) {
      state.month = params.month
    }
  },

  setTotal(state, {totalCount, totalPage}) {
    state.totalCount = totalCount;
    state.totalPage = totalPage
  },

  setCategory(state, cat) {
    state.category = cat
  },

  setError(state, data) {
    state.error = data
  }
}
