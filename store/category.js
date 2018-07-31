/**
 * @fileoverview store of archives
 */
import Vue from "vue"
import { CancelToken, isCancel } from "axios"

export const state = () => ({

  /**
   * カテゴリーリスト
   * @type {{ 'game': [], 'app': [], 'news': [], 'article': [], 'word': [] }}
   */
  categories: {},

  /**
  * category parametor
  * @type {{name: string, slug: string, id: number}}
  */
  //category: null,

  /**
   * Category's Data Objects
   * parent/slug/page
   * game: { 'ar-game': { 1: [], 2: [] },  ... },
   * @type { string: { number: [ Object ] } } WP_Post Object Array
   */
  game: {},
  app: {},
  article: {},
  news: {},

  /**
   * @type {{message: string, statusCode: number}}
   */
  error: null,


  loading: false
})

export const getters = {

  category(state, getters, rootState) {
    let parent = rootState.route.params.parent,
    slug = rootState.route.params.slug;

    return getters.getCategoryByName(parent, slug)
  },

  /**
   * vue-routerのparamsを元にcurrentのカテゴリーを取得
   */
  getCategoryByName: (state, getters, rootState) => (parent, slug) => {
    let cat = null;

    //ルートストアのカテゴリーリストからparams.slugに該当するカテゴリーを探す
    if( parent && slug ) {
      cat = state.categories[parent].child.find(cat => cat.slug === slug);

    //params.nameに該当するカテゴリーがあったらワンチャン
    } else if(/^(game|app)$/.test(parent) && !slug) {
      cat = state.categories[parent];
    }

    return cat
  }
}

export const actions = {

  /**
   * カテゴリーに登録されたアプリの一覧を得る
   * @prop {{name: string, slug: string}} params 'category/game/rpg' -> name:'game', slug:'rpg'
   */

  async fetchCategories({ commit, getters, state, rootState }, { parent, slug, page, prefetch }) {

    console.log('fetchCategories', 'parent:' + parent, 'slug:' + slug, 'page:' + page)

    commit('setError', null)

    const category = getters.getCategoryByName(parent, slug);
    const parentCategory = getters.getCategoryByName(parent);

    slug = slug || 'all';

    //カテゴリ情報がなかった or 読み込み中
    if(! category ) return;

    //読み込み済み
    if (state[parent][slug][page] && state[parent][slug][page].length) {
      prefetch = true
      return commit('setEntries', { parent, slug, page, data: state[parent][slug][page]});
    }

    if (!prefetch) {
      if (this._cancelSource) {
        this._cancelSource.cancel(
          "priorotize parent: " + parent + " slug: " + slug + " page: " + page
        )
      }
      this._cancelSource = CancelToken.source()
    }

    await this.$axios.$get(
      '/wp-json/wp/v2/posts/',
      {
        transformRequest: [(data, headers) => {
          commit('setLoading', true);
          return data;
        }],
        params: {
          'categories': category.id,
          'page': page,
          'per_page': parentCategory.parPage
        },
        cancelToken: this._cancelSource && this._cancelSource.token
      }
    ).then( res => {

      commit('setLoading', false);
      commit('setEntries', { parent, slug, page, data: res});

      if( res.length === 0 ) {
        commit('setError', { message: 'Entry not found', code: 404 })
      }

    }).catch((e)=>{
      console.log(e.config)
      if(!isCancel(e)) {
        commit('setError', { message: 'Entry not found', code: 404 })
      }
    })

  }


}

export const mutations = {

  /**
  parent/slugの オフジェクトを用意しておく
  call from store/index.js actions.nuxtServerInit

  game: { 'ar-game': {}, arcade: {} ... },
  app: { ar: {}, entertainment: {} ... },
  article: { '2018/07/': {}, '2018/05/': {}, '2018/01/': {} ... },
  news: { '2018/07/': {}, '2018/05/': {}, '2018/02/': {}, '2018/01/': {} ... }
  */
  initState(state, categories) {
    let keys = Object.keys(categories);

    keys.forEach(key => {
      state[key]['all'] = {};
      categories[key].child.forEach(cat => {
        state[key][cat.slug] = {}
      })
    })
  },

  /**
   * @type {string} parent $route.params.parent
   * @type {string} slug $route.params.slug
   * @type {number} page $route.params.page
   * @type {Array.<Object>} data category posts data (WP_Posts)
   */
  setEntries(state, { parent, slug, page, data }) {
    //state[parent][slug][page] = data
      Vue.set(state[parent][slug], [page], data)
  },

  setCategories(state, data) {
    state.categories = data
  },

  setError(state, data) {
    Vue.set(state, 'error', data)
  },

  setLoading(state, data) {
  state.loading = data
  }
}
